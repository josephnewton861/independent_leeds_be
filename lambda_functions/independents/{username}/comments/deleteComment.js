"use strict";
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode = 0;

  const {
    pathParameters: { username },
  } = event;

  let result = await documentClient
    .get({
      TableName: "Independents",
      Key: { username },
    })
    .promise();

  const eventBody = JSON.parse(event.body);

  const itemToDelete = result.Item.comments.find(
    ({ commentId }) => commentId === eventBody.commentId
  );

  const indexOfItemToDelete = result.Item.comments.indexOf(itemToDelete);

  var params = {
    TableName: "Independents",
    Key: { username },
    UpdateExpression: `REMOVE comments[${indexOfItemToDelete}]`,
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = data;
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to delete comment: ${error}`;
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
