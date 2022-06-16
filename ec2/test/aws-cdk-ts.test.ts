import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import * as AwsCdkTs from "../lib/aws-cdk-ts-stack";

test("EC2 Created", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsCdkTs.Ec2CdkStack(app, "MyTestStack");
  // THEN

  const template = Template.fromStack(stack);
});
