import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Product } from "../../entities/product";



export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const id: string =  event.pathParameters?.productId || '';
    const { name,price} = JSON.parse(event.body || '{}');
    const product = new Product({name,price});
    const res = await product.edit(id);
   if (res.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: res.error
           }
       })
   } else {
       return getResponse({
           statusCode: 202,
           body: {
               res
           }
       })
   } 

}