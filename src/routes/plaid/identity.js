require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Item } = require("../../models/items");
const asyncMiddleware = require("../../middleware/async");
const auth = require("../../middleware/auth");
const { PlaidApi } = require("plaid");
const { configuration } = require("../../startup/config");

const client = new PlaidApi(configuration);

router.get(
  "/",
  auth,
  asyncMiddleware(async (request, response, next) => {
    try {
      const item = await Item.findOne({ user: request.user._id }).select(
        "access_token"
      );
      const identityResponse = await client.identityGet({
        access_token: item.access_token,
      });
      prettyPrintResponse(identityResponse);
      response.json({ identity: identityResponse.data.accounts });
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
