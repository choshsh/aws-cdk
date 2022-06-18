#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CodedeployCdkStack } from "../lib/aws-codedeploy-stack";
import { config } from "dotenv";

// 환경변수 (.env)
config();

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
};

// Create codedeploy - application, deployment group
new CodedeployCdkStack(app, "CodedeployCdkStack", {
  applicationName: "test",
  deploymentGroupName: "dev",
  instanceTagSet: new cdk.aws_codedeploy.InstanceTagSet({
    stage: ["dev"],
    service: ["test"],
  }),
  env: env,
});
