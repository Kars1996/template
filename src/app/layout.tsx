import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Body from "@/modules/Body/Body";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

import Console from "../modules/Console/Console";
import { newMeta } from "@/modules/meta";
import AOS from "@/lib/Aos/aos";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kars Template",
    description: ":D",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head
                dangerouslySetInnerHTML={{
                    __html: "<!-- Made by Kars 💘 -->",
                }}
             />
            <head>
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </head>
            <Body className={`${inter.className} __kars`}>
                <main className="_kars">
                    <AOS />
                    {children}
                </main>
                <Console />
            </Body>
        </html>
    );
}
