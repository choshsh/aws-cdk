#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { AwsCdkTsStack } from '../lib/aws-cdk-ts-stack';

const app = new cdk.App();
new AwsCdkTsStack(app, 'AwsCdkTsStack');
