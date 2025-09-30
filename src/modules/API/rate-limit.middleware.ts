import { NextRequest, NextResponse } from "next/server";
import {
  RateLimiter,
  RateLimiterOptions,
  createRateLimiter,
} from "./rate-limiter";
import { APIError, ErrorCode, handleAndReturnErrorResponse } from "./handler";
import { getClientIP } from "./utils";
import type Redis from "ioredis";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

export interface RateLimitConfig {
  type: "memory" | "redis";
  options: RateLimiterOptions;
  redisClient?: Redis;
  keyGenerator?: (req: NextRequest) => string;
}

let rateLimiter: RateLimiter;

export function initializeRateLimiter(config: RateLimitConfig) {
  rateLimiter = createRateLimiter(
    config.type,
    config.options,
    config.redisClient,
  );
}

export async function rateLimitMiddleware(
  req: NextRequest,
  config: RateLimitConfig,
): Promise<NextResponse | undefined> {
  try {
    if (!rateLimiter) {
      initializeRateLimiter(config);
    }

    const keyGenerator = config.keyGenerator || getClientIP;
    const key = keyGenerator(req);

    const result = await rateLimiter.checkRateLimit(key);

    const headers = {
      "X-RateLimit-Limit": config.options.maxRequests.toString(),
      "X-RateLimit-Remaining": result.remaining.toString(),
      "X-RateLimit-Reset": result.resetTime.toString(),
    };

    if (!result.success) {
      throw new APIError({
        code: ErrorCode.RATE_LIMIT_EXCEEDED,
        message: `Rate limit exceeded.`,
      });
    }

    const response = NextResponse.next();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    return response;
  } catch (error) {
    return handleAndReturnErrorResponse(error);
  }
}
