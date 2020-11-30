import {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerHandler,
} from 'aws-lambda';
import * as dotenv from 'dotenv';

dotenv.config();

const generatePolicy = (principalId, resource, effect = 'Deny'): APIGatewayAuthorizerResult => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }],
  },
});

const getValidPassword = username => process.env[username];

const basicAuthorizer: APIGatewayTokenAuthorizerHandler = (
  {
    type,
    methodArn,
    authorizationToken,
  }, 
  _, 
  callback,
) => {
  if (type !== 'TOKEN') {
    return callback('Unauthorized');
  }

  try {
    const [authScheme, encodedCreds] = authorizationToken.split(' ') || [];

    if (!authScheme || !encodedCreds) {
      return callback('Unauthorized');
    }

    const [username, password] = Buffer.from(encodedCreds, 'base64')
      .toString('utf-8')
      .split(':');
    const validPassword = getValidPassword(username);
    const effect = validPassword && validPassword === password ? 'Allow' : 'Deny';
    const policy = generatePolicy(encodedCreds, methodArn, effect);

    return callback(null, policy);
  } catch (error) {
    return callback('Unauthorized');
  }
};

export default basicAuthorizer;