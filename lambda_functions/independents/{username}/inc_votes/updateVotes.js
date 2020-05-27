"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { value } = JSON.parse(event.body);

  const { username } = event.pathParameters;

  const params = {
    TableName: "Independents",
    Key: { username },
    UpdateExpression: `ADD votes :inc`,
    ExpressionAttributeValues: {
      ":inc": value,
    },
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = data;
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to register vote on ${username} by ${value}: ${error}`;
    statusCode = 400;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "applications/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(responseBody),
  };

  return response;
};
