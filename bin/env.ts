import * as cdk from "@aws-cdk/core";


const getEnvVariables = (dependentVariables: any) => {
    const {
        PROJECT_ENVIRONMENT
    } = dependentVariables;

    const PROJECT_NAME = "omni";
    const PROJECT_VERSION = 1;

    let AWS_ACCOUNT;
    switch (PROJECT_ENVIRONMENT) {
        case 'local':
            AWS_ACCOUNT = '000000000000';
            break;
        default:
            AWS_ACCOUNT = '322889881075'
            break;
    }

    const AWS_CURRENT_REGION = 'us-east-1';


    const AWS_ENVIRONMENT = {
        account: AWS_ACCOUNT,
        region: AWS_CURRENT_REGION,
    }

    const REPOSITORY_ARN = `arn:aws:codecommit:${AWS_CURRENT_REGION}:${AWS_ACCOUNT}:${PROJECT_NAME}-API`;
    const PIPELINE_NAME = `Pipeline-${PROJECT_NAME}-V${PROJECT_VERSION}-${PROJECT_ENVIRONMENT}`
    const API_NAME = `${PROJECT_NAME}-V${PROJECT_VERSION}-Api-${PROJECT_ENVIRONMENT}`;
    const STACK_NAME = `${PROJECT_NAME}-V${PROJECT_VERSION}-Stack-${PROJECT_ENVIRONMENT}`;
    const TABLE_NAME = `Database-V1-MainTable-${PROJECT_ENVIRONMENT}`;
    const TABLE_ARN = `arn:aws:dynamodb:${AWS_CURRENT_REGION}:${AWS_ACCOUNT}:table/${TABLE_NAME}`;

    let SUB_PATH;
    switch (PROJECT_ENVIRONMENT) {
        case 'local':
        case 'development':
            SUB_PATH = 'dev.'
            break
        case 'staging':
            SUB_PATH = 'staging.'
            break
        case 'master':
            SUB_PATH = ''
            break
    }


    let REMOVAL_POLICY;
    switch (PROJECT_ENVIRONMENT) {
        case 'master':
            REMOVAL_POLICY = cdk.RemovalPolicy.RETAIN;
            break;
        default:
            REMOVAL_POLICY = cdk.RemovalPolicy.DESTROY;
    }

    let LOCAL_STACK_ENDPOINT;

    switch (PROJECT_ENVIRONMENT) {
        case 'local':
            LOCAL_STACK_ENDPOINT="http://host.docker.internal:4566";
            break;
    }


    return {
        PROJECT_ENVIRONMENT,
        PROJECT_NAME,
        PROJECT_VERSION,
        AWS_ACCOUNT,
        AWS_CURRENT_REGION,
        AWS_ENVIRONMENT,
        REPOSITORY_ARN,
        PIPELINE_NAME,
        API_NAME,
        STACK_NAME,
        TABLE_NAME,
        TABLE_ARN,
        REMOVAL_POLICY,
        LOCAL_STACK_ENDPOINT
    }
}

const localDependentVariables = {
    PROJECT_ENVIRONMENT: "local"
}

export const envLocal = getEnvVariables(localDependentVariables);

const developmentDependentVariables = {
    PROJECT_ENVIRONMENT: "development"
}

export const envDevelopment = getEnvVariables(developmentDependentVariables);

const stagingDependentVariables = {
    PROJECT_ENVIRONMENT: "staging"
}

export const envStaging = getEnvVariables(stagingDependentVariables);

const masterDependentVariables = {
    PROJECT_ENVIRONMENT: "master"
}

export const envMaster = getEnvVariables(masterDependentVariables);