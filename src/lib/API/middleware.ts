import type { NextRequest, NextResponse } from "next/server";
import { APIError, handleAndReturnErrorResponse } from "./handler";
import { rateLimitMiddleware, RateLimitConfig } from "./rate-limit.middleware";
import { getDefaultRateLimitConfig } from "@/lib/cache/rate-limit";
import { TOKEN_NAME } from "@constants";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated, or used without prior consent.
Contact me for any enquiries
*/

export type RouteParams = Record<string, string>;

export type BaseRouteHandler<
  TContext = any,
  TParams extends RouteParams = RouteParams,
> = (
  req: NextRequest,
  context: TContext,
  params: Promise<TParams>,
) => Promise<NextResponse> | NextResponse;

export type SimpleRouteHandler<T extends RouteParams = RouteParams> =
  BaseRouteHandler<never, T>;
export type AuthRouteHandler<T extends RouteParams = RouteParams> =
  BaseRouteHandler<string, T>; // Change "string" to whatever type you're returning

export type Middleware<TContext = any> = (req: NextRequest) => Promise<{
  response?: NextResponse;
  context?: TContext;
}>;

export function withAuth<T extends RouteParams>(
  handler: AuthRouteHandler<T>,
): (
  req: NextRequest,
  context: { params: Promise<T> },
) => Promise<NextResponse> {
  return async function (
    req: NextRequest,
    context: { params: Promise<T> },
  ): Promise<NextResponse> {
    try {
      const token = req.cookies.get(TOKEN_NAME); // Change this to check if the token is valid or whatever makes sense.

      if (!token) {
        throw new APIError({
          code: "unauthorized",
          message: "Unauthorized",
        });
      }

      return await handler(req, token.value, context.params);
    } catch (e) {
      return handleAndReturnErrorResponse(e);
    }
  };
}

export function withRateLimit<T extends RouteParams>(
  handler:
    | SimpleRouteHandler<T>
    | BaseRouteHandler<{ rateLimitHeaders: Record<string, string> }, T>,
  config?: RateLimitConfig,
): (
  req: NextRequest,
  context: { params: Promise<T> },
) => Promise<NextResponse> {
  return async function (
    req: NextRequest,
    context: { params: Promise<T> },
  ): Promise<NextResponse> {
    try {
      const rateLimitConfig = config || (await getDefaultRateLimitConfig());
      const rateLimitResponse = await rateLimitMiddleware(req, rateLimitConfig);

      if (rateLimitResponse && rateLimitResponse.status !== 200) {
        return rateLimitResponse;
      }

      const params = context.params;

      if (handler.length >= 3) {
        const rateLimitHeaders = {
          "X-RateLimit-Limit": rateLimitConfig.options.maxRequests.toString(),
          "X-RateLimit-Remaining":
            rateLimitResponse?.headers.get("X-RateLimit-Remaining") || "0",
          "X-RateLimit-Reset":
            rateLimitResponse?.headers.get("X-RateLimit-Reset") || "0",
        };
        return await (
          handler as BaseRouteHandler<
            { rateLimitHeaders: Record<string, string> },
            T
          >
        )(req, { rateLimitHeaders }, params);
      } else {
        return await (handler as SimpleRouteHandler<T>)(
          req,
          {} as never,
          params,
        );
      }
    } catch (e) {
      return handleAndReturnErrorResponse(e);
    }
  };
}
