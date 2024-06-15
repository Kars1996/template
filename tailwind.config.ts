import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                primary: {
                    DEFAULT: "#FFF",
                    dark: "#FFF",
                    light: "#000",
                },
                secondary: {
                    DEFAULT: "FFFFFFb2",
                    dark: "#FFFFFFb2",
                    light: "#000000b2",
                },
                bg: {
                    dark: "#121212",
                    light: "#f0f0f0",
                },
            },
        },
    },
    plugins: [],
};
export default config;
