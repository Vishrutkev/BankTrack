const express = require("express");
const plaidLinkToken = require("../routes/plaid/linkToken");
const plaidTransaction = require("../routes/plaid/transactions");
const plaidIdentity = require("../routes/plaid/identity");
const plaidSetAccessToken = require("../routes/plaid/setAccessToken");
const info = require("../routes/getInfo");
const error = require("../middleware/error");
const bodyParser = require("body-parser");
const users = require("../routes/users");
const auth = require("../routes/auth");
const chectAuth = require("../routes/checkAuth");
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
  app.use("/api/create_link_token", plaidLinkToken);
  app.use("/api/transactions", plaidTransaction);
  app.use("/api/set_access_token", plaidSetAccessToken);
  app.use("/api/identity", plaidIdentity);
  app.use("/api/info", info);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/checkAuth", chectAuth);
  app.use(error);
};
