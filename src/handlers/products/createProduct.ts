import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Callback, Context } from "aws-lambda"; 
import { getResponse } from "../../helpers/lambdaHelper";
import { Product } from "../../entities/product";

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent) => {
    const { name,price} = JSON.parse(event.body || '{}');
    const res = new Product({name,price});
    const product = await res.create();
   if (product.hasOwnProperty("error")) {
           return getResponse({
           statusCode: 400,
           body: {
               error: product.error
           }
       })
   } else {
       return getResponse({
           statusCode: 201,
           body: {
            product
           }
       })
   } 

}