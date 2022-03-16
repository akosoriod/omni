import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Product } from "../../entities/product";



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const start: string = event.queryStringParameters?.start || '0';
    const number: string = event.queryStringParameters?.number || '10';
    const products = await Product.getProducts(start, number);
    if (products.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: products.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                products
            }
        })
    }


}