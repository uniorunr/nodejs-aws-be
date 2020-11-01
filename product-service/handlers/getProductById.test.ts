import { getProductById } from './getProductById';
import { products } from '../data/products';

describe('getProductsList', () => {
  const id = 2;
  const mockEvent = {
    pathParameters: { id }
  }

  it('should return all products', async () => {
    const response = await getProductById(mockEvent);
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(products[id - 1]));
  });
});