require("dotenv").config();
const express = require("express");
const router = express.Router();
const winston = require("winston");
const asyncMiddleware = require("../middleware/async");
const { configuration } = require("../startup/config");
const {
  PLAID_PRODUCTS,
  PLAID_COUNTRY_CODES,
  PLAID_REDIRECT_URI,
  PLAID_ANDROID_PACKAGE_NAME,
} = require("../startup/constants");
const auth = require("../middleware/auth");
const { PlaidApi, Products } = require("plaid");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const { Item } = require("../models/items");
const _ = require("lodash");

const client = new PlaidApi(configuration);

router.post(
  "create_link_token_for_payment",
  asyncMiddleware((request, response, next) => {
    Promise.resolve()
      .then(async function () {
        const createRecipientResponse =
          await client.paymentInitiationRecipientCreate({
            name: "Harry Potter",
            iban: "GB33BUKB20201555555555",
            address: {
              street: ["4 Privet Drive"],
              city: "Little Whinging",
              postal_code: "11111",
              country: "GB",
            },
          });
        const recipientId = createRecipientResponse.data.recipient_id;

        const createPaymentResponse =
          await client.paymentInitiationPaymentCreate({
            recipient_id: recipientId,
            reference: "paymentRef",
            amount: {
              value: 1.23,
              currency: "GBP",
            },
          });
        winston.info(createPaymentResponse.data);
        const paymentId = createPaymentResponse.data.payment_id;

        // TODO: store it in a secure persistent data store along with the Payment metadata, such as userId.
        PAYMENT_ID = paymentId;

        const configs = {
          client_name: "Plaid Quickstart",
          user: {
            // This correspond to a unique id for the current user.
            client_user_id: uuidv4(),
          },
          country_codes: PLAID_COUNTRY_CODES,
          language: "en",
          // The 'payment_initiation' product has to be the only element in the 'products' list.
          products: [Products.PaymentInitiation],
          payment_initiation: {
            payment_id: paymentId,
          },
        };
        if (PLAID_REDIRECT_URI !== "") {
          configs.redirect_uri = PLAID_REDIRECT_URI;
        }
        const createTokenResponse = await client.linkTokenCreate(configs);
        winston.info(createTokenResponse.data);
        response.json(createTokenResponse.data);
      })
      .catch(next);
  })
);

router.get("/api/identity", auth, function (request, response, next) {
  Promise.resolve()
    .then(async function () {
      const item = await Item.findOne({ user: request.user._id }).select(
        "access_token"
      );
      const identityResponse = await client.identityGet({
        access_token: item.access_token,
      });
      prettyPrintResponse(identityResponse);
      response.json({ identity: identityResponse.data.accounts });
    })
    .catch(next);
});

router.post(
  "/api/create_link_token",
  asyncMiddleware((request, response, next) => {
    Promise.resolve()
      .then(async function () {
        const configs = {
          user: {
            // This correspond to a unique id for the current user.
            client_user_id: "user-id",
          },
          client_name: "Plaid Quickstart",
          products: PLAID_PRODUCTS,
          country_codes: PLAID_COUNTRY_CODES,
          language: "en",
        };
        if (PLAID_REDIRECT_URI !== "") {
          configs.redirect_uri = PLAID_REDIRECT_URI;
        }

        if (PLAID_ANDROID_PACKAGE_NAME !== "") {
          configs.android_package_name = PLAID_ANDROID_PACKAGE_NAME;
        }
        if (PLAID_PRODUCTS.includes(Products.Statements)) {
          const statementConfig = {
            end_date: moment().format("YYYY-MM-DD"),
            start_date: moment().subtract(30, "days").format("YYYY-MM-DD"),
          };
          configs.statements = statementConfig;
        }
        const createTokenResponse = await client.linkTokenCreate(configs);
        winston.info(createTokenResponse.data);
        response.json(createTokenResponse.data);
      })
      .catch(next);
  })
);

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
router.post(
  "/api/set_access_token",
  auth,
  asyncMiddleware(async (req, res, next) => {
    PUBLIC_TOKEN = req.body.public_token;
    Promise.resolve()
      .then(async function () {
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
      })
      .catch(next);
  })
);

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
router.get(
  "/api/transactions",
  auth,
  asyncMiddleware(async (request, response, next) => {
    Promise.resolve()
      .then(async function () {
        // Set cursor to empty to receive all historical updates
        let cursor = null;

        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;
        const item = await Item.findOne({ user: request.user._id }).select(
          "access_token"
        );
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
          const request = {
            access_token: item.access_token,
            cursor: cursor,
          };
          const response = await client.transactionsSync(request);
          const data = response.data;
          // Add this page of results
          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;
          // Update cursor to the next cursor
          cursor = data.next_cursor;
          winston.info(response.data);
        }

        const compareTxnsByDateAscending = (a, b) =>
          (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added]
          .sort(compareTxnsByDateAscending)
          .slice(-8);
        response.json({ latest_transactions: recently_added });
      })
      .catch(next);
  })
);

module.exports = router;
