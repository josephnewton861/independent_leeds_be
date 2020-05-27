const axios = require("axios");

const testPostCode = "WF59RW";

const coordinates = axios
  .get(`https://api.postcodes.io/postcodes/${testPostCode}`)
  .then((response) => {
    console.log(response.data.result);
  });
