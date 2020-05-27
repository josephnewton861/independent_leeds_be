const axios = require("axios");

const postComment = () => {
  return axios
    .post(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/charming-major-16/comments",
      {
        username: "test",
        body: "test",
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

postComment();
