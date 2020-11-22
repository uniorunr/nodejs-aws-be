import { commonHeaders } from '../constants';

export const response = (statusCode, body, headers = {}) => ({
  headers: {
    ...commonHeaders,
    ...headers,
  },
  statusCode,
  body: JSON.stringify(body),
});
