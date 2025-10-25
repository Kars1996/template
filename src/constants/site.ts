import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";

export const APP_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_APP_URL
    : "http://localhost:3000";

export const TOKEN_NAME = "token" as const;

interface Website {
  name: string;
  url: string;
  accentColor: string;
  baseUrl: string;
  enableLenis?: boolean;
  socials?: Record<
    string,
    {
      url: string;
      icon: React.JSX.Element | LucideIcon | IconType;
    }
  >;
}

export const website: Website = {
  name: "kars",
  url: APP_URL!,
  accentColor: "#ff6666",
  baseUrl: "https://kars.bio",
  enableLenis: false,
} as const;
