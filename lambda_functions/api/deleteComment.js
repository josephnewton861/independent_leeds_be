const axios = require("axios");

const deleteComments = () => {
  return axios
    .delete(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/test_user8/comments/b2b975c705c0b4f4339eed2953d3de17"
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

deleteComments();
