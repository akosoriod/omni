#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {OmniInfrastructureStack} from '../lib/omni-infrastructure-stack';
import {envLocal, envDevelopment, envStaging, envMaster} from "./env";
import {OmniPipelineStack} from "../lib/omni-pipeline-stack";


const app = new cdk.App();

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



app.synth();