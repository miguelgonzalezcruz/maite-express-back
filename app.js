require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

const { celebrate, Joi } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const errorHandling = require("./middlewares/errorHandling");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/maite_db");

const app = express();

app.use(cors("*"));

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://maiteapp.students.nomoredomainssbs.ru",
//   "http://maiteapp.students.nomoredomainssbs.ru",
//   "https://www.maiteapp.students.nomoredomainssbs.ru",
//   "http://www.maiteapp.students.nomoredomainssbs.ru",
//   "https://api.maiteapp.students.nomoredomainssbs.ru",
//   "http://api.maiteapp.students.nomoredomainssbs.ru",
// ];

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
      surname: Joi.string().required().min(2).max(30),
      phone: Joi.string().required().min(5).max(11),
      typeofuser: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser
);

app.use(errorHandling);

app.use("/users", require("./routes/users"), errorHandling);
app.use("/items", require("./routes/furnitureitems"), errorHandling);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
