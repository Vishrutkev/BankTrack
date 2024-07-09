require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { APP_PORT, PLAID_PRODUCTS } = require("./startup/constants");
const generateLinkToken = require("./routes/generateLinkToken");
const app = express();

//TODO: ACCESS_TOKEN: store it in a secure persistent data store
let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;
let ACCOUNT_ID = null;

// The payment_id is only relevant for the UK/EU Payment Initiation product.
let PAYMENT_ID = null;

// The transfer_id and authorization_id are only relevant for Transfer ACH product.
let AUTHORIZATION_ID = null;
let TRANSFER_ID = null;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/", generateLinkToken);

app.post("/api/info", function (request, response, next) {
  response.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: PLAID_PRODUCTS,
  });
});

app.listen(APP_PORT, () => {
  console.log(`Server is running on http://localhost:${APP_PORT}`);
});
