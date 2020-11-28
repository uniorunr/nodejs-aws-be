import { getProductsList } from './getProductsList';
import { products } from '../data/products';
import * as DBUtils from '../../db/init';


describe('getProductsList', () => {
  const mockGetProductsListPG = jest.spyOn(DBUtils, 'getProductsList');
  mockGetProductsListPG.mockImplementation(async () => products);

  it('should return all products', async () => {
    const response = await getProductsList({});
    
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(JSON.stringify(products));
  });
});