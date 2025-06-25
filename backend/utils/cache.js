const cache = {};

export function getCache(key) {
  const entry = cache[key];
  if (!entry) return null;
  if (Date.now() > entry.expiry) {
    delete cache[key];
    return null;
  }
  return entry.value;
}

export function setCache(key, value, ttl) {
  cache[key] = {
    value,
    expiry: Date.now() + ttl,
  };
}
