import React from 'react'
import {
  troubleshootingData,
  severityDescriptions,
  problemTypes,
  owners,
} from './troubleshooting-data'

const TroubleshootingGuide = () => {
  const getTypeColor = (type) => {
    switch (type) {
      case '운영/설정':
        return 'bg-green-100 text-green-800'
      case '하드웨어':
        return 'bg-blue-100 text-blue-800'
      case '시스템/SW':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case '주의':
        return 'bg-yellow-100 text-yellow-800'
      case '경고':
        return 'bg-orange-100 text-orange-800'
      case '심각':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getOwnerColor = (owner) => {
    switch (owner) {
      case '대리점':
        return 'text-blue-600'
      case 'AS담당':
        return 'text-purple-600'
      case '본사':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">고장 증상별 조치 가이드</h2>

      {/* 범례 */}
      <div className="mb-8 space-y-4 bg-gray-50 p-4 rounded-lg">
        <div>
          <h3 className="text-sm font-semibold mb-2">심각도 구분</h3>
          <div className="flex gap-3">
            {Object.entries(severityDescriptions).map(([severity, desc]) => (
              <span
                key={severity}
                className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(
                  severity
                )}`}
              >
                {severity}: {desc}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">문제 유형</h3>
          <div className="flex gap-3">
            {problemTypes.map((type) => (
              <span
                key={type.id}
                className={`px-2 py-1 rounded-md text-xs ${getTypeColor(
                  type.id
                )}`}
              >
                {type.id}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">조치 담당</h3>
          <div className="flex gap-3">
            {owners.map((owner) => (
              <span
                key={owner.id}
                className={`text-xs ${getOwnerColor(owner.id)} font-medium`}
              >
                {owner.id}: {owner.description}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 문제 목록 */}
      <div className="space-y-8">
        {troubleshootingData.map((category, categoryIdx) => (
          <div key={categoryIdx} className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">
              {category.category}
            </h3>
            {category.issues.map((issue, issueIdx) => (
              <div
                key={issueIdx}
                className="bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {issue.symptom}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-md text-xs ${getTypeColor(
                          issue.type
                        )}`}
                      >
                        {issue.type}
                      </span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-md text-sm font-medium ${getSeverityColor(
                        issue.severity
                      )}`}
                    >
                      {issue.severity}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">⚒️ 필요 기술:</span>
                      {issue.techLevel}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">⏱️ 예상 시간:</span>
                      {issue.timeRequired}
                    </div>
                  </div>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">
                      원인 및 ADT 코드
                    </h4>
                    <ul className="space-y-4">
                      {issue.causes.map((cause, causeIdx) => (
                        <li
                          key={causeIdx}
                          className="p-3 bg-gray-50 rounded-lg space-y-2"
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${getTypeColor(
                                cause.type
                              )}`}
                            >
                              {cause.type}
                            </span>
                            <span className="font-medium">{cause.desc}</span>
                          </div>
                          {cause.adtCode && (
                            <div className="text-sm space-y-1">
                              <div>
                                <span className="text-gray-500">ADT Code:</span>{' '}
                                {cause.adtCode}
                              </div>
                              {cause.message && (
                                <div>
                                  <span className="text-gray-500">
                                    Message:
                                  </span>{' '}
                                  {cause.message}
                                </div>
                              )}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">
                      조치 방법
                    </h4>
                    <ul className="space-y-2">
                      {issue.solutions.map((solution, solutionIdx) => (
                        <li
                          key={solutionIdx}
                          className="flex items-start justify-between gap-2 p-2 rounded hover:bg-gray-50"
                        >
                          <span>{solution.action}</span>
                          <span
                            className={`text-sm whitespace-nowrap font-medium ${getOwnerColor(
                              solution.owner
                            )}`}
                          >
                            {solution.owner}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TroubleshootingGuide
