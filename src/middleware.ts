import type { NextRequest } from "next/server";
import { TOKEN_NAME } from "@/constants";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get(TOKEN_NAME)?.value;

    if (
        currentUser &&
        (request.nextUrl.pathname.startsWith("/login") ||
            request.nextUrl.pathname.startsWith("/register"))
    ) {
        return Response.redirect(new URL("/dash", request.url));
    }

    if (!currentUser && request.nextUrl.pathname.startsWith("/dash")) {
        return Response.redirect(
            new URL(
                `/login?redirect=${encodeURI(request.nextUrl.pathname)}`,
                request.url,
            ),
        );
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)"],
};
