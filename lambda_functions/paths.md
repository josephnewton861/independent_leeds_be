## API

https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta

## /independents

GET:- retrieves all the independents in the database

POST:- posts a new independent to the database, accepts parameters:

```js
{
  emailAddress: "test@email.com",
  username: "test_user"
}
```

## SORT

### https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents?"key"="value"&"key"="value"&"key"="value"&"key"="value"&"key"="value"

n.b. up to five queries can be added to the URL

---

## /independents/:username

GET:- gets independent by username

PATCH:- updates the chosen key of the business by the chosen value, accepts parameters:

```js
{
  key: "emailAddress",
  value: "test1@email.com"
}
```

DELETE:- deletes the chosen business from the database

---

## /independents/:username/inc_vote

PATCH:- increments the businesses vote count, accepts parameters:

```js
{
  value: 1;
}

OR;

{
  value: -1;
}
```

---

## /independents/:username/comments

GET:- gets the comments for the chosen business

POST:- posts a new comment to the chosen business, accepts parameters:

```js
{
  username: "test123",
  body: "What a lovely business you have"
}
```

---

## /independents/:username/comments/:comment_id

DELETE:- deletes a comment by commentId

---

## /independents/:username/comments/:comment_id/inc_vote

PATCH:- increments the comment vote count, accepts parameters:

```js
{
  value: 1;
}

OR;

{
  value: -1;
}
```

---

## /independents/:username/register_business

PATCH: updates the chosen key on the business by the chosen value, accepts parameters:

```js
{
  businessName: "We Feed Leeds",
  postCode: "LL324MP",
  address: "11 Bond Street",
  businessType: "Restaurant",
  logoUrl: "www.logo.com",
  about: "This business serves hot food",
  cuisine: "British",
  vegan: "yes",
  vegetarian: "no",
  halal: "yes",
  glutenFree: "no",
  banner: "www.banner.com",
  menu: "chips, £1.50 yorkshire pudding, £6",
  updates: "Currently doing only regular chips and not cheesy",
  phoneNumber: "07748857372",
  facebook: "www.facebook.com",
  twitter: "www.twitter.com",
  instagram: "www.instagram.com"
}
```
