require("dotenv").config();
const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.db;
  mongoose
    .connect(db)
    .then(() => {
      winston.info(`Connected to ${db}...`);
    })
    .catch((err) => {
      winston.error(`Could not connect to ${db}: ${err.message}`);
    });
};
