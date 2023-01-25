import * as AWS from 'aws-sdk'
import { APIGatewayProxyResult } from 'aws-lambda'

interface Product {
  id: string
  name: string
  images: string[]
  description: string
  price: number
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const listProducts = async (): Promise<APIGatewayProxyResult> => {
const params = {
TableName: 'Product',
}

const result = await dynamoDb.scan(params).promise()
const products = result.Items as Product[]

return {
statusCode: 200,
body: JSON.stringify(products),
}
}