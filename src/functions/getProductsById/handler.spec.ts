import { getProductsById } from "./handler";
import { ProductsMock } from '../../mocks/products.mock';
import { Context } from "aws-lambda";

const getMockEvent = (pathParameters) => {
    return ({
        pathParameters,
        httpMethod: "GET",
        path: "products",
        headers: undefined,
        multiValueHeaders: undefined,
        isBase64Encoded: false,
        queryStringParameters: undefined,
        multiValueQueryStringParameters: undefined,
        stageVariables: undefined,
        requestContext: undefined,
        resource: "",
        body: undefined
    })
};


describe("getProductsById", () => {
    it("should return special product from list of products by Id", async () => {
        const res = await getProductsById(getMockEvent({ productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" }),  {} as Context, jest.fn());
        expect(res).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(ProductsMock[0]),
        });
    });
    it("should return an error not found", async () => {
        const res = await getProductsById(getMockEvent({ productId: "unknown" }),  {} as Context, jest.fn());
        expect(res).toEqual({
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify( {message: 'There is no one available product'}),
        });
    });
});
