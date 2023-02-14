require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { createUser, login } = require("./controllers/users");
const errorHandling = require("./middlewares/errorHandling");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/maite_db");

const app = express();

const allowedOrigins = ["http://localhost:3000"];

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(errorHandling);

app.use("/users", require("./routes/users"), errorHandling);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
