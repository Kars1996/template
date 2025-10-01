import { NextRequest } from "next/server";

// ? File for API related utils. Could add fingerprinting, location services, etc.

export function getClientIP(request: NextRequest): string {
  const IP_HEADERS = [
    "cf-connecting-ip",
    "x-forwarded-for",
    "x-real-ip",
    "x-client-ip",
  ];

  for (const header of IP_HEADERS) {
    const value = request.headers.get(header);
    if (value) {
      return value.split(",")[0].trim();
    }
  }

  return "127.0.0.1";
}

// credit-ignore
