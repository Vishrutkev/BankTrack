require("dotenv").config();
const express = require("express");
const winston = require("winston");
const { APP_PORT } = require("./startup/constants");
const app = express();

require("./startup/routes")(app);
require("./startup/logging")();

app.listen(APP_PORT, () => {
  console.log("Starting the server....");
  winston.info(`Server is running on http://localhost:${APP_PORT}`);
});
