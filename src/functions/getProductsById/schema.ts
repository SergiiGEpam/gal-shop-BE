export default {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: { productId: { type: 'string' } },
      required: ['productId'],
    },
  },
  required: ['pathParameters'],
} as const;
