import cache from ".";
const { setCache, getCache } = cache;

export const getCacheKey = (args) =>
  args
    .filter((arg) => !(arg instanceof Function))
    .map((arg) => JSON.stringify(arg))
    .join("_");

export const memoize = (fn, cacheSpace, ttl) => {
  if (!(fn instanceof Function)) {
    throw new Error("Memoize a non-functional argument");
  }

  if (cacheSpace.length === 0) {
    throw new Error("Cached key is not defined.");
  }

  return async function (...args) {
    const cacheKey = `${cacheSpace}__${getCacheKey(args)}`;
    try {
      const cache = await getCache(cacheKey);
      if (!!cache) return [cache, true];
    } catch (err) {
      throw new Error(
        `Failed to get cached result for memoize function: ${err.message}`
      );
    }

    const result = await fn.apply(this, args);

    try {
      await setCache(cacheKey, result, ttl);

      return [result, false];
    } catch (err) {
      throw new Error(
        `Failed to set cached result for memoize function: ${err.message}`
      );
    }
  };
};
