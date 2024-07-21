require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Item } = require("../../models/items");
const asyncMiddleware = require("../../middleware/async");
const auth = require("../../middleware/auth");
const { PlaidApi } = require("plaid");
const _ = require("lodash");
const { configuration } = require("../../startup/config");

const client = new PlaidApi(configuration);

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
router.post(
  "/",
  auth,
  asyncMiddleware(async (req, res, next) => {
    try {
      PUBLIC_TOKEN = req.body.public_token;
      const tokenResponse = await client.itemPublicTokenExchange({
        public_token: PUBLIC_TOKEN,
      });
      // winston.info(tokenResponse.data);
      const access_token = tokenResponse.data.access_token;
      const item_id = tokenResponse.data.item_id;
      const user_id = req.user._id;

      try {
        let item = await Item.findOne({ user: user_id });
        if (item) {
          item.access_token = access_token;
          item.item_id = item_id;
          await item.save();
        } else {
          item = new Item({
            user: user_id,
            access_token,
            item_id,
          });
          await item.save();
        }
        res.status(201).send(_.pick(item, ["user"]));
      } catch (error) {
        console.error("Error saving item:", error);
        res.status(500).send("Internal Server Error");
      }
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
