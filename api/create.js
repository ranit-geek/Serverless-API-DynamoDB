'use strict';


const AWS = require("aws-sdk")
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid=require("uuid")

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  

  const params = {
    TableName: "newusers",         //TODO get this from environment variable 
    Item: {
      id: uuid.v1(),
      details: data,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb.put(params, (error) => {

    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the user.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};