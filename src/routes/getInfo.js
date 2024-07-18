const express = require("express");
const router = express.Router();
const { PLAID_PRODUCTS } = require("../startup/constants");
const auth = require("../middleware/auth");
const { Item } = require("../models/items");
const asyncMiddleware = require("../middleware/async");

router.post(
  "/",
  auth,
  asyncMiddleware(async (request, response, next) => {
    response.json({
      products: PLAID_PRODUCTS,
    });
  })
);

module.exports = router;
