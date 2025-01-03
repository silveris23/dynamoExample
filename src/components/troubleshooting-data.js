export const troubleshootingData = [
  {
    category: "초기 작동",
    issues: [
      {
        symptom: "전원이 들어오지 않는 증상",
        type: "하드웨어",
        severity: "심각",
        techLevel: "중급",
        timeRequired: "30-60분",
        causes: [
          { desc: "배터리 전압 불량", type: "하드웨어" },
          { desc: "전원 하네스 불량", type: "하드웨어" },
          { desc: "인터페이스 박스 휴즈", type: "하드웨어" },
        ],
        solutions: [
          { action: "배터리 전압을 확인한다", owner: "대리점" },
          { action: "전원 하네스를 교환한다", owner: "AS담당" },
          { action: "인터페이스 박스 안 15A 퓨즈를 교환한다", owner: "AS담당" },
        ],
      },
      {
        symptom: "GPS가 연결되지 않는 증상",
        type: "시스템/SW",
        severity: "경고",
        techLevel: "초급",
        timeRequired: "15-30분",
        causes: [
          {
            desc: "GPS, LTE 수신 방해",
            type: "시스템/SW",
            adtCode: "1004",
            priority: "2",
            message: "GPS 수신 중입니다. 잠시만 기다려 주세요.",
          },
          {
            desc: "메인 컨트롤러 불량",
            type: "하드웨어",
            adtCode: "1005",
            message: "GPS 수신 상태가 불량 합니다. 시스템을 리셋합니다.",
          },
        ],
        solutions: [
          {
            action: "전원 재부팅 후 GPS 수신이 가능한 지역으로 이동",
            owner: "대리점",
          },
          { action: "플루바 매니저에게 연락 후 조치", owner: "AS담당" },
        ],
      },
      {
        symptom: "앱 로그인이 되지 않는 현상",
        type: "시스템/SW",
        severity: "주의",
        techLevel: "초급",
        timeRequired: "5-10분",
        causes: [{ desc: "비밀번호 오류", type: "시스템/SW" }],
        solutions: [
          { action: "비밀번호 초기화 후 로그인을 재시도한다", owner: "대리점" },
        ],
      },
    ],
  },
  {
    category: "자율 주행",
    issues: [
      {
        symptom: "자율주행 버튼에 불이 들어오지 않는 증상",
        type: "운영/설정",
        severity: "주의",
        techLevel: "초급",
        timeRequired: "5-10분",
        causes: [
          { desc: "정지상태", type: "운영/설정" },
          { desc: "주행속도 초과", type: "운영/설정" },
          { desc: "진입 각도 초과", type: "운영/설정" },
          { desc: "메인 컨트롤러 불량", type: "하드웨어" },
        ],
        solutions: [
          { action: "0.77km/h 이상으로 주행한다", owner: "대리점" },
          { action: "5km/h 이하로 주행한다", owner: "대리점" },
          { action: "기준선에서 25° 이하로 주행한다", owner: "대리점" },
          {
            action: "플루바 매니저에게 연락 후 조치를 받는다",
            owner: "AS담당",
          },
        ],
      },
      {
        symptom: "자율 주행이 자동으로 해지가 되는 현상",
        type: "운영/설정",
        severity: "경고",
        techLevel: "초급",
        timeRequired: "10-15분",
        causes: [
          {
            desc: "자율주행 가능 속도 초과",
            type: "운영/설정",
            adtCode: "1010",
            priority: "9",
            message:
              "적정 속도(1km/h ~ 10km/h)를 만족하지 못하여 수동 운전으로 전환합니다",
          },
          { desc: "자율주행 중 바퀴 각도 틀어짐", type: "운영/설정" },
          { desc: "메인 컨트롤러 불량", type: "하드웨어" },
        ],
        solutions: [
          {
            action:
              "초기 5km/h 이상, 안정화 8km/h 이상으로 주행 시 해지가 되므로 규정 속도를 준수해 재주행한다",
            owner: "대리점",
          },
          {
            action:
              "초기 25° 이상, 안정화 15° 이상 틀어진 경우 플루바 매니저에게 연락 후 조치를 받는다",
            owner: "AS담당",
          },
        ],
      },
    ],
  },
  {
    category: "센서/캘리브레이션",
    issues: [
      {
        symptom: "IMU 교정이 되지 않는 증상",
        type: "운영/설정",
        severity: "주의",
        techLevel: "초급",
        timeRequired: "5-10분",
        causes: [
          {
            desc: "미세 진동으로 인한 교정 미진행",
            type: "운영/설정",
            adtCode: "1104",
            priority: "4",
            message: "자세제어센서 연결 확인 중입니다",
          },
        ],
        solutions: [
          {
            action: "트랙터 시동 OFF 및 하차, 1분 후 교정을 진행한다",
            owner: "대리점",
          },
        ],
      },
    ],
  },
  {
    category: "작업 품질",
    issues: [
      {
        symptom: "골이 일직선으로 똑바르게 나오지 않는 증상",
        type: "운영/설정",
        severity: "경고",
        techLevel: "중급",
        timeRequired: "15-30분",
        causes: [
          { desc: "심한 작업기 유동", type: "하드웨어" },
          { desc: "심한 트랙터 부하", type: "운영/설정" },
        ],
        solutions: [
          {
            action:
              "3단 히치에 작업기를 단단히 고정해서 유격이 없도록 조치한다",
            owner: "AS담당",
          },
          {
            action: "RPM을 올리거나 작업기를 올려 부하를 적게 받도록 조치한다",
            owner: "대리점",
          },
        ],
      },
      {
        symptom: "등간격이 맞지 않는 증상",
        type: "운영/설정",
        severity: "경고",
        techLevel: "중급",
        timeRequired: "20-40분",
        causes: [
          {
            desc: "작업기가 트랙터의 정중앙에 위치하지 않음",
            type: "하드웨어",
          },
          { desc: "작업기가 기울어져 있음", type: "하드웨어" },
          {
            desc: "작업기 치수가 올바르게 입력되어 있지 않음",
            type: "운영/설정",
          },
          {
            desc: "메인 컨트롤러 설치가 정방향으로 되지 않음",
            type: "하드웨어",
          },
        ],
        solutions: [
          {
            action: "링크 길이 확인 후 정중앙에 맞게 작업기 위치를 조정한다",
            owner: "AS담당",
          },
          {
            action: "수평계를 이용하여 작업기를 수평으로 맞춘다",
            owner: "AS담당",
          },
          {
            action: "작업기 수치값 확인 후 올바른 수치를 재입력한다",
            owner: "대리점",
          },
          {
            action: "메인 컨트롤러를 기기의 정중앙으로 조정한다",
            owner: "AS담당",
          },
        ],
      },
    ],
  },
  {
    category: "하드웨어",
    issues: [
      {
        symptom: "핸들 조작 시 걸림이 발생하는 증상",
        type: "하드웨어",
        severity: "경고",
        techLevel: "중급",
        timeRequired: "30-45분",
        causes: [
          {
            desc: "스티어링 결합 불량",
            type: "하드웨어",
            adtCode: "2001",
            message: "중공 모터 Software Over Current Pending",
          },
        ],
        solutions: [
          {
            action: "오토 스티어링(핸들) 탈거 후 핸들 축과 평행하게 재조립한다",
            owner: "AS담당",
          },
        ],
      },
      {
        symptom: "핸들에 유격이 발생하는 증상",
        type: "하드웨어",
        severity: "경고",
        techLevel: "중급",
        timeRequired: "30-60분",
        causes: [
          { desc: "프론트 브라켓 고정 불량", type: "하드웨어" },
          { desc: "모터 브라켓 나사 홀 마모", type: "하드웨어" },
        ],
        solutions: [
          {
            action: "프론트 브라켓을 조정하고 단단히 고정시킨다",
            owner: "AS담당",
          },
          {
            action: "플루바 매니저에게 연락 후 모터 브라켓 교환을 신청한다",
            owner: "AS담당",
          },
        ],
      },
    ],
  },
  {
    category: "소프트웨어/통신",
    issues: [
      {
        symptom: "OTA, S/W 업데이트 진행이 되지 않는 증상",
        type: "시스템/SW",
        severity: "주의",
        techLevel: "초급",
        timeRequired: "10-20분",
        causes: [
          {
            desc: "GPS, LTE 통신 연결 불가",
            type: "시스템/SW",
            adtCode: "3001",
            message: "LTE Connected :: PING Test Fail Count Over",
          },
          { desc: "메인 컨트롤러 불량", type: "하드웨어" },
        ],
        solutions: [
          {
            action:
              "전원 재부팅 후 GPS 수신이 가능한 지역으로 트랙터를 이동시킨다",
            owner: "대리점",
          },
          { action: "플루바 매니저에게 연락 후 조치를 받는다", owner: "본사" },
        ],
      },
      {
        symptom: "앱 사용 시 오류가 발생하는 증상",
        type: "시스템/SW",
        severity: "주의",
        techLevel: "초급",
        timeRequired: "5-10분",
        causes: [{ desc: "앱 S/W 충돌로 인한 오류", type: "시스템/SW" }],
        solutions: [
          { action: "앱을 완전히 껐다가 다시 실행시킨다", owner: "대리점" },
          { action: "플루바 매니저에게 연락 후 조치를 받는다", owner: "본사" },
        ],
      },
      {
        symptom: "플루바 오토 앱에 트랙터가 선택되지 않는 증상",
        type: "시스템/SW",
        severity: "주의",
        techLevel: "초급",
        timeRequired: "10-15분",
        causes: [
          { desc: "플루바 오토 전원이 꺼져 있음", type: "운영/설정" },
          { desc: "메인컨트롤러 연결이 되어 있지 않음", type: "시스템/SW" },
        ],
        solutions: [
          {
            action:
              "플루바 오토 전원을 ON한 후 GPS가 연결되도록 개활지로 트랙터를 이동시킨다",
            owner: "대리점",
          },
          {
            action:
              "플루바 오토 앱에서 장비와 제품 → 차량 → 오토키트 연결을 선택하여 연결을 진행한다",
            owner: "대리점",
          },
        ],
      },
    ],
  },
];

export const severityDescriptions = {
  주의: "모니터링 필요",
  경고: "즉시 조치 필요",
  심각: "작업 중단 필요",
};

export const problemTypes = [
  { id: "운영/설정", color: "green" },
  { id: "하드웨어", color: "blue" },
  { id: "시스템/SW", color: "purple" },
];

export const owners = [
  { id: "대리점", description: "1차 대응" },
  { id: "AS담당", description: "현장 조치" },
  { id: "본사", description: "최종 해결" },
];
