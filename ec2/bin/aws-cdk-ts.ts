#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { Ec2CdkStack } from "../lib/ec2_stack";
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
