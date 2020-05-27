const axios = require("axios");
const rug = require("random-username-generator");

const postIndependent = (new_username) => {
  return axios.post(
    "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents",
    {
      emailAddress: `${new_username}@email.com`,
      username: new_username,
    }
  );
};

for (let i = 0; i < 20; i++) {
  const new_username = rug.generate();
  postIndependent(new_username);
}
