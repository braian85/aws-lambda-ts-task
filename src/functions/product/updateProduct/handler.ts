import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
}

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const updateProduct = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!event.body)  return { statusCode: 400, body: 'Bad request - no body'}
  const { id, name, images, description, price }: Product = JSON.parse(event.body);
  const params = {
    TableName: 'Product',
    Key: {
      id
    },
    UpdateExpression: "set name = :n, images = :i, description = :d, price = :p",
    ExpressionAttributeValues: {
        ":n": name,
        ":i": images,
        ":d": description,
        ":p": price
    },
    ReturnValues: "UPDATED_NEW"
  };

  await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Product updated successfully',
    }),
  };
};
