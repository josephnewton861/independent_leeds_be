const axios = require("axios");

const getIndependents = () => {
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents"
    )
    .then((response) => {
      console.log(response.data.Items);
    })
    .catch((error) => {
      console.log(error);
    });
};

getIndependents();
