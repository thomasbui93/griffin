const pino = require("pino");

module.exports = pino(pino.destination("./.log"));
