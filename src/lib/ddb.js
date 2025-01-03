import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ExecuteStatementCommand,
  BatchExecuteStatementCommand,
  QueryCommand,
  PutCommand,
  UpdateCommand,
  DeleteCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb'

//다이나모 예제 https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html

const translateConfig = {
  marshallOptions: {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  },
  unmarshallOptions: {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  },
}

const AWS_REGION = process.env.REACT_APP_AWS_REGION || 'ap-northeast-2'
// 기본 클라이언트 생성
const defaultClient = new DynamoDBClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    // sessionToken: process.env.REACT_APP_AWS_SESSION_TOKEN
  },
})
const defaultDocClient = DynamoDBDocumentClient.from(
  defaultClient,
  translateConfig
)

/**
 * PartiQL 문장 실행
 * @param {Object} options - 실행 옵션
 * @param {string} options.statement - 실행할 PartiQL 문장
 * @param {Array} [options.parameters=[]] - 문장 파라미터
 * @param {string} [options.operationType='execute'] - 작업 유형
 * @param {DynamoDBClient} [options.client=defaultClient] - DynamoDB 클라이언트
 */
export const executeStatement = async ({
  statement,
  parameters = [],
  operationType = 'execute',
  client = defaultDocClient,
}) => {
  try {
    const command = new ExecuteStatementCommand({
      Statement: statement,
      Parameters: parameters,
      ConsistentRead: true,
    })
    // return command
    // console.log(command)
    const response = await client.send(command)
    // console.log(response)

    return operationType === 'select' ? response.Items || [] : response
  } catch (error) {
    console.error(`Error executing ${operationType} statement:`, error)
    throw error
  }
}

/**
 * 단일 항목 조회
 * @param {TableName, Key: {k:v}} params - 조회 파라미터
 * @param {DynamoDBDocumentClient} [docClient=defaultDocClient] - DocumentClient
 */
export const get = async (params, docClient = defaultDocClient) => {
  try {
    const command = new GetCommand(params)
    const response = await docClient.send(command)
    return response.Item
  } catch (error) {
    console.error('Error in get operation:', error)
    throw error
  }
}

/**
 * 쿼리 실행
 * @param {{TableName, Key}} params - 쿼리 파라미터
 * @param {DynamoDBDocumentClient} [docClient=defaultDocClient] - DocumentClient
 */
export const query = async (params, docClient = defaultDocClient) => {
  try {
    const command = new QueryCommand(params)
    const response = await docClient.send(command)
    return response.Items
  } catch (error) {
    console.error('Error in query operation:', error)
    throw error
  }
}

/**
 * 항목 생성/대체
 * @param {TableName, Item} params - 생성 파라미터
 * @param {DynamoDBDocumentClient} [docClient=defaultDocClient] - DocumentClient
 */
export const put = async (params, docClient = defaultDocClient) => {
  try {
    const command = new PutCommand(params)
    const response = await docClient.send(command)
    return response
  } catch (error) {
    console.error('Error in put operation:', error)
    throw error
  }
}

/**
 * 항목 업데이트
 * @param {TableName, Key, UpdateExpression, ExpressionAttributeValues, ReturnValues} params - 업데이트 파라미터
 * @param {DynamoDBDocumentClient} [docClient=defaultDocClient] - DocumentClient
 */
export const update = async (params, docClient = defaultDocClient) => {
  try {
    const command = new UpdateCommand(params)
    const response = await docClient.send(command)
    return response
  } catch (error) {
    console.error('Error in update operation:', error)
    throw error
  }
}

/**
 * 항목 삭제
 * @param {TableName, Key} params - 삭제 파라미터
 * @param {DynamoDBDocumentClient} [docClient=defaultDocClient] - DocumentClient
 */
export const remove = async (params, docClient = defaultDocClient) => {
  try {
    const command = new DeleteCommand(params)
    const response = await docClient.send(command)
    return response
  } catch (error) {
    console.error('Error in delete operation:', error)
    throw error
  }
}

/**
 * 배치 실행
 * @param {Array} statements - 실행할 문장들
 * @param {DynamoDBClient} [client=defaultClient] - DynamoDB 클라이언트
 */
export const batchExecute = async (statements, client = defaultClient) => {
  try {
    const input = {
      Statements: statements.map(({ statement, parameters = [] }) => ({
        Statement: statement,
        Parameters: parameters,
      })),
    }

    const command = new BatchExecuteStatementCommand(input)
    const response = await client.send(command)

    return response.Responses || []
  } catch (error) {
    console.error('Error executing batch statements:', error)
    throw error
  }
}

// 사용 예시
const exampleUsage = async () => {
  // 기본 클라이언트 사용
  const selectResult = await executeStatement({
    statement: 'SELECT * FROM "Users" WHERE userId = ?',
    parameters: ['123'],
    operationType: 'select',
  })

  // 사용자 정의 클라이언트 사용 가능
  const customClient = new DynamoDBClient({ region: 'us-west-2' })
  const customSelectResult = await executeStatement({
    statement: 'SELECT * FROM "Users" WHERE userId = ?',
    parameters: ['456'],
    operationType: 'select',
    client: customClient,
  })

  // DocumentClient 메서드
  const user = await get({
    TableName: 'Users',
    Key: { userId: '123' },
  })

  await put({
    TableName: 'Users',
    Item: {
      userId: '456',
      name: 'Jane Doe',
      email: 'jane@example.com',
    },
  })
}

export { defaultClient as client, defaultDocClient as docClient }
