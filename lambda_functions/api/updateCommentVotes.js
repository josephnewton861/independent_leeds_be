const axios = require("axios");

const updateCommentVote = () => {
  return axios
    .patch(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/test_user8/comments/29cc4191484a22b003b0b455efabacd4/inc_vote",
      {
        value: 1,
      }
    )
    .then((response) => {
      console.log(response);
    });
};

updateCommentVote();
