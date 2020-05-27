const axios = require("axios");

const getIndependentByUsername = () => {
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/test_user"
    )
    .then((response) => {
      console.log(response.data.Item);
    });
};

getIndependentByUsername();
