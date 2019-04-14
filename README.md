<!--
Title: Serverless RestFull api made with serverless framework and AWS Lambda which exposes endpoints for all CRUD operations to DynamoDB
layout: Doc
framework: v1
platform: AWS
language: nodeJS
authorLink: 'https://github.com/ranit-geek'
authorName: 'Ranit Dey'
-->
# Serverless REST API with DynamoDB 

## Use-case

Web development/ Api development using Serverless framework, AWS Lambda and DynamoDB

## Setup
Configure your AWS profile for serverless framework to use -> https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-set-up.html

```bash
npm install -g serverless
serverless deploy
```
This will expose all CRUD API's . All lambda functions and Dynamodb will be hosted on AWS according to your configuraions in serverless.YML

## Usage

You can create, retrieve, update, or delete users.

Example:
```
Service Information
service: serverless-API-DynamoDB
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/users
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/users
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/users/{id}
  PUT - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/users/{id}
  DELETE - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/users/{id}
functions:
  serverless-rest-api-with-dynamodb-dev-update: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-update
  serverless-rest-api-with-dynamodb-dev-get: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-get
  serverless-rest-api-with-dynamodb-dev-list: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-list
  serverless-rest-api-with-dynamodb-dev-create: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-create
  serverless-rest-api-with-dynamodb-dev-delete: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-delete
```

## Usage

You can create, retrieve, update, or delete users with the following commands:

### Create a user

```bash
POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users 
{
	"name":"saket",
	"role": "dev",
	"company": "Gojek",
	"age" : 23
    .....
    ...
}
```

Example Result:
```bash
{
    "id": "1d64bbb0-5ea0-11e9-961e-493c96bbb88d",
    "details": {
        "name": "saket",
        "role": "dev",
        "company": "Gojek",
        "age": 23
    },
    "checked": false,
    "createdAt": 1555237739243,
    "updatedAt": 1555237739243
}
```

### List all users

```bash
GET https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users
```

Example output:
```bash
{
    "Items": [
        {
            "checked": false,
            "createdAt": 1555237739243,
            "details": {
                "name": "saket",
                "company": "Gojek",
                "role": "dev",
                "age": 23
            },
            "id": "1d64bbb0-5ea0-11e9-961e-493c96bbb88d",
            "updatedAt": 1555237739243
        },
        {
            "checked": false,
            "createdAt": 1555235323580,
            "details": {
                "name": "ranit",
                "role": "dev"
            },
            "id": "7d8bcfc0-5e9a-11e9-8f01-1b0580d6cb13",
            "updatedAt": 1555235323580
        },
        {
            "checked": false,
            "createdAt": 1555235402330,
            "details": {
                "name": "saket",
                "role": "dev"
            },
            "id": "ac7c1ba0-5e9a-11e9-8f01-1b0580d6cb13",
            "updatedAt": 1555236423459
        }
    ],
    "Count": 3,
    "ScannedCount": 3
}
```

### Get one users

```bash
# Replace the <id> part with a real id from your users table
GET https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users/<id>
```

Example Result:
```bash
{
    "id": "1d64bbb0-5ea0-11e9-961e-493c96bbb88d",
    "details": {
        "name": "saket",
        "role": "dev",
        "company": "Gojek",
        "age": 23
    },
    "checked": false,
    "createdAt": 1555237739243,
    "updatedAt": 1555237739243
}
```

### Update a user

```bash
# Replace the <id> part with a real id from your users table
PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users/<id> 
{
   
        "name": "saket",
        "role": "test",
        "company": "amazon",
        "age": 23
   
}
```

Example Result:
```bash
{
    "id": "1d64bbb0-5ea0-11e9-961e-493c96bbb88d",
    "details": {
        "name": "saket",
        "role": "test",
        "company": "amazon",
        "age": 23
    },
    "checked": false,
    "createdAt": 1555237739243,
    "updatedAt": 1555237799342
}
```

### Delete a user

```bash
# Replace the <id> part with a real id from your users table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/users/<id>
```

{"Status":"deleted"}

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 2
    WriteCapacityUnits: 2
```

In case you expect a lot of traffic fluctuation we recommend to checkout this guide on how to auto scale DynamoDB [https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/](https://aws.amazon.com/blogs/aws/auto-scale-dynamodb-with-dynamic-dynamodb/)

