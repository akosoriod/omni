import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { execute }  from "../../helpers/databaseHelper";
import { getResponse } from "../../helpers/lambdaHelper";


export const handler: APIGatewayProxyHandler = (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => new Promise((resolve, reject) => {
   // const id: string = event.pathParameters?.['id'] || '';
   const res = execute<any>("Select * from user", []);
   return getResponse({
        statusCode: 200,
        body: {
            msg:'Tested',
            item:res
        }
    })
    
    

});