// credit-ignore
// ? Thanks to maria for inspiration
import { website } from "@constants";
import { Metadata } from "next";

export function constructMetadata({
    title,
    fullTitle,
    templateTitle,
    description = "Default text for all apps powered by create-kapp.",
    image = "https://cdn3.kars.bio/assets/banner.png",
    video,
    icons = [
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon.ico",
        },
    ],
    url = website.url,
    canonicalUrl,
    noIndex = false,
    manifest,
}: {
    title?: string;
    fullTitle?: string;
    templateTitle?: string;
    description?: string;
    image?: string | null;
    video?: string | null;
    icons?: Metadata["icons"];
    url?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    manifest?: string | URL | null;
} = {}): Metadata {
    let titleValue: string | { default: string; template: string };
    if (fullTitle) {
        titleValue = fullTitle;
    } else {
        titleValue = {
            default: title || "kars.bio",
            template: `%s • kars.bio`,
        };
    }

    return {
        title: titleValue,
        description,
        openGraph: {
            title,
            description,
            url: url,
            type: "website",
            siteName: "kars.bio",
            ...(image && {
                images: [
                    {
                        url: image,
                        width: 800,
                        height: 800,
                        alt: "Banner",
                    },
                ],
            }),
            ...(video && {
                videos: video,
            }),
        },
        twitter: {
            title,
            description,
            ...(image && {
                card: "summary_large_image",
                images: [image],
            }),
            ...(video && {
                player: video,
            }),
        },
        icons,
        metadataBase: new URL(website.url),
        robots: {
            index: !noIndex,
            follow: !noIndex,
            nocache: true,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
                noimageindex: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        ...((url || canonicalUrl) && {
            alternates: {
                canonical: url || canonicalUrl,
            },
        }),
        ...(manifest && {
            manifest,
        }),
    };
}
