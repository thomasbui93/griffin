const caches = {};

const setCache = (key, data, ttl) => {
  caches[key] = {
    data,
    ttl,
    timestamp: new Date(),
  };
  return data;
};

const getCache = (key) => {
  try {
    const cacheData = caches[key];
    if (typeof cacheData === "undefined") return undefined;
    const diff = new Date() - cacheData.timestamp - cacheData.ttl;
    return diff > 0 ? undefined : cacheData.data;
  } catch (err) {
    return undefined;
  }
};

const healthCheck = () => true;

module.exports = {
  setCache,
  getCache,
  healthCheck,
};
