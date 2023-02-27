import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONNotFoundResponse, formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { ProductsMock } from '../../mocks/products.mock';
import { availableProducts } from '../../helpers/products.helper';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  try {
    const allProducts = ProductsMock;
    const products = await availableProducts(allProducts);
    if(!products.length){
      throw new Error('There is no one available product');
    }

    return formatJSONResponse(products);
  }
  catch (e){
    return formatJSONNotFoundResponse(e.message);
  }
};

export const main = middyfy(getProductsList);
