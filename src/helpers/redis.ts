import { config } from "dotenv";
import * as Redis from "ioredis";

config();
const redis = new Redis({
  port: parseInt(process.env.REDIS_PORT),
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_AUTH,
});

export default redis;
