const axios = require("axios");

const updateVote = () => {
  return axios
    .patch(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/test_user8/inc_vote",
      {
        value: -1,
      }
    )
    .then((response) => {
      console.log(response);
    });
};

updateVote();
