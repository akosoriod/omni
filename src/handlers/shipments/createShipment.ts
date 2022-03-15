import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Shipment } from "../../entities/shipment";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { status,date} = JSON.parse(event.body || '{}');
    const shipment = new Shipment({status,date});
    const res = await shipment.create();
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