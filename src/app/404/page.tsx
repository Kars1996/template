import Link from "next/link";
import Head from "next/head";
import { constructMetadata } from "@/modules/Meta";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export const metadata = constructMetadata({
    title: "Page not found",
    description:
        "This page does not exist. Please verify the URL is correct and try again.",
});

export default function _404Page() {
    return (
        <div className="font-walsheim flex min-h-screen w-full items-center justify-center bg-[#1b1b1b] text-white">
            <main className="flex flex-col items-center px-4 text-center selection:bg-[#0099ff3d]">
                <div className="logo mb-4">
                    <img
                        src="favicon.ico"
                        alt="Logo"
                        className="pointer-events-none h-10 w-10 select-none"
                        draggable={false}
                    />
                </div>
                <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
                <p className="mb-6 text-gray-400">
                    The page you are looking for does not exist.
                    <br />
                    Check out my developer portfolio in the mean time!
                </p>
                <Link
                    href="https://kars.bio"
                    passHref
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-[#0099ff] px-6 py-3 font-semibold text-white transition duration-200 hover:opacity-85"
                >
                    My Portfolio
                </Link>
            </main>
        </div>
    );
}
