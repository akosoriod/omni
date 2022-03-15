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

## ERD diagram
![]()
[![N|Solid](https://lh4.googleusercontent.com/Y4QMBHaIP25xY6CmqSiQxaB-JfCasaLv01tRhqZaabqwNXbkG_Z0CY-zliKqztH4MrrKAE7IcKjn9Uqs0kEW=w1230-h830-rw)](https://lh4.googleusercontent.com/Y4QMBHaIP25xY6CmqSiQxaB-JfCasaLv01tRhqZaabqwNXbkG_Z0CY-zliKqztH4MrrKAE7IcKjn9Uqs0kEW=w1230-h830-rw)

## Diagram cloud serverless architecture
![]()
[![N|Solid](https://lh4.googleusercontent.com/axqQrnAYUkJg1BssxF49mX2Pu9UX90tgDgYwGiL9q2ET21H0Vh1glVk5C1aqnlyK_zEnRZ0INE6w8zML1C9N=w1366-h610-rw)](https://lh4.googleusercontent.com/axqQrnAYUkJg1BssxF49mX2Pu9UX90tgDgYwGiL9q2ET21H0Vh1glVk5C1aqnlyK_zEnRZ0INE6w8zML1C9N=w1366-h610-rw)
