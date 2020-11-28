import type { Serverless } from 'serverless/aws';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_USERNAME,
  PG_PASSWORD,
  OK_EMAIL,
  FAIL_EMAIL
} = process.env;

const serverlessConfiguration: Serverless = {
  service: {
    name: 'product-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: {
        forceInclude: ['pg']
      },
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-west-1',
    stage: 'dev',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      PG_HOST,
      PG_DATABASE,
      PG_USERNAME,
      PG_PASSWORD,
      PG_PORT: +PG_PORT,
      SQS_URL: {
        Ref: 'SQSQueue',
      },
      SNS_TOPIC: {
        Ref: 'SNSTopic',
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: [{ "Fn::GetAtt": ["SQSQueue", "Arn"] }],
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: [{ Ref: "SNSTopic" }],
      },
    ],
  },
  functions: {
    getProductsList: {
      handler: 'handler.getProductsList',
      events: [
        {
          http: {
            method: 'get',
            path: '/products',
            cors: true,
          },
        },
      ],
    },
    getProductById: {
      handler: 'handler.getProductById',
      events: [
        {
          http: {
            method: 'get',
            path: '/products/{id}',
            request: { parameters: { paths: { id: true } } },
            cors: true,
          },
        },
      ],
    },
    addProduct: {
      handler: 'handler.addProduct',
      events: [
        {
          http: {
            method: 'post',
            path: '/products',
            cors: true,
          },
        },
      ],
    },
    catalogBatchProcess: {
      handler: 'handler.catalogBatchProcess',
      events: [
        {
          sqs: {
            batchSize: 5,
            arn: {
              'Fn::GetAtt': ['SQSQueue', 'Arn'],
            },
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: 'import-products-queue-sqs',
        },
      },
      SNSTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          TopicName: 'new-product-notification-sns',
        },
      },
      SNSOkSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: OK_EMAIL,
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            quantity: ["enough"],
          },
        },
      },
      SNSErrorSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: FAIL_EMAIL,
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
          FilterPolicy: {
            quantity: ["one left", "failed"],
          },
        },
      },
    },
    Outputs: {
      SQSQueueUrl: {
        Value: {
          Ref: 'SQSQueue',
        },
      },
      SQSQueueArn: {
        Value: {
          'Fn::GetAtt': ['SQSQueue', 'Arn'],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;