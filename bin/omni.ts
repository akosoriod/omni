#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {OmniInfrastructureStack} from '../lib/omni-infrastructure-stack';
import {envLocal, envDevelopment, envStaging, envMaster} from "./env";
import {OmniPipelineStack} from "../lib/omni-pipeline-stack";


const app = new cdk.App();

// Defined only for local testing
new OmniInfrastructureStack(
    app,
    `${envLocal.PROJECT_NAME}-V${envLocal.PROJECT_VERSION}-InfrastructureStack-local`,
    envLocal,
    {
        env: envLocal.AWS_ENVIRONMENT
    });
// Defined only for local testing

// ----------------------------------------------------------------------

new OmniInfrastructureStack(
    app,
    `Infrastructure-${envDevelopment.PROJECT_NAME}-V${envDevelopment.PROJECT_VERSION}-Stack-development`,
    envDevelopment,
    {
        env: envDevelopment.AWS_ENVIRONMENT
    });

//Pipelines

new OmniPipelineStack(
    app,
    `Pipeline-${envDevelopment.PROJECT_NAME}-V${envDevelopment.PROJECT_VERSION}-Stack-development`,
    envDevelopment,
    {
        env: envDevelopment.AWS_ENVIRONMENT
    });

// Staging

new OmniPipelineStack(
    app,
    `Pipeline-${envStaging.PROJECT_NAME}-V${envStaging.PROJECT_VERSION}-Stack-staging`,
    envStaging,
    {
        env: envStaging.AWS_ENVIRONMENT
    });

// Master

new OmniPipelineStack(
    app,
    `Pipeline-${envMaster.PROJECT_NAME}-V${envMaster.PROJECT_VERSION}-PipelineStack-master`,
    envMaster,
    {
        env: envMaster.AWS_ENVIRONMENT
    });


app.synth();