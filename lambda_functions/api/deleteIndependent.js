const axios = require("axios");

const deleteIndependent = () => {
  return axios
    .delete(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/test_user2"
    )
    .then((response) => {
      console.log(response);
    });
};

deleteIndependent();
