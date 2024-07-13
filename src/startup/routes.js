const express = require("express");
const generateLinkToken = require("../routes/generateLinkToken");
const info = require("../routes/getInfo");
const error = require("../middleware/error");
const bodyParser = require("body-parser");
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
  app.use(error);
};
