import type { ProxyConfig, NextRequest } from "next/server";
import { TOKEN_NAME } from "@/constants";

/*
Copyright © 2026 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export function proxy(request: NextRequest) {
  const currentUser = request.cookies.get(TOKEN_NAME)?.value;

  if (
    currentUser &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(
      new URL(
        `/login?redirect=${encodeURI(request.nextUrl.pathname)}`,
        request.url,
      ),
    );
  }
}

export const config: ProxyConfig = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)"],
  // runtime: 'nodejs' // Optional for more advanced node API access
};
