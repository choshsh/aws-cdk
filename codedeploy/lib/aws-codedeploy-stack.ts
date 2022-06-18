import * as cdk from "aws-cdk-lib";
import * as codedeploy from "aws-cdk-lib/aws-codedeploy";
import { Construct } from "constructs";

interface CodedeployProps extends cdk.StackProps {
  applicationName: string;
  deploymentGroupName: string;
  instanceTagSet: codedeploy.InstanceTagSet;
}

export class CodedeployCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: CodedeployProps) {
    super(scope, id, props);

    const application = new codedeploy.ServerApplication(this, "Application", {
      applicationName: props.applicationName, // optional property
    });

    const deploymentGroup = new codedeploy.ServerDeploymentGroup(
      this,
      "DeploymentGroup",
      {
        application,
        deploymentGroupName: props.deploymentGroupName,
        deploymentConfig: codedeploy.ServerDeploymentConfig.ALL_AT_ONCE,
        installAgent: true,
        // adds EC2 instances matching tags
        ec2InstanceTags: props.instanceTagSet,
      }
    );
  }
}
