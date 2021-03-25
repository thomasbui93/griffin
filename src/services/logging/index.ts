const pino = require("pino");

export default pino(pino.destination("./.log"));
