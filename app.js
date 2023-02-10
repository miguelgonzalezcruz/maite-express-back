/* eslint-disable import/no-extraneous-dependencies */
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;
mongoose.connect("mongodb://localhost:27017/maite_db");

const app = express();
