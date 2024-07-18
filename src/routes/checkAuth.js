const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const winston = require("winston");

router.get("/", (req, res) => {
  const token = req.query.token;
  if (!token)
    return res
      .status(401)
      .send(JSON.stringify("Access Denied. No token Provided"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    winston.info(decoded);
    req.user = decoded;
    res.send(JSON.stringify(decoded));
  } catch (ex) {
    res.status(400).send(JSON.stringify("Invalid Token"));
  }
});

module.exports = router;
