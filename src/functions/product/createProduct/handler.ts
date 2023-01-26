import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

interface Product {
  id: string
  name: string
  images: string[]
  description: string
  price: number
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const createProduct = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (!event.body) return { statusCode: 400, body: 'Bad request - no body' }
  const { name, images, description, price }: Product = JSON.parse(event.body)
  if (!name || !images || !description || !price)
    return { statusCode: 400, body: 'Bad request - missing fields' }
  //generate unique id for the product
  const id = uuidv4()

  const params = {
    TableName: 'Product',
    Item: {
      id,
      name,
      images,
      description,
      price,
    },
  }

  await dynamoDb.put(params).promise()

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Product created successfully',
      id: id,
      params,
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
