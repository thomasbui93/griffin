const caches = {};

export const setCache = (key, data, ttl) => {
  caches[key] = {
    data,
    ttl,
    timestamp: new Date(),
  };
  return data;
};

export const getCache = (key) => {
  try {
    const cacheData = caches[key];
    if (typeof cacheData === "undefined") return undefined;
    const diff =
      new Date().getTime() - cacheData.timestamp - cacheData.ttl * 1000;
    return diff > 0 ? undefined : cacheData.data;
  } catch (err) {
    return undefined;
  }
};

export const healthCheck = () => true;
