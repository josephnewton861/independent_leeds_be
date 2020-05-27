"use strict";
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let responseBody = "";
  let statusCode = 0;

  const params = {
    TableName: "Independents",
  };

  const stringExpression = {
    1: "#key1 = :value1",
    2: "#key1 = :value1 AND #key2 = :value2",
    3: "#key1 = :value1 AND #key2 = :value2 AND #key3 = :value3",
    4: "#key1 = :value1 AND #key2 = :value2 AND #key3 = :value3 AND #key4 = :value4",
    5: "#key1 = :value1 AND #key2 = :value2 AND #key3 = :value3 AND #key4 = :value4 AND #key5 = :value5",
  };

  if (event.queryStringParameters) {
    const keys = Object.keys(event.queryStringParameters);
    const values = Object.values(event.queryStringParameters);
    params.FilterExpression = `${stringExpression[keys.length]}`;
    params.ExpressionAttributeNames = {
      "#key1": keys[0],
      "#key2": keys[1],
      "#key3": keys[2],
      "#key4": keys[3],
      "#key5": keys[4],
    };
    params.ExpressionAttributeValues = {
      ":value1": values[0],
      ":value2": values[1],
      ":value3": values[2],
      ":value4": values[3],
      ":value5": values[4],
    };
  }

  try {
    const data = await documentClient.scan(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 200;
  } catch (error) {
    responseBody = `Unable to get users: ${error}`;
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
