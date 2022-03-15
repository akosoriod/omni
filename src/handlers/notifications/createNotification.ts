import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";


export const handler: APIGatewayProxyHandler = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => new Promise((resolve, reject) => {
   return getResponse({
        statusCode: 200,
        body: {
            msg:'new notification'
        }
    })
    
    

});