import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface Product {
  id: string;
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const deleteProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!event.body) return { statusCode: 400, body: 'Bad request' };
  const { id }: Product = JSON.parse(event.body);
  const params = {
    TableName: 'Product',
    Key: {
      id
    },
  };

  await dynamoDb.delete(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Product deleted successfully',
    }),
  };
};
