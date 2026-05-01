import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  retryStrategy: (times) => {
    if (times > 3) return null;
    return Math.min(times * 100, 3000);
  },
  maxRetriesPerRequest: 3,
});

redis.on("error", (err) => {
  // Suppress connection errors during build / when Redis is unavailable
  if (process.env.NODE_ENV === "production") {
    console.error("Redis error:", err.message);
  }
});

export default redis;
