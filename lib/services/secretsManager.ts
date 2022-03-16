import * as secretsManager from "@aws-cdk/aws-secretsmanager";
import * as cdk from "@aws-cdk/core";

export const getSecrets = (scope: cdk.Construct, env:any, opt?: any) => {
    const password = secretsManager.Secret.fromSecretPartialArn(
        scope,
        "password",
        env.DATA_BASE_ARN_SECRET
    ).secretValue.toString();
    return {
        password
    }
}