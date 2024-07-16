const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  bank_name: String,
});

const Item = mongoose.model("Item", itemSchema);

const validateItemSchema = Joi.object({
  user_id: Joi.string().required(),
  access_token: Joi.string().required(),
});

// Validate user function
function validateItem(item) {
  return validateItemSchema.validate(item);
}

exports.validate = validateItem;
exports.Item = Item;
