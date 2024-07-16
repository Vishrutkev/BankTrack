require("dotenv").config();
const express = require("express");
const winston = require("winston");
const { APP_PORT } = require("./startup/constants");
const app = express();

require("./startup/routes")(app);
require("./startup/logging")();
require("./startup/db")();

app.listen(APP_PORT, () => {
  winston.info(`Server is running on http://localhost:${APP_PORT}`);
});
