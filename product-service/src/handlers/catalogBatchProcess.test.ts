import { catalogBatchProcess } from './catalogBatchProcess';
import * as DBUtils from '../../db/init';

jest.mock('aws-sdk', () => ({
  SNS: jest.fn(() => ({
    publish: jest.fn(() => ({
      promise: jest.fn(),
    })),
  })),
}));

const bodyData = {
  title: "Title",
  description: "Description",
  price: 99,
  count: 1,
  img: "https://test.com",
};
const mockEvent = {
  Records: [
    {
      body: JSON.stringify(bodyData),
    }
  ]
}

describe('catalogBatchProcess', () => {
  it('should call addProduct PG function with product data', async () => {
    const addProductMock = jest.spyOn(DBUtils, 'addProduct');

    await catalogBatchProcess(mockEvent);

    expect(addProductMock).toBeCalledTimes(1);
    expect(addProductMock).toBeCalledWith(bodyData);
  });
});