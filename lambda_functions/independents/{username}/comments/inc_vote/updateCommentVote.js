"use strict";
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode = 0;

  const {
    pathParameters: { username, comment_id },
  } = event;

  const eventBody = JSON.parse(event.body);

  let result = await documentClient
    .get({
      TableName: "Independents",
      Key: { username },
    })
    .promise();

  const itemToUpdate = result.Item.comments.find(
    ({ commentId }) => commentId === comment_id
  );

  const indexOfItemToUpdate = result.Item.comments.indexOf(itemToUpdate);

  var params = {
    TableName: "Independents",
    Key: { username },
    UpdateExpression: `ADD comments[${indexOfItemToUpdate}].votes :inc`,
    ExpressionAttributeValues: {
      ":inc": eventBody.value,
    },
  };

  try {
    const data = await documentClient.update(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to register vote on comment ${comment_id} by ${value}: ${error}`;
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
