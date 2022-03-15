import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Shipment } from "../../entities/shipment";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const start: string = event.queryStringParameters?.start || '1';
    const number: string = event.queryStringParameters?.number || '10';
    const shipments = await Shipment.getShipments(start, number);
    if (shipments.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: shipments.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                shipments
            }
        })
    }


}