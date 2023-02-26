const { Joi } = require("celebrate");

const createItemSchema = Joi.object({
  name: Joi.string().required().min(2).max(30),
  price: Joi.number().required().min(0),
  imageUrl: Joi.string().required().uri(),
  description: Joi.string().required().min(10).max(1000),
  forsale: Joi.boolean().required(),
});

const deleteItemSchema = Joi.object({
  itemId: Joi.string().required().length(24).hex(),
});

const bookItemSchema = Joi.object({
  itemId: Joi.string().required().length(24).hex(),
});

const cancelBookItemSchema = Joi.object({
  itemId: Joi.string().required().length(24).hex(),
});

const getItemSchema = Joi.object({
  itemId: Joi.string().required().length(24).hex(),
});

module.exports = {
  createItemSchema,
  deleteItemSchema,
  bookItemSchema,
  cancelBookItemSchema,
  getItemSchema,
};
