"use strict";
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode = 0;

  const { emailAddress, username } = JSON.parse(event.body);

  const params = {
    TableName: "Independents",
    Item: {
      emailAddress: emailAddress,
      username: username,
      hasBusiness: "no",
    },
  };

  try {
    const data = await documentClient.put(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (error) {
    responseBody = `Unable to create user: ${error}`;
    statusCode = 400;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: responseBody,
  };

  return response;
};
