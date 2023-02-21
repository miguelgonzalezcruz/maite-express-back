/* eslint-disable arrow-body-style */
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hubspot = require("@hubspot/api-client");
const Boom = require("boom");

const User = require("../models/user");
const { errorHandling, orFailError } = require("../utils/errors");

const HubsK = process.env.HubsK;
const JWT_SECRET = process.env.JWT_SECRET;

const hubspotClient = new hubspot.Client({
  accessToken: HubsK,
});

// const createUser = async (req, res) => {
//   const { name, surname, email, phone, typeofuser, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       throw Boom.badRequest("User already exists");
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       surname,
//       email,
//       phone,
//       typeofuser,
//       password: hash,
//     });

//     await hubspotClient.crm.contacts.basicApi.create({
//       properties: {
//         email: email,
//         firstname: name,
//         lastname: surname,
//         phone: phone,
//       },
//     });

//     res.status(201).send(newUser);
//   } catch (error) {
//     if (Boom.isBoom(error)) {
//       res.status(error.output.statusCode).json(error.output.payload);
//     } else {
//       errorHandling(error, res);
//     }
//   }
// };

const createUser = (req, res) => {
  const { name, surname, email, phone, typeofuser } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    return bcrypt.hash(req.body.password, 10).then((hash) => {
      User.create({ name, surname, email, phone, typeofuser, password: hash })
        .then((data) => {
          res.status(201).send(data);
        })
        .catch((err) => {
          if (Boom.isBoom(err)) {
            res.status(err.output.statusCode).json(err.output.payload);
          } else {
            errorHandling(err, res);
          }
        });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      if (Boom.isBoom(err)) {
        res.status(err.output.statusCode).json(err.output.payload);
      } else {
        errorHandling(err, res);
      }
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
  User.findById(req.user)
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

module.exports = { getUsers, getUser, createUser, login };
