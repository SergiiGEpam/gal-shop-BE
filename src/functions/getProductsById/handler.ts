import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONNotFoundResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { ProductsMock } from '../../mocks/products.mock';
import { findProductById } from '../../helpers/products.helper';

export const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const allProducts = ProductsMock;
    const productId = event.pathParameters?.productId;
    const product = await findProductById(allProducts, productId);
    if(!product){
      throw new Error('There is no one available product');
    }

    return formatJSONResponse(product);
  }
  catch (e){
    return formatJSONNotFoundResponse(e.message);
  }
};

export const main = middyfy(getProductsById);
