const express = require("express");
const router = express.Router();
const { PLAID_PRODUCTS } = require("../startup/constants");

let ACCESS_TOKEN = null;
let ITEM_ID = null;

router.post("/", function (request, response, next) {
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: PLAID_PRODUCTS,
  });
});

module.exports = router;
