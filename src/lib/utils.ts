import { twMerge } from "tailwind-merge";
import { TOKEN_NAME } from "@/constants";
import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// ! May Depreciate fully in future versions
// export async function getToken(request?: Request) {
//     // ! Untested. Might not work in all environments
//     if (typeof window === "undefined") {
//         const { cookies } = await import("next/headers");
//         const cookieStore = await cookies();
//         const token = cookieStore.get(TOKEN_NAME)?.value;
//         return token || null;
//     }

//     if (!request) {
//         return null
//     }

//     const authHeader = request.headers.get("Authorization");

//     const cookieHeader = request.headers.get("Cookie");
//     let token = null;

//     if (authHeader?.startsWith("Bearer ")) {
//         token = authHeader.split(" ")[1];
//     } else if (cookieHeader) {
//         const cookies = cookieHeader.split(";").reduce(
//             (acc, cookie) => {
//                 const [key, value] = cookie.trim().split("=");
//                 acc[key] = value;
//                 return acc;
//             },
//             {} as { [key: string]: string },
//         );

//         token = cookies[TOKEN_NAME];
//     }
//     return token;
// }

// credit-ignore