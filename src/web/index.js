const healthCheck = require("./health_check");
const poem = require("./api/poem");

module.exports = (app) => {
  app.use("/z/check", healthCheck);
  app.use("/api/poem", poem);
};
