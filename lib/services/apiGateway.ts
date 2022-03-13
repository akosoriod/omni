import * as apiGateway from "@aws-cdk/aws-apigateway";
import * as cdk from '@aws-cdk/core';
import {EndpointType, SecurityPolicy} from "@aws-cdk/aws-apigateway";

export const getApiGatewayResources = (scope: cdk.Construct, env: any, opt?: any) => {
    const restApi = new apiGateway.RestApi(scope, env.API_NAME, {
        restApiName: env.API_NAME,
        deployOptions: {
            stageName: env.API_STAGE_NAME,
        },
        defaultCorsPreflightOptions: {
            allowHeaders: apiGateway.Cors.DEFAULT_HEADERS,
            allowMethods: apiGateway.Cors.ALL_METHODS,
            allowCredentials: true,
            allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        },
    });


    const versionRoute = restApi.root.addResource(`v${env.PROJECT_VERSION}`);
    const signinRoute = versionRoute.addResource('signin');
    const logoutRoute = versionRoute.addResource('logout');
    const usersRoute = versionRoute.addResource('users');
    const userRoute = usersRoute.addResource('{userId}');
    const ordersRoute = versionRoute.addResource('orders');
    const orderRoute = ordersRoute.addResource('{orderId}');
    const productsRoute = versionRoute.addResource('products');
    const productRoute = productsRoute.addResource('{productId}');
    const paymentsRoute = versionRoute.addResource('payments');
    const paymentRoute = paymentsRoute.addResource('{paymentId}');
    const shipmentsRoute = versionRoute.addResource('shipments');
    const shipmentRoute = shipmentsRoute.addResource('{shipmentId}');
    const notificationRoute = versionRoute.addResource('notification');


    return {
        restApi,
        versionRoute,
        signinRoute,
        logoutRoute,
        usersRoute,
        userRoute,
        ordersRoute,
        orderRoute,
        productsRoute,
        productRoute,
        paymentsRoute,
        paymentRoute,
        shipmentRoute,
        shipmentsRoute,
        notificationRoute
    }
}