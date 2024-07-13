const winston = require("winston");
//require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp()
    ),
    exitOnError: true,
  });

  logger.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  logger.rejections.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtRejections.log" })
  );

  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.errors({ stack: true }), // Show stack traces for errors
        winston.format.prettyPrint()
      ),
    }),
    new winston.transports.File({ filename: "logfile.log" })
  );
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: process.env.MONGODB_URL,
  //     options: { useUnifiedTopology: true },
  //   })
  // );
};
