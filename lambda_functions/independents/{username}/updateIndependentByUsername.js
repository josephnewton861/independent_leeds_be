"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const { key, value } = JSON.parse(event.body);

  const { username } = event.pathParameters;

  const params = {
    TableName: "Independents",
    Key: { username },
    UpdateExpression: `set ${key} = :n`,
    ExpressionAttributeValues: {
      ":n": value,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = data;
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to update user: ${username}'s ${key} by ${value}: ${error}`;
    statusCode = 400;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "applications/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: responseBody,
  };

  return response;
};
