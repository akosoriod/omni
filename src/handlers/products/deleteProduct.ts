import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Product } from "../../entities/product";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string = event.pathParameters?.productId || '';
    const product = await Product.delete(id);
    if (product.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: product.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                product
            }
        })
    } 
}