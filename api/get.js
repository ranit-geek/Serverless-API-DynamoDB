'use strict';


const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.get=(event,context,callback)=>{
    const params={
        TableName: process.env.DYNAMODB_TABLE,         
        Key :{
            id: event.pathParameters.id
        },
    }

    dynamoDb.get(params,(error,data)=>{
        if(error)
        {
            console.error(error)
            callback(null,{
                statusCode: error.statusCode || 401,
                headers: { 'Content-Type': 'text/plain' },
                body: "Could\'nt get the user"
            })
        }
        const response={
            statusCode: 200,
            body: JSON.stringify(data),
        }
        callback(null,response)
    });
}