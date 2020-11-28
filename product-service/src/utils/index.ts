import { commonHeaders } from '../constants';

export const response = (statusCode, body, headers = commonHeaders) => ({
  headers,
  statusCode,
  body: JSON.stringify(body),
});

export const productDataValidation = (product) => {
  try {
    const {
      title,
      description,
      price,
    } = product;

    if (title && description && price) {
      return true;
    }

    return false;
  } catch(error) {
    return false;
  }
}