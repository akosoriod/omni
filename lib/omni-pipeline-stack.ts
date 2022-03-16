import * as codeCommit from "@aws-cdk/aws-codecommit";
import * as cdk from '@aws-cdk/core';
import {CodePipeline, CodePipelineSource, ShellStep} from "@aws-cdk/pipelines";
import {OmniInfrastructureStack} from "./omni-infrastructure-stack";


class OmniApiInfrastructureStage extends cdk.Stage {

    constructor(scope: cdk.Construct, id: string, env: any, props?: cdk.StageProps) {
        super(scope, id, props);

        const Stack = new OmniInfrastructureStack(this, env.STACK_NAME, env);

    }
}

export class OmniPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, env: any, props?: cdk.StackProps) {
        super(scope, id, props);

        const repository = codeCommit.Repository.fromRepositoryArn(this, 'Repository', env.REPOSITORY_ARN);

        const pipeline = new CodePipeline(this, env.PIPELINE_NAME, {
            pipelineName: env.PIPELINE_NAME,
            dockerEnabledForSynth: true,
            dockerEnabledForSelfMutation: true,
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.codeCommit(repository, env.PROJECT_ENVIRONMENT),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth'
                   // 'npm run test'
                ],
            }),
        });


        const InfrastructureStage = new OmniApiInfrastructureStage(this, `Infrastructure`, env, {
            env: env.AWS_ENVIRONMENT
        });

        pipeline.addStage(InfrastructureStage);
    }
}
