/* eslint-disable consistent-return */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hubspot = require("@hubspot/api-client");

const User = require("../models/user");
const { errorHandling, orFailError } = require("../utils/errors");

const { JWT_SECRET, HubsK } = require("../utils/config");

const hubspotClient = new hubspot.Client({
  accessToken: HubsK,
});

const createUser = (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  const { name, surname, email, phone, typeofuser } = req.body;
  User.findOne({ email }).then((user, err) => {
    if (user) {
      errorHandling(err, res);
    }
    return bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({ name, surname, email, phone, typeofuser, password: hash })
        .then((data) => {
          hubspotClient.crm.contacts.basicApi
            .create({
              properties: {
                email: email,
                firstname: name,
                lastname: surname,
                phone: phone,
              },
            })
            .then(() => {
              res.status(201).send(data);
            })
            .catch((hubspotError) => {
              console.error(hubspotError);
            });
        })
        .catch(() => {
          errorHandling(err, res);
        });
    });
  });
};

const getUsers = (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      errorHandling(err, res);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      orFailError();
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      errorHandling(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      errorHandling(err, res);
    });
};

module.exports = { getUsers, getUser, createUser, login };

// .then(
//   hubspotClient.crm.contacts.basicApi.create({
//     properties: {
//       email: email,
//       firstname: name,
//       lastname: surname,
//     },
//   })
// )

// const hubspotClient = new hubspot.Client({
//   accessToken: YOUR_ACCESS_TOKEN,
// });

// const hubspotClient = new hubspot.Client({
//   apiKey: process.env.HUBSPOT_API_KEY,
// });

// const createUser = (req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   const { name, surname, email, phone, typeofuser } = req.body || {};
//   if (!name || !surname || !email || !phone || !typeofuser) {
//     return res.status(400).send({ error: "Missing required fields" });
//   }
//   User.findOne({ email }).then((user, err) => {
//     if (user) {
//       errorHandling(err, res);
//     }
//     return bcrypt.hash(req.body.password, 10).then((hash) => {
//       User.create({ name, surname, email, phone, typeofuser, password: hash })
//         .then((data) => res.status(201).send(data))
//         .catch(() => {
//           errorHandling(err, res);
//         });
//     });
//   });
// };
