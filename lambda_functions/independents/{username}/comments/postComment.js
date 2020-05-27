"use strict";
const AWS = require("aws-sdk");
const crypto = require("crypto");
const documentClient = new AWS.DynamoDB.DocumentClient();
const generateUUID = () => crypto.randomBytes(16).toString("hex");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;

  const {
    pathParameters: { username },
  } = event;

  const parsedBody = JSON.parse(event.body);

  const params = {
    TableName: "Independents",
    Key: { username },
    UpdateExpression: "set comments = list_append(comments, :nc)",
    ExpressionAttributeValues: {
      ":nc": [
        {
          commentId: generateUUID(),
          username: parsedBody.username,
          body: parsedBody.body,
          createdAt: Date.now(),
        },
      ],
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = data;
    statusCode = 204;
  } catch (error) {
    responseBody = `Unable to post comment: ${error}`;
    statusCode = 403;
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
