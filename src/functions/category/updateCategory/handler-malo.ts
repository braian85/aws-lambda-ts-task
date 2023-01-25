import * as AWS from 'aws-sdk';
// import event type
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

interface Category {
  id: string;
  name: string;
  images: string[];
  description: string;
}

export const updateCategory = async (event: APIGatewayProxyEvent ): Promise<APIGatewayProxyResult> => {
  if(!event.body) return { statusCode: 400, body: 'Bad request - saraza' };
  const { id, name, images, description }: Category = JSON.parse(event.body); 

  const params = {
    TableName: 'Category',
    Key: { id },
    UpdateExpression: 'set name = :n, images = :i, description = :d',
    ExpressionAttributeValues: {
      ':n': name,
      ':i': images,
      ':d': description
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
