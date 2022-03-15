import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Product } from "../../entities/Product";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string = event.pathParameters?.['id'] || '';
    const user = await Shipment.delete(id);
    if (user.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: user.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                user
            }
        })
    } 
}