const { Joi } = require("celebrate");

const createUserSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(4),
  name: Joi.string().required().min(2).max(30),
  surname: Joi.string().required().min(2).max(30),
  phone: Joi.string().required().min(5).max(11),
  typeofuser: Joi.string().required().min(2).max(30),
});

const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(4),
});

const getCurrentUserSchema = Joi.object({
  email: Joi.string().required().email(),
  name: Joi.string().required().min(2).max(30),
  surname: Joi.string().required().min(2).max(30),
  phone: Joi.string().required().min(5).max(11),
  typeofuser: Joi.string().required().min(2).max(30),
});

module.exports = { createUserSchema, loginSchema, getCurrentUserSchema };
