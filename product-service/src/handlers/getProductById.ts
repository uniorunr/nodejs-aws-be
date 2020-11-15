import { getProductById as getProductByIdPG } from '../../db/init';
import { response } from '../utils';

export const getProductById = async (event) => {
  try {
    console.log(`Incoming getProductById request: ${JSON.stringify(event)}`);
    
    const { id } = event.pathParameters;
    const productsData = await getProductByIdPG(id);

    if (!productsData) {
      return response(404, { message: `Product with id ${id} not found!` });
    }

    return response(200, productsData);
  } catch (error) {
    return response(500, { message: `Internal server error: ${JSON.stringify(error)}` });
  }
};
