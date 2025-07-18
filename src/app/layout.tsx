import type { Viewport } from "next";
import "./globals.css";
import Body from "@/modules/layout/Body/Body";
import Console from "@/modules/layout/Console/Console";
import AOS from "@/lib/animations";
import * as Fonts from "../../public/fonts/fontExports";
import { Meta } from "@/modules/layout";
import { website } from "@/constants";
import { Toaster } from "@/components/ui";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

// const inter = Inter({ subsets: ["latin"] });
export const metadata = Meta()

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
                <Toaster />
                <Console isProd={isProd} />
            </Body>
        </html>
    );
}
