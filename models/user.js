const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "Please, enter a valid email",
    },
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Test User Name",
  },

  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Test User Surname",
  },

  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
    default: "0000000000",
  },

  typeofuser: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Test User Type",
  },
});

module.exports = mongoose.model("user", userSchema);
