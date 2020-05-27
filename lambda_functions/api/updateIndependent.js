const axios = require("axios");

const updateIndependent = () => {
  return axios
    .patch(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/user4",
      {
        key: "cuisine",
        value: "American",
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

updateIndependent();
