'use strict';


const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete=(event,context,callback)=>{

    const params={
        TableName: "newusers",
        Key :{
            id: event.pathParameters.id
        },
    }

    dynamoDb.delete(params,(error)=>{
        if(error)
        {
            console.error(error)
            callback(null,{
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: "Could\'nt remove the user"
            })
        }
        const response={
            statusCode: 200,
            body: JSON.stringify({"status":"deleted"}),
        }
        callback(null,response)
    });
}