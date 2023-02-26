require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hubspot = require("@hubspot/api-client");
const Boom = require("boom");

const User = require("../models/user");

const NotFoundError = require("../errors/not-found-err");
const ConflictError = require("../errors/conflict-err");
const UnauthorizedError = require("../errors/unauthorized-error");
const BadRequestError = require("../errors/bad-request-err");

// const HubsK = process.env.HubsK;
// const JWT_SECRET = process.env.JWT_SECRET;

const { JWT_SECRET, HubsK } = require("../utils/config");

const hubspotClient = new hubspot.Client({
  accessToken: HubsK,
});

const createUser = async (req, res, next) => {
  const { name, surname, email, phone, typeofuser, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const error = new ConflictError("Email already exists");
      console.error(error.message);
      return next(error);
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      surname,
      email,
      phone,
      typeofuser,
      password: hash,
    });

    await hubspotClient.crm.contacts.basicApi.create({
      properties: {
        email: email,
        firstname: name,
        lastname: surname,
        phone: phone,
      },
    });

    res.status(201).send({
      _id: newUser._id,
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      phone: newUser.phone,
      typeofuser: newUser.typeofuser,
    });
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      next(new UnauthorizedError("Invalid email or password"));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getUsers, getUser, createUser, login };
