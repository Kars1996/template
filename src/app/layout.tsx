import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Body from "@/modules/Body/Body";

/*
Copyright © 2024 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquieries
*/

import Console from "@/modules/Console/Console";
import { newMeta } from "@/modules/meta";
import AOS from "@/lib/Aos/aos";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kars Template",
    description: "Default text for all apps powered by create-kapp.",
    // keywords: [],
    openGraph: {
        url: "https://kars.bio/",
        type: "website",
        title: "Kars",
        siteName: "kars.bio",
        description: "Default text for all apps powered by create-kapp.",
        images: [
            {
                url: "https://cdn3.kars.bio/assets/banner.png",
                width: 800,
                height: 800,
                alt: "Banner",
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
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
