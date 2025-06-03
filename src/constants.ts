export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const TOKEN_NAME = "token" as const;

interface Website {
    name: string;
    url: string;
    accentColor: string;
    viewportColor?: string; // Side embed color on discord
    socials?: Record<string, {
        url: string;
        icon: React.JSX.Element;
    }>
}

export const website: Website = {
    name: "kars",
    url: "https://kars.bio",
    accentColor: "#ff6666",
    viewportColor: "#ff6666",
} as const;
