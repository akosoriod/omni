import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Order } from "../../entities/order";



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string = event.pathParameters?.['id'] || '';
    const order = await Order.delete(id);
    if (order.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: order.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                order
            }
        })
    } 
}