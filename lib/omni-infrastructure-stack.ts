import * as cdk from '@aws-cdk/core';
import {getApiGatewayResources} from "./services/apiGateway";
import { getIAMPolicy } from './services/iam';
import {getLambdas} from "./services/lambda";

export class OmniInfrastructureStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env: any, props?: cdk.StackProps) {
        super(scope, id, props);


        const {
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
        } = getApiGatewayResources(
            this,
            env,
        );

        const lambdas = getLambdas(
            this,
            env,
            {
                onlySynth: [],
                routes: {
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
            });

        Object.keys(lambdas).forEach((lambdaFunctionKey: string) => {
            const lambdaFunction = lambdas[lambdaFunctionKey];
            lambdaFunction.addToRolePolicy(getIAMPolicy(["rds:*"]));
        })
    }

}

function self(self: any, arg1: string, arg2: { vpcId: string; }) {
    throw new Error('Function not implemented.');
}

