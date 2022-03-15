cdk deploy --require-approval never -f Infrastructure-omni-V1-Stack-development
cdk synth Infrastructure-omni-V1-Stack-development --no-staging > template2.yaml
type template2.yaml >> template.yaml
sam local start-api 