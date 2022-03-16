import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Notification } from "../../entities/notification";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const start: string = event.queryStringParameters?.start || '1';
    const number: string = event.queryStringParameters?.number || '10';
    const notifications = await Notification.getNotifications(start, number);
    if (notifications.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: notifications.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                notifications
            }
        })
    }


}