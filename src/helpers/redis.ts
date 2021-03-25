import { config } from "dotenv";
import Redis from "ioredis";

config();
const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_AUTH,
});

export default redis;
