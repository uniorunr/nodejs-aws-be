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
      img
    } = product;

    if (title && description && price && img) {
      return true;
    }

    return false;
  } catch(error) {
    return false;
  }
}