import { Redis } from "ioredis";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

export interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

export interface RateLimiterResponse {
  success: boolean;
  remaining: number;
  resetTime: number;
}

export interface RateLimiter {
  checkRateLimit(key: string): Promise<RateLimiterResponse>;
}

export class InMemoryRateLimiter implements RateLimiter {
  private store: Record<string, { count: number; startTime: number }> = {};
  private options: RateLimiterOptions;

  constructor(options: RateLimiterOptions) {
    this.options = options;
  }

  async checkRateLimit(key: string): Promise<RateLimiterResponse> {
    const now = Date.now();
    const prefixedKey = `${this.options.keyPrefix || ""}${key}`;

    if (this.store[prefixedKey]) {
      if (now - this.store[prefixedKey].startTime >= this.options.windowMs) {
        delete this.store[prefixedKey];
      }
    }

    if (!this.store[prefixedKey]) {
      this.store[prefixedKey] = {
        count: 1,
        startTime: now,
      };
      return {
        success: true,
        remaining: this.options.maxRequests - 1,
        resetTime: now + this.options.windowMs,
      };
    }

    const record = this.store[prefixedKey];
    const remaining = this.options.maxRequests - record.count;

    if (remaining <= 0) {
      return {
        success: false,
        remaining: 0,
        resetTime: record.startTime + this.options.windowMs,
      };
    }

    record.count++;
    return {
      success: true,
      remaining: remaining - 1,
      resetTime: record.startTime + this.options.windowMs,
    };
  }
}

export class RedisRateLimiter implements RateLimiter {
  private redis: Redis;
  private options: RateLimiterOptions;

  constructor(redisClient: Redis, options: RateLimiterOptions) {
    this.redis = redisClient;
    this.options = options;
  }

  async checkRateLimit(key: string): Promise<RateLimiterResponse> {
    const now = Date.now();
    const prefixedKey = `${this.options.keyPrefix || ""}${key}`;

    const multi = this.redis.multi();

    multi.zremrangebyscore(prefixedKey, 0, now - this.options.windowMs);
    multi.zcard(prefixedKey);
    multi.zadd(prefixedKey, now, `${now}-${Math.random()}`);
    multi.pexpire(prefixedKey, this.options.windowMs);

    const [, requestCount] = (await multi.exec()) as [any, [null, number]];
    const count = requestCount[1];

    if (count >= this.options.maxRequests) {
      const oldestTimestamp = await this.redis.zrange(
        prefixedKey,
        0,
        0,
        "WITHSCORES",
      );
      const resetTime = oldestTimestamp.length
        ? parseInt(oldestTimestamp[1]) + this.options.windowMs
        : now + this.options.windowMs;

      return {
        success: false,
        remaining: 0,
        resetTime,
      };
    }

    return {
      success: true,
      remaining: this.options.maxRequests - count - 1,
      resetTime: now + this.options.windowMs,
    };
  }
}

export function createRateLimiter(
  type: "memory" | "redis",
  options: RateLimiterOptions,
  redisClient?: Redis,
): RateLimiter {
  if (type === "redis" && !redisClient) {
    throw new Error("Redis client is required for Redis rate limiter");
  }

  return type === "memory"
    ? new InMemoryRateLimiter(options)
    : new RedisRateLimiter(redisClient!, options);
}
