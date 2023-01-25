import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

interface Category {
  id: string
  name: string
  images: string[]
  description: string
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const listCategories = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const params = {
    TableName: 'Category',
  }

  const result = await dynamoDb.scan(params).promise()
  const categories = result.Items as Category[]

  return {
    statusCode: 200,
    body: JSON.stringify(categories),
  }
}

export const handler = listCategories
