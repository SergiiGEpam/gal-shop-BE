import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

export const formatJSONResponse = <T>(response: T) => {
  return {
    statusCode: 200,
    body: JSON.stringify(response),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
}

export const formatJSONNotFoundResponse = (response: Record<string, unknown> ) => {
  return {
    statusCode: 404,
    body: JSON.stringify({message: response}),
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
}
