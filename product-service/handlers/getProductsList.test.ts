import { getProductsList } from './getProductsList';
import { products } from '../data/products';

describe('getProductsList', () => {
  it('should return all products', async () => {
    const response = await getProductsList();
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(products));
  });
});