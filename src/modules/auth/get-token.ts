"use server";
import { TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";

export default async function getToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(TOKEN_NAME)
        ? cookieStore.get(TOKEN_NAME)!.value!
        : null;
}

// credit-ignore