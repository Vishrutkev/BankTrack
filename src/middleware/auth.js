const jwt = require("jsonwebtoken");
const winston = require("winston");

function auth(req, res, next) {
  const token = req.header("X-Auth-Token");
  console.log(token);
  if (!token) return res.status(401).send("Access Denied. No token Provided");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    winston.error("Invalid token", ex);
    res.status(400).send("Invalid Token");
  }
}

module.exports = auth;
