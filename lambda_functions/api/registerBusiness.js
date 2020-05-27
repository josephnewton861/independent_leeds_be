const axios = require("axios");

const registerBusiness = () => {
  return axios
    .patch(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/polite-gregsbury-71/register_business",
      {
        businessName: "Authentic India",
        postCode: "LS15BW",
        address: "95 E Parade, Leeds",
        businessType: "Restaurant",
        logoUrl: "www.logo.com",
        about:
          "Bringing an authentic indian restaurant experience right into the heart of Leeds. We serve spicy and sumptuous indian dishes ",
        cuisine: "American",
        vegan: "yes",
        vegetarian: "yes",
        halal: "no",
        glutenFree: "no",
        banner: "www.banner.com",
        menu:
          "https://cdn.vox-cdn.com/thumbor/3aGSySIDInQiFyaguKHQ2MNx6E8=/0x7:1000x757/920x613/filters:focal(0x7:1000x757):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/39112552/fud-menu-1.0.png",
        updates:
          "We've just improved our burger recipe, come down and try it out for yourselves!",
        phoneNumber: "07483100100",
        facebook: "www.facebook.com",
        twitter: "www.twitter.com",
        instagram: "www.instagram.com",
      }
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

registerBusiness();
