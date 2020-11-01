import { products } from '../data/products';
import { commonHeaders } from './common';

export const getProductById = async (event) => {
  try {
    const { id } = event.pathParameters;
    const productsData = await Promise.resolve(products);
    const result = productsData.find((product) => product.id === +id);

    if (!result) {
      return {
        statusCode: 404,
        headers: commonHeaders,
        body: JSON.stringify({
          message: `Product with id ${id} not found!`,
        }),
      };
    }
    return {
      statusCode: 200,
      headers: commonHeaders,
      body: JSON.stringify(result),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: commonHeaders,
      body: {
        message: `Internal server error: ${JSON.stringify(error)}`,
      },
    };
  }
};
