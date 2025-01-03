import React, { useState } from 'react'
import { executeStatement, put } from '../lib/ddb'
import { parseGpsPayload } from '../lib/gpsParser'

// PayloadCell 컴포넌트 추가
const PayloadCell = ({ payload }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const parsedData = parseGpsPayload(payload)

  console.log(parsedData)

  // 주요 정보만 표시하는 요약 뷰
  const summaryView = parsedData ? (
    <div>
      위도: {parsedData.latitude.toFixed(7)}, 경도:{' '}
      {parsedData.longitude.toFixed(7)}, 속도: {parsedData.velocity}m/s
    </div>
  ) : (
    '파싱 에러'
  )

  // 전체 정보를 표시하는 상세 뷰
  const detailView = parsedData ? (
    <div className="grid grid-cols-2 gap-2 text-xs">
      {Object.entries(parsedData).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span className="font-semibold">{key}:</span>
          <span>
            {typeof value === 'number' ? value.toFixed(7) : String(value)}
          </span>
        </div>
      ))}
    </div>
  ) : (
    '파싱 에러'
  )

  return (
    <td className="px-6 py-4 text-sm">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="font-mono">{summaryView}</div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 px-2 py-1 text-xs text-blue-600 hover:text-blue-800"
          >
            {isExpanded ? '접기 ▼' : '펼치기 ▶'}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg">{detailView}</div>
        )}
      </div>
    </td>
  )
}

const Report = () => {
  const [gpsData, setGpsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [jsonInput, setJsonInput] = useState('')
  const [insertStatus, setInsertStatus] = useState('')
  const [productKey, setProductKey] = useState('3691-a815-2af2-df99-4a92') // 초기값 설정

  const fetchData = async (key) => {
    if (!key) return

    try {
      setIsLoading(true)
      setError(null)
      const list = await executeStatement({
        statement: `SELECT * FROM "EonMqttHistory" WHERE "productKey" = ? AND topic = ?`,
        parameters: [key, `pvat/v1/${key}/upload/gps`],
        operationType: 'select',
      })

      setGpsData(list)
    } catch (err) {
      setError(err.message)
      setGpsData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchData(productKey)
  }
  const handleJsonSubmit = async (e) => {
    e.preventDefault()
    setInsertStatus('처리중...')

    try {
      const data = JSON.parse(jsonInput)
      // 단일 객체인 경우 배열로 변환
      const items = Array.isArray(data) ? data : [data]

      for (const item of items) {
        await put({
          TableName: 'EonMqttHistory',
          Item: {
            timestamp: new Date().getTime(),
            productKey: productKey,
            topic: `example/${productKey}`,
            ...item,
          },
        })
      }

      setInsertStatus('성공: 데이터가 추가되었습니다')
      setJsonInput('') // 입력창 초기화

      // 데이터 새로고침
      fetchData()
    } catch (err) {
      console.error('Insert error:', err)
      setInsertStatus(`에러: ${err.message}`)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">GPS 데이터</h1>

      {/* 검색 폼 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">데이터 조회</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded"
            value={productKey}
            onChange={(e) => setProductKey(e.target.value)}
            placeholder="Product Key 입력"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!productKey.trim() || isLoading}
          >
            {isLoading ? '조회중...' : '조회'}
          </button>
        </form>
      </div>

      {/* JSON 입력 폼 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">데이터 추가</h2>
        <form onSubmit={handleJsonSubmit}>
          <textarea
            className="w-full h-32 p-2 border rounded mb-2 font-mono text-sm"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={`{
  "payload": "hello world"
}`}
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!jsonInput.trim()}
            >
              추가
            </button>
            {insertStatus && (
              <span
                className={`text-sm ${
                  insertStatus.startsWith('에러')
                    ? 'text-red-500'
                    : 'text-green-500'
                }`}
              >
                {insertStatus}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* 데이터 테이블 수정 */}
      {error ? (
        <div className="text-red-500 mb-4">에러: {error}</div>
      ) : gpsData.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  시간
                </th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  데이터
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gpsData.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                    {new Date(item.timestamp * 1000).toLocaleTimeString(
                      'ko-KR',
                      {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                      }
                    )}
                  </td>
                  <PayloadCell payload={item.payload} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-4">
          {productKey ? '데이터가 없습니다.' : 'Product Key를 입력하세요.'}
        </div>
      )}
    </div>
  )
}

export default Report
