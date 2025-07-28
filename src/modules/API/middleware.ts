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

export type RouteHandler<
    T extends Record<string, string> = Record<string, string>,
> = (
    req: NextRequest,
    token: string, // Feel free to change this to user ID, user data or whatever's relevant.
    params: Promise<T>,
) => Promise<NextResponse> | NextResponse;

export type SimpleRouteHandler<
    T extends Record<string, string> = Record<string, string>,
> = (
    req: NextRequest,
    params: Promise<T>,
) => Promise<NextResponse> | NextResponse;

export type ContextRouteHandler<
    TContext = any,
    TParams extends Record<string, string> = Record<string, string>,
> = (
    req: NextRequest,
    context: TContext,
    params: Promise<TParams>,
) => Promise<NextResponse> | NextResponse;

export type Middleware<TContext = any> = (req: NextRequest) => Promise<{
    response?: NextResponse;
    context?: TContext;
}>;

export function withAuth<T extends Record<string, string>>(
    handler: RouteHandler<T>,
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

export function withRateLimit<T extends Record<string, string>>(
    handler:
        | SimpleRouteHandler<T>
        | ContextRouteHandler<{ rateLimitHeaders: Record<string, string> }, T>,
    config?: RateLimitConfig,
): (
    req: NextRequest,
    context?: { params: Promise<T> },
) => Promise<NextResponse> {
    return async function (
        req: NextRequest,
        context?: { params: Promise<T> },
    ): Promise<NextResponse> {
        try {
            const rateLimitConfig =
                config || (await getDefaultRateLimitConfig());
            const rateLimitResponse = await rateLimitMiddleware(
                req,
                rateLimitConfig,
            );

            if (rateLimitResponse && rateLimitResponse.status !== 200) {
                return rateLimitResponse;
            }

            const params = context?.params || Promise.resolve({} as T);

            if (handler.length >= 3) {
                const rateLimitHeaders = {
                    "X-RateLimit-Limit":
                        rateLimitConfig.options.maxRequests.toString(),
                    "X-RateLimit-Remaining":
                        rateLimitResponse?.headers.get(
                            "X-RateLimit-Remaining",
                        ) || "0",
                    "X-RateLimit-Reset":
                        rateLimitResponse?.headers.get("X-RateLimit-Reset") ||
                        "0",
                };
                return await (
                    handler as ContextRouteHandler<
                        { rateLimitHeaders: Record<string, string> },
                        T
                    >
                )(req, { rateLimitHeaders }, params);
            } else {
                return await (handler as SimpleRouteHandler<T>)(req, params);
            }
        } catch (e) {
            return handleAndReturnErrorResponse(e);
        }
    };
}

export function withMiddleware<
    TContext = any,
    T extends Record<string, string> = Record<string, string>,
>(
    handler: ContextRouteHandler<TContext, T>,
    ...middlewares: Middleware<TContext>[]
): (
    req: NextRequest,
    context?: { params: Promise<T> },
) => Promise<NextResponse> {
    return async function (
        req: NextRequest,
        context?: { params: Promise<T> },
    ): Promise<NextResponse> {
        try {
            let middlewareContext: TContext = {} as TContext;

            for (const middleware of middlewares) {
                const result = await middleware(req);
                if (result.response) return result.response;
                if (result.context) {
                    middlewareContext = {
                        ...middlewareContext,
                        ...result.context,
                    };
                }
            }

            const params = context?.params || Promise.resolve({} as T);
            return await handler(req, middlewareContext, params);
        } catch (e) {
            return handleAndReturnErrorResponse(e);
        }
    };
}
