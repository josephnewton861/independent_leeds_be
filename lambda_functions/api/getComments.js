const axios = require("axios");

const getComments = () => {
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/test_user8/comments"
    )
    .then((response) => {
      console.log(response);
    });
};

getComments();
