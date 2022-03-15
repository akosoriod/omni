import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Payment } from "../../entities/payment";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const start: string = event.queryStringParameters?.start || '1';
    const number: string = event.queryStringParameters?.number || '10';
    const payments = await Payment.getPayments(start, number);
    if (payments.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: payments.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                payments
            }
        })
    }


}