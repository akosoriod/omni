# Welcome to my omni Test using CDK TypeScript serverless project

## Sequences Diagrams
* endpoint_example: https://aqv74ub64f.execute-api.us-east-1.amazonaws.com/prod/v1/orders
* SQL file in Docs folder
* json file collection API requests in Docs folder  [Use ThunderClient VSC](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
* 
## Run Local

* `cdk synth Infrastructure-omni-V1-Stack-development > template.yaml`  build proyect and generate yaml architecture file
* `sam local start-api`   run proyect in local

## Run test
* `npm run test`    perform the jest unit tests

## Deploy in AWS
* `cdk deploy Infrastructure-omni-V1-Stack-development` deploy infrastructure stack to your default AWS account/region
* `cdk deploy Pipeline-omni-V1-Stack-development`       deploy pipeline stack to your default AWS account/region
## ERD diagram
![]()
[![N|Solid](./docs/image.png](./docs/ERD.png)

## Diagram cloud serverless architecture
![]()
[![N|Solid](./docs/image.png](./docs/AWS_diagram.png)

## Sequences Diagrams
![]()
[![N|Solid](./docs/image.png)](./docs/Sequences_diagrams.png)

