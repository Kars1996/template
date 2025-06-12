import Link from "next/link";
import { constructMetadata } from "@/modules/Meta";
import {
    ArrowRight,
    Github,
    Zap,
    Palette,
    Database,
    Shield,
    Sparkles,
    Code,
    Rocket,
    Globe,
} from "lucide-react";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export const metadata = constructMetadata({
    title: "NextJS Quickstart Template",
});

const features = [
    {
        icon: Palette,
        title: "Beautiful Design",
        description:
            "5 variable fonts, 2 Google fonts, and Tailwind CSS ready to go",
    },
    {
        icon: Sparkles,
        title: "Smooth Animations",
        description: "AOS, GSAP, and Lenis for buttery smooth interactions",
    },
    {
        icon: Database,
        title: "Database Ready",
        description: "Prisma integration for seamless database operations",
    },
    {
        icon: Shield,
        title: "Authentication",
        description: "Pre-configured middleware for speedy auth implementation",
    },
    {
        icon: Code,
        title: "ShadCN UI",
        description: "Beautiful, accessible components built with Radix UI",
    },
    {
        icon: Zap,
        title: "Turbopack",
        description: "Blazing fast builds with Next.js Turbopack support",
    },
    {
        icon: Globe,
        title: "API Ready",
        description: "Custom Axios wrapper and API routes ready to use",
    },
    {
        icon: Rocket,
        title: "Production Ready",
        description: "Best practices, conventions, and optimizations included",
    },
];

