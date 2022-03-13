# Welcome to your CDK TypeScript project

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Run Local

* `cdk synth Infrastructure-omni-V1-Stack-development --no-staging > template.yaml`   compile typescript to js
* `sam local start-api`   watch for changes and compile

## Run test
* `npm run test`    perform the jest unit tests

## Deploy in AWS
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
