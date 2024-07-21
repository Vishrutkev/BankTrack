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

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
const compareTxnsByDateAscending = (a, b) =>
  (a.date > b.date) - (a.date < b.date);

router.get(
  "/",
  auth,
  asyncMiddleware(async (request, response, next) => {
    try {
      // Set cursor to empty to receive all historical updates
      let cursor = null;

      // New transaction updates since "cursor"
      let added = [];
      let modified = [];
      let removed = [];
      let hasMore = true;

      const item = await Item.findOne({ user: request.user._id }).select(
        "access_token"
      );

      if (!item) {
        return response.status(404).json({ message: "Item not found" });
      }

      // Iterate through each page of new transaction updates for item
      while (hasMore) {
        const requestPayload = {
          access_token: item.access_token,
          cursor: cursor,
        };
        const response = await client.transactionsSync(requestPayload);
        const data = response.data;

        // Add this page of results
        added = [...added, ...data.added];
        modified = [...modified, ...data.modified];
        removed = [...removed, ...data.removed];
        hasMore = data.has_more;
        // Update cursor to the next cursor
        cursor = data.next_cursor;
        winston.info(data);
      }

      // Return the 8 most recent transactions
      const recently_added = added.sort(compareTxnsByDateAscending).slice(-8);

      response.json({ latest_transactions: recently_added });
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
