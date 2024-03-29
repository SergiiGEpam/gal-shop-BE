import type { AWS } from '@serverless/typescript';

import getProductsById from '@functions/getProductsById';
import getProductsList from '@functions/getProductsList';

const serverlessConfiguration: AWS = {
  service: 'gal-shop-be',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { getProductsById, getProductsList },
  package: { individually: true },
  custom: {
    webpack: {
      excludeFiles: ['**/*.spec.ts'],
    },
  },
};

module.exports = serverlessConfiguration;
