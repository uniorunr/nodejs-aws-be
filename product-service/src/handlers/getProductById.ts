import { products } from '../data/products';
import { response } from '../utils';

export const getProductById = async (event) => {
  try {
    const { id } = event.pathParameters;
    const productsData = await Promise.resolve(products);
    const result = productsData.find((product) => product.id === +id);

    if (!result) {
      return response(404, { message: `Product with id ${id} not found!` });
    }

    return response(200, result);
  } catch (error) {
    return response(500, { message: `Internal server error: ${JSON.stringify(error)}` });
  }
};
