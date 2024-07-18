const mongoose = require("mongoose");
const Joi = require("joi");

const itemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  access_token: {
    type: String,
    required: true,
  },
  item_id: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);

const validateItemSchema = Joi.object({
  access_token: Joi.string().required(),
  item_id: Joi.string().required(),
});

function validateItem(item) {
  return validateItemSchema.validate(item);
}

exports.validate = validateItem;
exports.Item = Item;
