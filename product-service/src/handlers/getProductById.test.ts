import { getProductById } from './getProductById';

describe('getProductById', () => {
  const id = 'testId';
  const mockEvent = {
    pathParameters: { id }
  }

  it('should return 500 if product does not exist', async () => {
    const response = await getProductById(mockEvent);
    
    expect(response.statusCode).toEqual(500);
  });
});