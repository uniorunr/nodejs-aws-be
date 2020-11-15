import { getProductsList as getProductsListPG } from '../../db/init';
import { response } from '../utils';

export const getProductsList = async (event) => {
  try {
    console.log(`Incoming getProductsList request: ${JSON.stringify(event)}`);
    
    const productsData = await getProductsListPG();

    if(!productsData) {
      return response(404, { message: 'Products not found!' });
    }

    return response(200, productsData);
  } catch (error) {
    return response(500, { message: `Internal server error: ${JSON.stringify(error)}` });
  }
};
