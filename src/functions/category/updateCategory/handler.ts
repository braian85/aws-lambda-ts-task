import * as AWS from 'aws-sdk'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

interface Category {
  id: string
  name: string
  images: string[]
  description: string
}

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export const updateCategory = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //parse event body to get category data
  if (!event.body)
    return { statusCode: 400, body: 'Bad request - Handler bueno' }
  const { id, description, images, name }: Category = JSON.parse(event.body)
  const params = {
    TableName: 'Category',
    Key: {
      id: id,
    },
    UpdateExpression:
      'set images = :images, description = :description, #n = :name',
    ExpressionAttributeValues: {
      ':name': name,
      ':description': description,
      ':images': images,
    },
    ExpressionAttributeNames: {
      '#n': 'name'
    },
    ReturnValues: 'ALL_NEW',
  }

  //update category data in dynamoDb
  const result = await dynamoDb.update(params).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Category updated successfully',
      item: result.Attributes,
    }),
  }
}
