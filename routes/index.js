/* eslint-disable import/no-extraneous-dependencies */
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { createUser, login } = require("../controllers/users");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/maite_db");

const app = express();

app.post("/signin", login);
app.post("/signup", createUser);

app.use(express.json());

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins }));

app.use("/users", require("./users"));

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
