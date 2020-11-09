import { addProduct as addProductPG } from '../../db/init';
import { response , productDataValidation } from '../utils';

export const addProduct = async ({ body }) => {
  try {
    const product = JSON.parse(body);
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