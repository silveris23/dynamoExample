// 상수
const GPS_UNIT = Math.pow(10, 7)
const BEARING_POINT = Math.pow(10, 5)
const VELOCITY_DIVIDE = 277.78 //mm/s => km/h 변환상수 = 1000000/3600

// 유틸리티 함수
const arrayToInt = (bytes, signed = false) => {
  let value = 0
  const dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.length)

  switch (bytes.length) {
    case 1:
      value = signed ? dataView.getInt8(0) : dataView.getUint8(0)
      break
    case 2:
      value = signed ? dataView.getInt16(0, true) : dataView.getUint16(0, true)
      break
    case 4:
      value = signed ? dataView.getInt32(0, true) : dataView.getUint32(0, true)
      break
    default:
      console.error('Unsupported byte length:', bytes.length)
  }
  return value
}

const arrayToDouble = (bytes, signed = false) => {
  return arrayToInt(bytes, signed)
}

// 파서 함수들
const base64Decode = (payload) => {
  try {
    // atob로 base64 디코딩 후 Uint8Array로 변환
    return Uint8Array.from(atob(payload), (c) => c.charCodeAt(0))
  } catch (error) {
    console.error('Base64 디코딩 에러:', error)
    return new Uint8Array()
  }
}
const parseTimestamp = (decoded) => {
  const second = arrayToInt(decoded.slice(80, 84))
  const nanoSecond = arrayToInt(decoded.slice(84, 88))
  return second * 1000 + Math.floor(nanoSecond / 1000000)
}

const parseGpsPayload = (base64Payload) => {
  const decoded = base64Decode(base64Payload)

  if (decoded.length < 88) {
    // 최소 필요 길이 체크
    console.error('Invalid payload length:', decoded.length)
    return null
  }

  try {
    return {
      longitude: arrayToDouble(decoded.slice(0, 4), true) / GPS_UNIT,
      latitude: arrayToDouble(decoded.slice(4, 8), true) / GPS_UNIT,
      bearing: arrayToDouble(decoded.slice(8, 12), true) / BEARING_POINT,
      velocity: Number(
        (arrayToDouble(decoded.slice(12, 16), true) / VELOCITY_DIVIDE).toFixed(
          2
        )
      ),
      itow: arrayToInt(decoded.slice(16, 20)),
      numSv: arrayToInt(decoded.slice(20, 21)),
      pdop: arrayToInt(decoded.slice(21, 23)),
      diffSoln: arrayToInt(decoded.slice(23, 24)),
      carrierSoln: arrayToInt(decoded.slice(24, 25)),
      fixOk: arrayToInt(decoded.slice(25, 26)),
      mountPoint: arrayToInt(decoded.slice(26, 27)),
      errorCode: arrayToInt(decoded.slice(27, 29)),
      networkType: arrayToInt(decoded.slice(43, 44)),
      networkMode: arrayToInt(decoded.slice(49, 50)),
      temperature: arrayToInt(decoded.slice(53, 55), true) / 10,
      distanceErrorCm: arrayToInt(decoded.slice(55, 57), true),
      headingErrorDeg: arrayToInt(decoded.slice(57, 59), true) / 10,
      direction: arrayToInt(decoded.slice(59, 60)),
      index: arrayToInt(decoded.slice(60, 61)),
      rawLongitude: arrayToDouble(decoded.slice(61, 65), true) / GPS_UNIT,
      rawLatitude: arrayToDouble(decoded.slice(65, 69), true) / GPS_UNIT,
      rawHeading: arrayToDouble(decoded.slice(69, 73), true) / BEARING_POINT,
      rawVelocity: Number(
        (arrayToDouble(decoded.slice(73, 77), true) / VELOCITY_DIVIDE).toFixed(
          2
        )
      ),
      decisionCode: arrayToInt(decoded.slice(77, 78)),
      zoneNumber: arrayToInt(decoded.slice(78, 79)),
      hemisphere: arrayToInt(decoded.slice(79, 80)),
      timestamp: parseTimestamp(decoded),
    }
  } catch (error) {
    console.error('Parsing error:', error)
    return null
  }
}

export { parseGpsPayload }
