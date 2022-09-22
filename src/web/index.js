const poem = require("./api/poem");

module.exports = (app) => {
  app.use("/api/poem", poem);
};
