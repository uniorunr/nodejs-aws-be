import { SNS } from 'aws-sdk';
import { addProduct } from '../../db/init';

const { 
  REGION,
  SNS_TOPIC
} = process.env;

export const catalogBatchProcess = async ({ Records: records }) => {
  const sns = new SNS({ region: REGION });
  const products = records.map(({ body }) => JSON.parse(body));

  const recordsPromises = products.map(async (product) => {
    try {
      await addProduct(product);

      const isOneLeft = product.count > 1 ? 'enough' : 'one left';

      return sns.publish({
        Subject: 'New product added to stock',
        Message: JSON.stringify(product),
        TopicArn: SNS_TOPIC,
        MessageAttributes: {
          quantity: {
            DataType: 'String',
            StringValue: isOneLeft,
          },
        },
      }).promise();
    } catch (error) {
      return sns.publish({
        Subject: 'Error due to adding a new product',
        Message: JSON.stringify(product),
        TopicArn: SNS_TOPIC,
        MessageAttributes: {
          quantity: {
            DataType: 'String',
            StringValue: 'failed',
          },
        },
      }).promise();
    }
  });

  await Promise.all(recordsPromises);
};