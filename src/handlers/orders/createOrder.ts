import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Order } from "../../entities/order";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { user_id,status,total} = JSON.parse(event.body || '{}');
    const order = new Order({user_id,status,total});
    const res = await order.create();
   if (res.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: res.error
           }
       })
   } else {
       return getResponse({
           statusCode: 200,
           body: {
               res
           }
       })
   } 

}