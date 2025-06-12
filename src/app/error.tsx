"use client";
import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-black text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-[#B16CEA]/10 via-transparent to-[#FFA84B]/10" />
            <main className="relative z-10 flex flex-col items-center px-4 text-center selection:bg-[#0099ff3d]">
                <div className="group relative mb-8 inline-flex items-center overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B16CEA] via-[#FF5E69] to-[#FFA84B] opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B16CEA] via-[#FF5E69] to-[#FFA84B] p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="absolute inset-[1px] rounded-full bg-black/90 backdrop-blur-sm" />
                    </div>
                    <div className="relative z-10 flex items-center">
                        Internal Server Error
                    </div>
                </div>

                <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
                    Oops!{" "}
                    <span className="bg-gradient-to-r from-[#B16CEA] via-[#FF5E69] to-[#FFA84B] bg-clip-text text-transparent">
                        Something Went Wrong
                    </span>
                </h1>

                <p className="mb-8 text-xl text-gray-400">
                    We encountered an unexpected error.
                    <br />
                    Please try again later, or contact{" "}
                    <span className="font-bold">
                        <a href="mailto:root@kars.bio">Kars</a>
                    </span>{" "}
                    if the issue persists.
                    {error.digest && (
                        <span className="mt-2 block text-sm text-gray-500">
                            Error ID: {error.digest}
                        </span>
                    )}
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <button
                        onClick={() => reset()}
                        className="group inline-flex items-center rounded-full bg-gradient-to-r from-[#B16CEA] to-[#FF5E69] px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#B16CEA]/25"
                    >
                        <RefreshCcw className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180" />
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="group inline-flex items-center rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
