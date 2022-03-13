import {Effect} from "@aws-cdk/aws-iam/lib/policy-statement";
import * as iam from "@aws-cdk/aws-iam";
import {PolicyStatement} from "@aws-cdk/aws-iam";

export const getIAMPolicy = (
    actions: string[],
    resources: string[] = ['*'],
    effect: Effect = iam.Effect.ALLOW): PolicyStatement => {
    return new iam.PolicyStatement({
        actions,
        resources,
        effect
    })
}