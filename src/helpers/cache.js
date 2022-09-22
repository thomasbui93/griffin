const cache = new Map();

module.exports.setKey = (key, value, ttlInSeconds) => {
  const expiry = new Date();
  expiry.setSeconds(expiry.getSeconds() + ttlInSeconds);
  cache.set(key, {
    value,
    expiry,
  });
};

module.exports.getKey = (key) => {
  if (!cache.has(key)) return null;
  const { value, expiry } = cache.get(key);
  const now = new Date();
  if (expiry < now) {
    cache.delete(key);
    return null;
  }
  return value;
};
