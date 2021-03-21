const { config } = require("dotenv");
const Redis = require("ioredis");

config();
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_AUTH,
});

module.exports = redis;
