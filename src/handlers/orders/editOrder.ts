import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Order } from "../../entities/order";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string =  event.pathParameters?.orderId || '';
    const { user_id,status, products} = JSON.parse(event.body || '{}');
    const res = new Order({user_id,status,products});
    const order = await res.edit(id);
   if (order.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: order.error
           }
       })
   } else {
       return getResponse({
           statusCode: 202,
           body: {
            order
           }
       })
   } 

}