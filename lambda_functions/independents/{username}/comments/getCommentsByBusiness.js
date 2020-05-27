"use strict";
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
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
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item.comments);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get comments: ${error}`;
    statusCode = 403;
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
