"use strict";
const AWS = require("aws-sdk");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const {
    pathParameters: { username },
  } = event;

  const params = {
    TableName: "Independents",
    Key: { username },
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (error) {
    responseBody = `Unable to delete user: ${username}: ${error}`;
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
