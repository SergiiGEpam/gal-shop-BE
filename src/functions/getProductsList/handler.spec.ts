import { getProductsList } from "./handler";
import { ProductsMock } from '../../mocks/products.mock';
import { Context } from "aws-lambda";

describe("getProductsById", () => {
    it("should return list of product from list of products by Id", async () => {
        const res = await getProductsList({} as any,  {} as Context, jest.fn());
        expect(res).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify( ProductsMock),
        });

    });
});
