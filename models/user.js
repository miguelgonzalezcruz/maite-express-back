const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    minlength: 4,
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

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect Email or Password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect Email or Password"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
