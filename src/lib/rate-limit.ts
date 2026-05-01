import redis from "./redis";

export async function rateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = Math.floor(now / windowSeconds) * windowSeconds;
  const redisKey = `ratelimit:${key}:${windowStart}`;

  const current = await redis.incr(redisKey);
  if (current === 1) {
    await redis.expire(redisKey, windowSeconds);
  }

  const remaining = Math.max(0, maxRequests - current);
  const reset = windowStart + windowSeconds;

  return {
    success: current <= maxRequests,
    remaining,
    reset,
  };
}
