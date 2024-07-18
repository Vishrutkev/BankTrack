const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const validator = require("../middleware/validate");
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", validator(validate), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send(JSON.stringify("Invalid email or password"));

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400);
  if (!user) return res.status(400);

  const token = user.generateAuthToken();
  const data = {
    user_id: user._id,
    token,
  };
  res.send(JSON.stringify(data));
});

const validateAuthSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(255).required(),
});

function validate(user) {
  return validateAuthSchema.validate(user);
}

module.exports = router;
