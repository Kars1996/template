import type { Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Body from "@/modules/Body/Body";
import Console from "@/modules/Console/Console";
import AOS from "@/lib/Aos/aos";
import * as Fonts from "../../public/fonts/fontExports";
import { constructMetadata } from "@/modules/Meta";
import { website } from "@/constants";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

// const inter = Inter({ subsets: ["latin"] });
export const metadata = constructMetadata()

export const viewport: Viewport = {
    themeColor: website.accentColor || "#ffffff"
}

let isProd: boolean = process.env.NODE_ENV === "production";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" made-by="kars">
            <Body className={`${Fonts.Satoshi.className} __kars`}>
                <main className="relative flex min-h-screen w-full flex-col">
                    <AOS />
                    {children}
                    <p className="text-center text-sm text-transparent selection:text-white">Made By Kars ツ</p>
                </main>
                <Console isProd={isProd} />
            </Body>
        </html>
    );
}
