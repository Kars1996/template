import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

import Console from "../modules/Console/Console";
import { newMeta } from "@/modules/meta";

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
    // const meta = {
    //     title: "Kars Templte",
    //     description: ":D",
    // };

    // newMeta(meta);

    return (
        <html lang="en">
            <head>
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </head>
            <body className={`${inter.className} __kars`}>
                <main className="_kars">{children}</main>
                <Console />
            </body>
        </html>
    );
}
