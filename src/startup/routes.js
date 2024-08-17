const express = require("express");
const plaidLinkToken = require("../routes/plaid/linkToken");
const plaidTransaction = require("../routes/plaid/transactions");
const plaidIdentity = require("../routes/plaid/Identity");
const plaidSetAccessToken = require("../routes/plaid/setAccessToken");
const info = require("../routes/getInfo");
const error = require("../middleware/error");
const bodyParser = require("body-parser");
const users = require("../routes/users");
const auth = require("../routes/auth");
const chectAuth = require("../routes/checkAuth");
const cors = require("cors");

module.exports = function (app) {
  const corsOptions = {
    origin: "http://localhost:3000", // Replace with your frontend's origin
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"], // Allow these headers in requests
    exposedHeaders: ["x-auth-token"], // Expose this header to the frontend
  };
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(bodyParser.json());

  // Use the cors middleware with the options
  app.use(cors(corsOptions));
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