export default async function IndexPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const { name } = await searchParams;

    return (
        <div className="min-h-screen bg-black text-white">
            <section className="relative flex min-h-screen items-center justify-center px-4">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B16CEA]/10 via-transparent to-[#FFA84B]/10" />
                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
                        <Sparkles className="mr-2 h-4 w-4 text-[#B16CEA]" />
                        NextJS Quickstart Template v3.1
                    </div>

                    <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                        Build{" "}
                        <span className="bg-gradient-to-r from-[#B16CEA] via-[#FF5E69] to-[#FFA84B] bg-clip-text text-transparent">
                            Faster
                        </span>
                        <br />
                        Ship{" "}
                        <span className="bg-gradient-to-r from-[#FFA84B] via-[#FF5E69] to-[#B16CEA] bg-clip-text text-transparent">
                            Smarter
                        </span>
                    </h1>

                    <p className="mb-8 text-xl text-gray-400 md:text-2xl">
                        A production-ready NextJS template with everything you
                        need to build modern web applications.
                    </p>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="https://github.com/kars1996/Template"
                            className="group inline-flex items-center rounded-full bg-gradient-to-r from-[#B16CEA] to-[#FF5E69] px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#B16CEA]/25"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <Link
                            href="https://github.com/kars1996/Template"
                            className="group inline-flex items-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                        >
                            <Github className="mr-2 h-5 w-5" />
                            View on GitHub
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            Everything You Need,{" "}
                            <span className="bg-gradient-to-r from-[#B16CEA] to-[#FFA84B] bg-clip-text text-transparent">
                                Out of the Box
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400">
                            Pre-configured with the best tools and practices for
                            modern web development
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#B16CEA]/20 to-[#FFA84B]/20">
                                    <feature.icon className="h-6 w-6 text-[#B16CEA]" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-32">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-16 text-center">
                        <h2 className="mb-6 font-walsheim text-4xl font-bold tracking-tight md:text-6xl">
                            Get Started in{" "}
                            <span className="bg-gradient-to-r from-[#FF5E69] via-[#B16CEA] to-[#FFA84B] bg-clip-text text-transparent">
                                Seconds
                            </span>
                        </h2>
                        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-400">
                            Choose your preferred method to start building with
                            our NextJS template
                        </p>
                    </div>

                    <div className="mb-12 grid gap-8 md:grid-cols-2">
                        {/* Method 1: create-kapp */}
                        <div className="group relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#B16CEA]/20 to-[#FF5E69]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                                <div className="mb-6 flex items-center justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#B16CEA] to-[#FF5E69]">
                                        <Zap className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <h3 className="mb-4 text-center font-walsheim text-2xl font-bold">
                                    Quick Setup
                                </h3>
                                <p className="mb-8 text-center leading-relaxed text-gray-400">
                                    Use our CLI tool for instant project setup
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <div className="mb-3 text-center text-sm font-medium text-gray-400">
                                            1. Install globally
                                        </div>
                                        <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-center font-geistmono">
                                            <span className="text-[#B16CEA]">
                                                npm
                                            </span>{" "}
                                            <span className="text-white">
                                                i create-kapp@latest -g
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-3 text-center text-sm font-medium text-gray-400">
                                            2. Create project
                                        </div>
                                        <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-center font-geistmono">
                                            <span className="text-[#FF5E69]">
                                                create-kapp
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Method 2: GitHub Clone */}
                        <div className="group relative">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF5E69]/20 to-[#FFA84B]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                            <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                                <div className="mb-6 flex items-center justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF5E69] to-[#FFA84B]">
                                        <Github className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <h3 className="mb-4 text-center font-walsheim text-2xl font-bold">
                                    Manual Clone
                                </h3>
                                <p className="mb-8 text-center leading-relaxed text-gray-400">
                                    Clone directly from GitHub repository
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <div className="mb-3 text-center text-sm font-medium text-gray-400">
                                            1. Clone repository
                                        </div>
                                        <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-center font-geistmono text-sm">
                                            <span className="text-[#FF5E69]">
                                                gh repo clone
                                            </span>{" "}
                                            <span className="text-white">
                                                kars1996/Template
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-3 text-center text-sm font-medium text-gray-400">
                                            2. Install dependencies
                                        </div>
                                        <div className="rounded-xl border border-white/10 bg-black/60 p-4 text-center font-geistmono">
                                            <span className="text-[#FFA84B]">
                                                npm
                                            </span>{" "}
                                            <span className="text-white">
                                                install
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-[#B16CEA]" />
                            <span className="text-sm text-gray-300">
                                Then run{" "}
                                <code className="rounded bg-white/10 px-2 py-1 font-geistmono text-xs text-[#FFA84B]">
                                    npm run dev
                                </code>{" "}
                                to start developing
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/10 px-4 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://kars.bio"
                                target="_blank"
                                className="hover:opacity-80"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 209 40"
                                    className="h-8"
                                >
                                    <path
                                        fill="#fff"
                                        d="M0 5a5 5 0 0 1 5-5h199a5 5 0 0 1 5 5v30a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5Z"
                                    />
                                    <path stroke="#333" d="M40.5 0v40" />
                                    <path
                                        fill="#000"
                                        d="M13.1 27V12.5h3.5v6.1h.2l4.8-6.1h4.2l-5.2 6.4 5.2 8.1h-4.2L18 21.3 16.6 23v4h-3.5Zm41-2V14.8h6.4v1.3h-4.8v3.1h4.5v1.4h-4.5v3h4.9V25H54Zm12 .1a3 3 0 0 1-2.8-1.8 5 5 0 0 1-.4-2.1c0-.8.2-1.5.5-2.1.2-.6.6-1 1.1-1.4a3 3 0 0 1 1.6-.4c.5 0 .9 0 1.2.2l.7.5.3.6h.1v-3.8H70V25h-1.4v-1.2h-.2l-.3.6a2.2 2.2 0 0 1-1.9.7Zm.4-1.2c.4 0 .8-.1 1-.4.3-.2.6-.5.7-1 .2-.3.3-.8.3-1.3s-.1-1-.3-1.4a2 2 0 0 0-.6-1 2 2 0 0 0-1.1-.3c-.5 0-.9.1-1.2.4-.3.2-.5.5-.6 1-.2.3-.3.8-.3 1.3s.1 1 .3 1.4c.1.4.3.7.6 1 .3.2.7.3 1.2.3Zm6.4 1.1v-7.6h1.5V25h-1.5Zm.7-8.8a1 1 0 0 1-.6-.3.8.8 0 0 1-.3-.6c0-.2 0-.5.3-.6.1-.2.4-.3.6-.3.3 0 .5.1.7.3.2.1.3.4.3.6 0 .2-.1.5-.3.6a1 1 0 0 1-.7.3Zm7.2 1.2v1.2h-4.2v-1.2h4.2Zm-3-1.9h1.4v7.3l.1.6c.1.2.2.2.4.3h.9L81 25l-.4.1A3 3 0 0 1 79 25c-.4-.2-.7-.4-.9-.7a2 2 0 0 1-.3-1.1v-7.6Zm10 9.5v-7.6h1.4v1.2h.1c.2-.4.4-.7.8-1 .4-.2.8-.3 1.3-.3s1 0 1.3.3l.8 1c.2-.4.5-.7.9-1 .4-.2.9-.3 1.4-.3.7 0 1.3.2 1.7.6.5.4.7 1.1.7 2V25h-1.5v-5c0-.5-.1-.9-.4-1.1-.3-.2-.6-.4-1-.4-.5 0-.9.2-1.2.5-.2.3-.4.7-.4 1.1V25h-1.5v-5c0-.5 0-.8-.3-1-.3-.3-.6-.5-1-.5-.3 0-.6.1-.8.3-.3.1-.5.3-.6.6l-.2.9V25h-1.5Zm16.5.2c-.7 0-1.4-.2-2-.5a4 4 0 0 1-1.2-1.4c-.3-.6-.4-1.3-.4-2 0-.9.1-1.5.4-2.1a3.2 3.2 0 0 1 3.1-1.9c.4 0 .8 0 1.3.2a3 3 0 0 1 1.8 1.8c.2.5.3 1.1.3 1.8v.5h-6v-1h4.5c0-.5 0-.8-.2-1.1a1.8 1.8 0 0 0-1.7-1 2 2 0 0 0-1 .3 2 2 0 0 0-.8.8 2 2 0 0 0-.3 1v1c0 .4.1.9.3 1.2.2.4.5.7.8.8a2.4 2.4 0 0 0 2 .2l.5-.4c.2-.1.3-.3.4-.6l1.4.3c-.1.4-.3.8-.6 1a3 3 0 0 1-1.1.8 4 4 0 0 1-1.5.3Zm10.3-.2v-7.6h1.5V25h-1.5Zm.8-8.8a1 1 0 0 1-.7-.3.8.8 0 0 1-.3-.6c0-.2.1-.5.3-.6.2-.2.4-.3.7-.3l.6.3c.2.1.3.4.3.6 0 .2 0 .5-.3.6a1 1 0 0 1-.6.3Zm5 4.3V25H119v-7.6h1.5v1.2c.2-.4.5-.7.9-1 .4-.2.8-.3 1.4-.3.5 0 1 0 1.4.3.4.2.7.5.9 1 .2.4.3 1 .3 1.5V25h-1.5v-4.7c0-.5-.1-1-.4-1.3-.3-.3-.7-.4-1.2-.4-.3 0-.6 0-1 .2a1 1 0 0 0-.5.6 2 2 0 0 0-.3 1Zm12.2 4.5V14.8h4a4 4 0 0 1 2 .5c.5.3 1 .7 1.2 1.2.3.5.4 1 .4 1.8a4 4 0 0 1-.4 1.8 3 3 0 0 1-1.3 1.2 4 4 0 0 1-2 .4H134V20h2.2l1-.2.6-.6c.2-.3.2-.6.2-1 0-.3 0-.6-.2-.8a.9.9 0 0 0-.6-.6c-.3-.2-.6-.2-1-.2h-1.5V25h-2.1Zm11.8.1c-.5 0-1 0-1.3-.2-.4-.2-.7-.4-.9-.8-.2-.3-.3-.7-.3-1.2s0-.8.2-1.1l.7-.7a3 3 0 0 1 .9-.4 27.7 27.7 0 0 0 2.7-.5l.2-.4a1 1 0 0 0-.3-.7c-.2-.2-.5-.3-.8-.3-.4 0-.7 0-1 .3-.2.1-.3.3-.4.6l-2-.2a2.7 2.7 0 0 1 1.8-2l1.6-.2 1.2.1 1 .5a2.2 2.2 0 0 1 1 2V25h-2v-1a2.1 2.1 0 0 1-1.3 1 3 3 0 0 1-1 .1Zm.6-1.4c.3 0 .6 0 .8-.2.3-.1.5-.3.6-.5l.2-.7v-.8h-.3a4.8 4.8 0 0 1-.8.2 101.8 101.8 0 0 0-1 .3 1 1 0 0 0-.4.3l-.2.5c0 .3.1.5.3.7l.8.2Zm9.6 4.3a5 5 0 0 1-1.7-.3 3 3 0 0 1-1.2-.7c-.3-.3-.5-.7-.6-1.1l2-.3a1.3 1.3 0 0 0 .8.8l.8.1c.5 0 .8-.1 1.1-.3.3-.3.5-.6.5-1.2v-1.4h-.1a2 2 0 0 1-1.1 1.1l-1 .2a2.8 2.8 0 0 1-2.7-1.6c-.3-.6-.5-1.3-.5-2.1 0-.9.2-1.6.4-2.2.3-.6.7-1 1.2-1.3a2.9 2.9 0 0 1 2.6-.2l.7.5.4.6v-1.2h2.2V25c0 .6-.2 1.2-.5 1.6-.3.4-.8.8-1.3 1a6 6 0 0 1-2 .3Zm0-4.7c.4 0 .7 0 1-.3.2-.1.4-.4.5-.7l.2-1.1c0-.5 0-.9-.2-1.2l-.5-.8c-.3-.2-.6-.3-1-.3-.3 0-.6.1-.8.3l-.5.8c-.2.3-.2.7-.2 1.2 0 .4 0 .8.2 1.1 0 .3.3.6.5.7.2.2.5.3.9.3Zm9.8 1.8a4 4 0 0 1-2-.4c-.6-.3-1-.8-1.4-1.4-.3-.6-.4-1.3-.4-2 0-.9.1-1.6.4-2.2.4-.5.8-1 1.3-1.3.6-.4 1.2-.5 2-.5.5 0 1 0 1.4.2a3.1 3.1 0 0 1 2 2l.2 1.6v.6h-6.5v-1.3h4.5c0-.3 0-.6-.2-.8l-.6-.6-.8-.2c-.3 0-.6.1-.8.3-.3.1-.5.3-.6.6l-.2.8v1.2c0 .4 0 .7.2 1 .1.3.3.5.6.6.3.2.6.3 1 .3l.6-.1.5-.3.3-.5 2 .1c-.2.5-.4.9-.7 1.2a3 3 0 0 1-1.2.9c-.4.2-1 .2-1.6.2Zm7 0c-.4 0-.7 0-.9-.3-.2-.3-.3-.5-.3-.9 0-.3 0-.6.3-.8.2-.2.5-.3.8-.3.4 0 .6 0 .9.3.2.2.3.5.3.8l-.1.6-.5.5-.6.1Zm7.8-7.7V19h-4.6v-1.6h4.6Zm-3.6-1.9h2.1v7.2l.1.4.3.2.4.1a1.8 1.8 0 0 0 .5 0l.3 1.5a6 6 0 0 1-1.1.2c-.5 0-1 0-1.4-.2-.4-.2-.7-.4-.9-.7-.2-.4-.3-.8-.3-1.3v-7.4Zm12 4-1.9.2a1 1 0 0 0-.2-.5l-.4-.3-.7-.1c-.3 0-.6 0-.8.2-.2.1-.3.3-.3.5s0 .4.2.5l.7.3 1.4.3c.8.1 1.3.4 1.7.7.3.3.5.8.5 1.3s-.1 1-.4 1.4c-.3.3-.7.6-1.2.8-.5.2-1.1.3-1.8.3-1 0-1.8-.2-2.4-.6a2 2 0 0 1-1-1.7l2-.1.5.7 1 .2c.3 0 .6 0 .8-.2.3-.1.4-.3.4-.6l-.3-.4c-.1-.2-.4-.2-.7-.3l-1.3-.3c-.8-.1-1.3-.4-1.7-.8a2 2 0 0 1-.5-1.4c0-.4.1-.9.4-1.2.2-.4.6-.7 1-.8l1.8-.3c1 0 1.7.2 2.3.6.5.4.9 1 1 1.6Zm4.2-2.1 1.4 2.6 1.4-2.6h2.2l-2.2 3.8 2.2 3.8h-2.1l-1.5-2.6-1.5 2.6h-2.2l2.3-3.8-2.2-3.8h2.2Z"
                                    />
                                </svg>
                            </Link>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-400">
                            <Link
                                href="https://github.com/kars1996/Template"
                                className="hover:text-white"
                            >
                                GitHub
                            </Link>
                            <Link
                                href="https://kars.bio"
                                className="hover:text-white"
                            >
                                Portfolio
                            </Link>
                            <span>© 2025 Kars</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
