"use strict";
const AWS = require("aws-sdk");
const axios = require("axios");

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  let responseBody = "";
  let statusCode = 0;
  let coordinates;
  let coordinatesError = false;

  const {
    businessName,
    businessEmail,
    postCode,
    address,
    businessType,
    logoUrl,
    about,
    cuisine,
    vegan,
    vegetarian,
    halal,
    glutenFree,
    banner,
    menu,
    updates,
    phoneNumber,
    facebook,
    twitter,
    instagram,
  } = JSON.parse(event.body);

  const coordsPostCode = JSON.parse(event.body);

  const { username } = event.pathParameters;

  try {
    coordinates = await axios.get(
      `https://api.postcodes.io/postcodes/${coordsPostCode.postCode}`
    );
  } catch (error) {
    console.log(error);
    coordinatesError = true;
    responseBody = `${postCode} can not be found: request failed with a status 400`;
    statusCode = 400;
  }

  if (coordinatesError) {
    const response = {
      statusCode: statusCode,
      headers: {
        "Content-Type": "applications/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(responseBody),
    };

    return response;
  } else {
    const params = {
      TableName: "Independents",
      Key: { username },
      UpdateExpression:
        "SET #bn = :bn, #be = :be, #pc = :pc, #ad = :ad, #bt = :bt, #cu = :cu, #ve = :ve, #vg = :vg, #ha = :ha, #gf = :gf, #lu = :lu, #ab = :ab, #ta = :ta, #la = :la, #lo = :lo, #ba = :ba, #me = :me, #up = :up, #pn = :pn, #fb = :fb, #tw = :tw, #ig = :ig, #hb = :hb, #vf = :vf, #co = :co, #vo = :vo",
      ExpressionAttributeNames: {
        "#bn": "businessName",
        "#be": "businessEmail",
        "#pc": "postCode",
        "#ad": "address",
        "#bt": "businessType",
        "#cu": "cuisine",
        "#ve": "vegan",
        "#vg": "vegetarian",
        "#ha": "halal",
        "#gf": "glutenFree",
        "#lu": "logoUrl",
        "#ab": "about",
        "#ta": "tables",
        "#la": "latitude",
        "#lo": "longitude",
        "#ba": "banner",
        "#me": "menu",
        "#up": "updates",
        "#pn": "phoneNumber",
        "#fb": "facebook",
        "#tw": "twitter",
        "#ig": "instagram",
        "#hb": "hasBusiness",
        "#co": "comments",
        "#vf": "verified",
        "#vo": "votes",
      },
      ExpressionAttributeValues: {
        ":bn": businessName || null,
        ":be": businessEmail || null,
        ":pc": postCode || null,
        ":ad": address || null,
        ":bt": businessType || null,
        ":cu": cuisine || null,
        ":ve": vegan || null,
        ":vg": vegetarian || null,
        ":ha": halal || null,
        ":gf": glutenFree || null,
        ":lu": logoUrl || null,
        ":ab": about || null,
        ":ta": 0,
        ":la": coordinates.data.result.latitude || null,
        ":lo": coordinates.data.result.longitude || null,
        ":ba": banner || null,
        ":me": menu || null,
        ":up": updates || null,
        ":pn": phoneNumber || null,
        ":fb": facebook || null,
        ":tw": twitter || null,
        ":ig": instagram || null,
        ":hb": "yes",
        ":co": [],
        ":vf": "no",
        ":vo": 0,
      },
      ReturnValues: "UPDATED_NEW",
    };

    try {
      const data = await documentClient.update(params).promise();
      responseBody = data;
      statusCode = 200;
    } catch (error) {
      responseBody = `Unable to register business: ${error}`;
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
  }
};
