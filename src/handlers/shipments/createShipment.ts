import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Shipment } from "../../entities/shipment";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { status,date} = JSON.parse(event.body || '{}');
    const ship = new Shipment({status,date});
    const shipment = await ship.create();
   if (shipment.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: shipment.error
           }
       })
   } else {
       return getResponse({
           statusCode: 200,
           body: {
            shipment
           }
       })
   } 

}