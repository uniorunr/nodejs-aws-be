import { S3Handler, S3Event } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import * as csvParser from 'csv-parser';

const { REGION, SQS_URL } = process.env;
const s3 = new AWS.S3({ region: REGION });
const sqs = new AWS.SQS({ region: REGION });

const parseRecords = async (records) => {
  const recordsPromises = records.map(async record => {
    const Key = record.s3.object.key;
    const parsedRecordKey = Key.replace('uploaded', 'parsed');
    const Bucket = record.s3.bucket.name;

    return new Promise((resolve, reject) => {
      const stream = s3
        .getObject({ Bucket, Key })
        .createReadStream();

      stream
        .pipe(csvParser())
        .on('data', async (data) => {
          const records = data.map(record => sqs.sendMessage({
            MessageBody: JSON.stringify(record),
            QueueUrl: SQS_URL,
          }).promise());

          await Promise.all(records);
        })
        .on('error', ({ stack }) => reject(new Error(stack)))
        .on('end', async () => {
          try {
            await s3
              .copyObject({
                Bucket,
                Key: parsedRecordKey,
                CopySource: `${Bucket}/${Key}`,
              })
              .promise();

            await s3
              .deleteObject({ Bucket, Key })
              .promise();

            resolve();
          } catch(error) {
            reject(error);
          }
        });
    })
  }) 

  await Promise.all(recordsPromises); 
};

const handler: S3Handler = async (event: S3Event): Promise<void> => {
  try {
    const { Records } = event;

    await parseRecords(Records);
  } catch(error) {
    console.error(error);
  }
}

export default handler;