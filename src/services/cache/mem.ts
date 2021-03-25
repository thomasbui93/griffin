import { config } from "dotenv";
import { Client } from "memjs";

// By default, the cache is 5 minutes.
const CACHE_TLL = 60 * 5;

config();

const client = Client.create(process.env.MEMCACHIER_SERVERS, {
  failoverTime: 30,
  retries: 2,
  retry_delay: 0.2,
  expires: CACHE_TLL,
  logger: console,
  timeout: 1.0,
  conntimeout: 2.0,
  keepAlive: true,
  keepAliveDelay: 30,
  username: process.env.MEMCACHIER_USERNAME,
  password: process.env.MEMCACHIER_PASSWORD,
});

export const clientSetCache = (key, data, ttl) =>
  new Promise((resolve, reject) => {
    client.set(key, JSON.stringify(data), { expires: ttl }, (err, val) => {
      if (err) reject(err);
      resolve(val);
    });
  });

export const clientGetCache = (key) =>
  new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        reject(err);
      } else {
        const data = val ? val.toString() : val;
        try {
          const parsed = JSON.parse(data.toString());
          resolve(parsed);
        } catch (error) {
          resolve(data);
        }
      }
    });
  });

export const setCache = async (key, data, ttl = CACHE_TLL) => {
  try {
    await clientSetCache(key, data, { expires: ttl });
    return data;
  } catch (err) {
    return undefined;
  }
};

export const getCache = async (key) => {
  try {
    const data = await clientGetCache(key);
    return data;
  } catch (err) {
    return undefined;
  }
};

export const healthCheck = async () => {
  await setCache("STATUS", "1");
  const status = await getCache("STATUS");

  return status === "1";
};
