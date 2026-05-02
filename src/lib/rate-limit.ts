const store = new Map<string, { count: number; reset: number }>();
let lastCleanup = 0;

export async function rateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Math.floor(Date.now() / 1000);

  // Clean up expired entries every 5 minutes (on-demand, avoids setInterval leak)
  if (now - lastCleanup > 300) {
    lastCleanup = now;
    for (const [k, entry] of store) {
      if (entry.reset < now) store.delete(k);
    }
  }

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
