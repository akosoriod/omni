 import * as cdk from '@aws-cdk/core';
import {getApiGatewayResources} from "./services/apiGateway";
import { getIAMPolicy } from './services/iam';
import {getLambdas} from "./services/lambda";
import { Vpc,SecurityGroup } from "@aws-cdk/aws-ec2";
import {getSecrets} from "./services/secretsManager";

export class OmniInfrastructureStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env: any, props?: cdk.StackProps) {
        super(scope, id, props);
        
        // SECRETS

        const {password} = getSecrets(this, env);
        env.DB_PASSWORD = password;

        const defaultVpc = Vpc.fromVpcAttributes(this, 'vpc', {
            vpcId: env.VPC_ID,
            availabilityZones: env.AVAILABILITY_ZONES,
            publicSubnetIds: env.PUBLIC_SUBNETS
        });
        
        const securityGroup = SecurityGroup.fromSecurityGroupId(
            this,
            "SG",
            env.SEGURITYGROUPID
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

