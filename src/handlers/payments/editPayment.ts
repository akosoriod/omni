import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Payment } from "../../entities/payment";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string =  event.pathParameters?.paymentId || '';
    const { status,payment_method,order_id,amount} = JSON.parse(event.body || '{}');
    const payment = new Payment({status,payment_method,order_id,amount});   
    const res = await payment.edit(id);
   if (res.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: res.error
           }
       })
   } else {
       return getResponse({
           statusCode: 202,
           body: {
               res
           }
       })
   } 

}