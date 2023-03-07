require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const helmet = require("helmet");
const { celebrate } = require("celebrate");

const {
  createUserSchema,
  loginSchema,
} = require("./Validation/uservalidation");

const limiter = require("./middlewares/limiter");

const { requestLogger, errorLogger } = require("./middlewares/logger");
const { createUser, login } = require("./controllers/users");
const errorHandling = require("./middlewares/errorHandling");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/maite_db");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://maiteapp.students.nomoredomainssbs.ru",
  "http://maiteapp.students.nomoredomainssbs.ru",
  "https://www.maiteapp.students.nomoredomainssbs.ru",
  "http://www.maiteapp.students.nomoredomainssbs.ru",
  "https://api.maiteapp.students.nomoredomainssbs.ru",
  "http://api.maiteapp.students.nomoredomainssbs.ru",
  "http://maitereciclando.com",
  "http://www.maitereciclando.com",
  "https://maitereciclando.com",
  "https://www.maitereciclando.com",
];

app.use(cors({ origin: allowedOrigins }));

app.use(limiter);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post("/signin", celebrate({ body: loginSchema }), login);

app.post("/signup", celebrate({ body: createUserSchema }), createUser);

app.use(errorHandling);

app.use("/users", require("./routes/users"), errorHandling);
app.use("/items", require("./routes/furnitureitems"), errorHandling);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
