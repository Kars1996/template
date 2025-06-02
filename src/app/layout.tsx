import type { Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Body from "@/modules/Body/Body";
import Console from "@/modules/Console/Console";
import AOS from "@/lib/Aos/aos";
import * as Fonts from "../../public/fonts/fontExports";
import { constructMetadata } from "@/modules/Meta/Meta";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

const inter = Inter({ subsets: ["latin"] });
// ? Optional Font (You can add more if you want)
const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    display: "swap",
});

export const metadata = constructMetadata()

export const viewport: Viewport = {
    themeColor: "#ff6666"
}

let isProd: boolean = false;
if (process.env.NODE_ENV === "production") {
    isProd = true;
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" made-by="kars">
            <Body className={`${inter.className} __kars`}>
                <main className="relative flex min-h-screen w-full flex-col">
                    <AOS />
                    {children}
                    <p>Made By Kars ツ</p>
                </main>
                <Console isProd={isProd} />
            </Body>
        </html>
    );
}
