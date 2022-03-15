import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Order } from "../../entities/order";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string =  event.pathParameters?.orderId || '';
    const { user_id,status,total} = JSON.parse(event.body || '{}');
    const order = new Order({user_id,status,total});
    const res = await order.edit(id);
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