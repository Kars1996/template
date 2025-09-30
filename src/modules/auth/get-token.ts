"use server";
import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";

export default async function getToken(request?: Request) {
  if (!request) {
    const cookieStore = await cookies();
    const token = cookieStore.get(TOKEN_NAME)?.value;
    return token || null;
  }

  const authHeader = request.headers.get("Authorization");

  const cookieHeader = request.headers.get("Cookie");
  let token = null;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.trim().split("=");
        acc[key] = value;
        return acc;
      },
      {} as { [key: string]: string },
    );

    token = cookies[TOKEN_NAME];
  }
  return token;
}

// credit-ignore
