import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

interface Category {
  id: string
  name: string
  images: string[]
  description: string
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const createCategory = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //parse event body to get category data
  if(!event.body) return { statusCode: 400, body: 'Bad request' }

  const { name, images, description }: Category = JSON.parse(event.body)
  //generate unique id for the category
  const id = uuidv4()
  const params = {
    TableName: 'Category',
    Item: {
      id,
      name,
      images,
      description,
    },
  }

  //save category data to dynamoDb
  await dynamoDb.put(params).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Category created successfully',
      id: id,
    }),
  }
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
