import * as cdk from '@aws-cdk/core';
import {getApiGatewayResources} from "./services/apiGateway";
import { getIAMPolicy } from './services/iam';
import {getLambdas} from "./services/lambda";
import { Vpc,SecurityGroup } from "@aws-cdk/aws-ec2";

export class OmniInfrastructureStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env: any, props?: cdk.StackProps) {
        super(scope, id, props);

        const defaultVpc = Vpc.fromVpcAttributes(this, 'vpc-520f6d2f', {
            vpcId: 'vpc-520f6d2f',
            availabilityZones: ['us-east-1a','us-east-1b','us-east-1c','us-east-1d','us-east-1e','us-east-1f'],
            publicSubnetIds: ['us-east-1a:322889881075','us-east-1b:322889881075','{us-east-1c:322889881075}','us-east-1d:322889881075', 'us-east-1e:322889881075','us-east-1f:322889881075']
        });
        
        const securityGroup = SecurityGroup.fromSecurityGroupId(
            this,
            "SG",
            "sg-7ae39260"
          );

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
                    notificationRoute,       
                },
                defaultVpc,
                securityGroup
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

