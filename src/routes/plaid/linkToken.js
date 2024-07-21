require("dotenv").config();
const express = require("express");
const router = express.Router();
const winston = require("winston");
const asyncMiddleware = require("../../middleware/async");
const { configuration } = require("../../startup/config");
const {
  PLAID_PRODUCTS,
  PLAID_COUNTRY_CODES,
  PLAID_REDIRECT_URI,
  PLAID_ANDROID_PACKAGE_NAME,
  PAYMENT_ID,
} = require("../../startup/constants");
const auth = require("../../middleware/auth");
const { PlaidApi, Products } = require("plaid");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const client = new PlaidApi(configuration);

router.post(
  "_for_payment",
  asyncMiddleware(async (request, response, next) => {
    try {
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

      const createPaymentResponse = await client.paymentInitiationPaymentCreate(
        {
          recipient_id: recipientId,
          reference: "paymentRef",
          amount: {
            value: 1.23,
            currency: "GBP",
          },
        }
      );
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
    } catch (error) {
      next(error);
    }
  })
);

router.post(
  "/",
  auth,
  asyncMiddleware(async (request, response, next) => {
    try {
      const configs = {
        user: {
          // This correspond to a unique id for the current user.
          client_user_id: request.user._id,
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
    } catch (error) {
      next(error);
    }
  })
);

module.exports = router;
