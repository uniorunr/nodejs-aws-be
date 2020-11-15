import { addProduct as addProductPG } from '../../db/init';
import { response , productDataValidation } from '../utils';

export const addProduct = async (event) => {
  try {
    console.log(`Incoming getProductById request: ${JSON.stringify(event)}`);
    
    const product = JSON.parse(event.body);
    const isValidData = productDataValidation(product);

    if (!isValidData) {
      return response(400, { message: 'Bad request: Invalid input data!' });
    }

    const responseData = await addProductPG(product);

    return response(200, responseData);
  } catch (error) {
    return response(500, { message: `Internal server error: ${JSON.stringify(error)}` });
  }
};