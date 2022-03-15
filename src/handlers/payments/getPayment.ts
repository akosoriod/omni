import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Payment } from "../../entities/payment";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string = event.pathParameters?.['id'] || '';
    const payment = await Payment.delete(id);
    if (payment.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: payment.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                payment
            }
        })
    } 
}