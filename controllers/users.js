require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hubspot = require("@hubspot/api-client");

const User = require("../models/user");
const { errorHandling, orFailError } = require("../utils/errors");

const HubsK = process.env.HubsK;
const JWT_SECRET = process.env.JWT_SECRET;

const hubspotClient = new hubspot.Client({
  accessToken: HubsK,
});

const createUser = async (req, res, next) => {
  const { name, surname, email, phone, typeofuser } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const createdUser = await User.create({
      name,
      surname,
      email,
      phone,
      typeofuser,
      password: hash,
    });
    const hubspotPromise = hubspotClient.crm.contacts.basicApi.create({
      properties: {
        email: email,
        firstname: name,
        lastname: surname,
        phone: phone,
      },
    });
    await Promise.all([hubspotPromise]);
    res.status(201).send(createdUser);
  } catch (err) {
    next(err);
  }
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
