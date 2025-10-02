import type { RateLimitConfig } from "@/lib/API/rate-limit.middleware";

export const getDefaultRateLimitConfig = async (): Promise<RateLimitConfig> => {
  const redis =
    typeof window === "undefined" && process.env.REDIS_URL
      ? (await import("@/lib/cache/redis")).default
      : undefined;

  return {
    type: redis ? "redis" : "memory",
    options: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
      keyPrefix: "rate-limit:",
    },
    redisClient: redis,
  };
};

export const getStrictRateLimitConfig = async (): Promise<RateLimitConfig> => {
  const defaultConfig = await getDefaultRateLimitConfig();
  return {
    ...defaultConfig,
    options: {
      ...defaultConfig.options,
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 5,
    },
  };
};
