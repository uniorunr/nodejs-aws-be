import { APIGatewayProxyHandler, APIGatewayProxyEvent } from 'aws-lambda';
import * as AWS from 'aws-sdk';

import { response } from '../utils';

const { BUCKET_NAME: Bucket } = process.env;
const s3 = new AWS.S3({ region: 'eu-west-1' });

const importProductsFile = async (name) => {
  try {
    if (!name) {
      return response(400, { message: 'Bad Request. Incorrect file name!' });
    }

    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket,
      Key: `uploaded/${name}`,
      Expires: 60,
      ContentType: 'text/csv'
    });

    return response(201, { url });
  } catch (error) {
    return response(500, { message: `Internal Server Error: ${error}` });
  }
};

const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
  const { queryStringParameters: { name } = {} } = event;

  return importProductsFile(name);
};

export default handler;