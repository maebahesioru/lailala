const store = new Map<string, { count: number; reset: number }>();

export async function rateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(now / windowSeconds) * windowSeconds;
  const reset = windowStart + windowSeconds;

  const entry = store.get(key);
  if (!entry || entry.reset !== reset) {
    store.set(key, { count: 1, reset });
    return { success: true, remaining: maxRequests - 1, reset };
  }

  entry.count++;
  return {
    success: entry.count <= maxRequests,
    remaining: Math.max(0, maxRequests - entry.count),
    reset,
  };
}

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  for (const [key, entry] of store) {
    if (entry.reset < now) store.delete(key);
  }
}, 300000);
