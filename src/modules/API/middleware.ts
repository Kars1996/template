import type { NextRequest, NextResponse } from "next/server";
import { APIError, handleAndReturnErrorResponse } from "./handler";
import { TOKEN_NAME } from "@constants";

export type RouteHandler<
    T extends Record<string, string> = Record<string, string>,
> = (
    req: NextRequest,
    token: string, // Feel free to change this to user ID, user data or whatever's relevant.
    params: Promise<T>,
) => Promise<NextResponse> | NextResponse;

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
            const token = req.cookies.get(TOKEN_NAME);

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
