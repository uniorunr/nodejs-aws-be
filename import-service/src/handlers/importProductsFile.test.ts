import importProductFile from './importProductsFile';
import { commonHeaders as headers } from '../constants';

const signedUrl = 'https://signedUrlMock';

jest.mock('aws-sdk', () => ({
  S3: jest.fn().mockImplementation(() => ({
    getSignedUrlPromise: jest.fn(() => signedUrl),
  })),
}));

describe('importProductFile', () => {
  it('should return 201 response on succsess', async () => {
    const response = await importProductFile({
      queryStringParameters: { name: 'test.csv' },
    });

    expect(response).toEqual({
      statusCode: 201,
      headers,
      body: JSON.stringify({
        url: signedUrl,
      })
    });
  });

  it('should return 400 response if name query parameter is not specified', async () => {
    const response = await importProductFile({
      queryStringParameters: {},
    });

    expect(response).toEqual({
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: 'Bad Request. Incorrect file name!',
      })
    });
  });
});