import { products } from '../data/products';
import { response } from '../utils';

export const getProductsList = async () => {
  try {
    const productsData = await Promise.resolve(products);

    if(!productsData) {
      return response(404, { message: 'Products not found!' });
    }

    return response(200, productsData);
  } catch (error) {
    return response(500, { message: `Internal server error: ${JSON.stringify(error)}` });
  }
};