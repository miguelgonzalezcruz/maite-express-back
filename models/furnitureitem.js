const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const furnitureItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Test Furniture Item Name",
  },

  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "Please, enter a valid URL",
    },
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 1000,
    default: "Test Furniture Item Description",
  },
  forsale: {
    type: Boolean,
    required: true,
    default: true,
  },
  booked: {
    type: Boolean,
    required: false,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("furnitureitem", furnitureItemSchema);
