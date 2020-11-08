import { products } from '../data/products';
import { commonHeaders } from './common';

export const getProductsList = async () => {
  try {
    const productsData = await Promise.resolve(products);

    if(!productsData) {
      return {
        statusCode: 404,
        headers: commonHeaders,
        body: {
          message: `Products not found!`,
        },
      };
    }

    return {
      statusCode: 200,
      headers: commonHeaders,
      body: JSON.stringify(productsData),
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
