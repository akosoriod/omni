import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import { getResponse } from "../../helpers/lambdaHelper";
import { User } from "../../entities/user";
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const start: string = event.queryStringParameters?.start || '0';
    const number: string = event.queryStringParameters?.number || '10';

    const users = await User.getUsers(start, number);
    if (users.hasOwnProperty("error")) {
            return getResponse({
            statusCode: 400,
            body: {
                error: users.error
            }
        })
    } else {
        return getResponse({
            statusCode: 200,
            body: {
                users
            }
        })
    }


}