const CACHE_PREFIX = 'roamwell_';
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

export function saveToCache<T>(key: string, data: T, ttl = DEFAULT_TTL): boolean {
  try {
    const entry = { data, timestamp: Date.now(), ttl };
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    return true;
  } catch (error) {
    console.error('RoamWell Cache save error:', error);
    return false;
  }
}

export function getFromCache<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!item) return null;
    
    const entry = JSON.parse(item);
    if (Date.now() - entry.timestamp > entry.ttl) {
      localStorage.removeItem(`${CACHE_PREFIX}${key}`);
      return null;
    }
    return entry.data;
  } catch (error) {
    return null;
  }
}

export function isOnline(): boolean {
  return typeof window !== 'undefined' && navigator.onLine;
}