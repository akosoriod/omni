import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Notification } from "../../entities/notification";


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string = event.pathParameters?.notificationId || '';
    const notification = await Notification.getNotification(id);
    if (notification.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: notification.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                notification
            }
        })
    } 
}