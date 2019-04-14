'use strict';


const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update=(event,context,callback)=>{
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    const params = {
        TableName: "newusers",
        Key: {
          id: event.pathParameters.id,
        },
       
        ExpressionAttributeValues: {
          ':text': data,
          ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET details = :text, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
      };

    dynamoDb.update(params,(error,data)=>{
        if(error)
        {
            console.error(error)
            callback(null,{
                statusCode: error.statusCode || 204,
                headers: { 'Content-Type': 'text/plain' },
                body: "Can\'t update"
            })
        }
        const response={
            statusCode: 200,
            body: JSON.stringify(data),
        }
        callback(null,response)
    });
}