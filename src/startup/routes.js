const express = require("express");
const generateLinkToken = require("../routes/generateLinkToken");
const info = require("../routes/getInfo");
const error = require("../middleware/error");
const bodyParser = require("body-parser");
const users = require("../routes/users");
const auth = require("../routes/auth");
const cors = require("cors");

module.exports = function (app) {
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());
  app.use(cors());
  app.use(express.json());
  app.use("/", generateLinkToken);
  app.use("/api/info", info);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
