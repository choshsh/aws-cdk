#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Ec2CdkStack } from "../lib/aws-cdk-ts-stack";
import {
  CodedeployCdkStack,
  CodedeployCdkStackParam,
} from "../lib/aws-codedeploy-stack";
import { config } from "dotenv";

// 환경변수 (.env)
config();

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION,
};

// Create EC2
new Ec2CdkStack(app, "Ec2CdkStack", {
  env: env,
  tags: {
    stage: "dev",
    service: "test",
  },
});

// Create codedeploy - application, deployment group
const codedeployParam = new CodedeployCdkStackParam(
  "test",
  "dev",
  new cdk.aws_codedeploy.InstanceTagSet({
    stage: ["dev"],
    service: ["test"],
  })
);
new CodedeployCdkStack(app, "CodedeployCdkStack", codedeployParam, {
  env: env,
});
