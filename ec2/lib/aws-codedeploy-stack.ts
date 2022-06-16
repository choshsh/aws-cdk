import * as cdk from "aws-cdk-lib";
import * as codedeploy from "aws-cdk-lib/aws-codedeploy";
import { Construct } from "constructs";

export class CodedeployCdkStackParam {
  constructor(
    public applicationName: string,
    public deploymentGroupName: string,
    public instanceTagSet: codedeploy.InstanceTagSet
  ) {
    this.applicationName = applicationName;
    this.deploymentGroupName = deploymentGroupName;
    this.instanceTagSet = instanceTagSet;
  }
}

export class CodedeployCdkStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    parameter: CodedeployCdkStackParam,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const application = new codedeploy.ServerApplication(this, "Application", {
      applicationName: parameter.applicationName, // optional property
    });

    const deploymentGroup = new codedeploy.ServerDeploymentGroup(
      this,
      "DeploymentGroup",
      {
        application,
        deploymentGroupName: parameter.deploymentGroupName,
        deploymentConfig: codedeploy.ServerDeploymentConfig.ALL_AT_ONCE,
        installAgent: true,
        // adds EC2 instances matching tags
        ec2InstanceTags: parameter.instanceTagSet,
      }
    );
  }
}
