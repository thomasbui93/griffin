const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const errorHandler = require("./web/error");
const notFoundHandler = require("./web/error/404");
const router = require("./web");

module.exports = async () => {
  config();

  const app = express();
  app.use(cors());
  router(app);
  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
};
