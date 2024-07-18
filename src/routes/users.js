const _ = require("lodash");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const express = require("express");
const validator = require("../middleware/validate");
const router = express.Router();
const { User, validate } = require("../models/user");
const winston = require("winston");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.body._id).select("-password");
  res.send(JSON.stringify(user));
});

router.post("/", validator(validate), async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send(JSON.stringify("User already registered"));

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, JSON.stringify(["_id", "name", "email"])));
});

module.exports = router;
