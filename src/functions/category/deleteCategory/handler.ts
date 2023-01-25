import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface CategoryId {
  id: string;
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const deleteCategory = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!event.body) return { statusCode: 400, body: 'Bad request' };
  const { id }: CategoryId = JSON.parse(event.body);
  const params = {
    TableName: 'Category',
    Key: {
      id
    },
  };

  await dynamoDb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Category deleted successfully',
    }),
  };
};
