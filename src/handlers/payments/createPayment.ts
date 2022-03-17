import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Payment } from "../../entities/payment";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const {status,payment_method,order_id,amount} = JSON.parse(event.body || '{}');
    const res = new Payment({status,payment_method,order_id,amount});
    const payment = await res.create();
   if (payment.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: payment.error
           }
       })
   } else {
       return getResponse({
           statusCode: 201,
           body: {
                payment
           }
       })
   } 

}