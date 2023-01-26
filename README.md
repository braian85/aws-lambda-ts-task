# AWS LAMBDA TEST TASK 

This project uses AWS Lambda and the Serverless Framework to create a set of functions for managing categories and products.

## Prerequisites
- AWS CLI.
- Serverless Framework.
- An AWS account with permissions to create and manage Lambda functions.

## Setup
1) Clone the repository

When using SSH on Github:

```git clone git@github.com:braian85/aws-lambda-ts-task.git```

2) Install dependencies

```npm install```

## Set up your AWS credentials

```serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY```

API documentation
For detailed API documentation, please refer to the following link:

https://documenter.getpostman.com/view/13248725/2s8ZDeSyPe


### Scripts

- `npm run dev`: Runs the functions locally using the serverless offline command. This is useful for development and testing.
- `npm run deploy`: Deploys the functions to AWS using the sls deploy command with the --verbose flag.