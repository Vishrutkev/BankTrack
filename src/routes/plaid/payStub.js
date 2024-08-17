require("dotenv").config();
const express = require("express");
const router = express.Router();
const winston = require("winston");
const { Item } = require("../../models/items");
const asyncMiddleware = require("../../middleware/async");
const auth = require("../../middleware/auth");
const { PlaidApi } = require("plaid");
const { configuration } = require("../../startup/config");

const client = new PlaidApi(configuration);

app.get(
  "/api/income/verification/paystubs",
  auth,
  asyncMiddleware(async (request, response, next) => {
    try {
      const paystubsGetResponse = await client.incomeVerificationPaystubsGet({
        access_token: ACCESS_TOKEN,
      });
      prettyPrintResponse(paystubsGetResponse);
      response.json({ error: null, paystubs: paystubsGetResponse.data });
    } catch (error) {
      next(error);
    }
  })
);
