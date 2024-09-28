import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.scss";
import Body from "@/modules/Body/Body";
import Console from "@/modules/Console/Console";
import AOS from "@/lib/Aos/aos";

/*
Copyright © 2024 Kars (github.com/kars1996)

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

// ? This check assumes you're hosting on vercel. If you're doing something else you will need another check
let check: boolean = false;
if (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA) {
    check = true; // ? On production
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" made-by="kars">
            <Body className={`${inter.className} __kars`}>
                <main className="_kars">
                    <AOS />
                    {children}
                </main>
                <Console check={check} />
            </Body>
        </html>
    );
}
