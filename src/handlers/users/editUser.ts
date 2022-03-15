import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { User } from "../../entities/user";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string =  event.pathParameters?.userId || '';
    const { name, email,address,password } = JSON.parse(event.body || '{}');
    const user = new User({name,email,address,password});
    const res = await user.edit(id);
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