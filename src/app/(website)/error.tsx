"use client";
import Link from "next/link";
import { Home, RefreshCcw, AlertTriangle } from "lucide-react";

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
    <div className="bg-background h-full min-h-screen">
      <div className="border-border mx-auto max-w-4xl border-x border-dashed">
        <div className="border-border border-b border-dashed px-6 py-3 md:px-12">
          <p className="text-muted-foreground text-center text-xs">
            Serving world-class design{" "}
            <Link
              href="https://resynced.design"
              target="_blank"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              @ Resynced Design
            </Link>
          </p>
        </div>

        <div className="border-border border-b border-dashed px-6 py-6 md:px-12 md:py-8">
          <div className="text-muted-foreground mb-2 text-sm">エラー</div>
          <h1 className="mb-1 text-xl font-semibold">Error</h1>
          <p className="text-muted-foreground text-sm">Something went wrong</p>
        </div>

        <div className="border-border h-4 border-b border-dashed" />

        <div className="border-border border-b border-dashed px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="bg-destructive/5 border-destructive mb-8 inline-flex h-20 w-20 items-center justify-center rounded-lg border border-dashed">
              <AlertTriangle className="text-destructive h-10 w-10" />
            </div>

            <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Something Went Wrong
            </h2>

            <p className="text-muted-foreground mb-8 text-base leading-relaxed text-pretty md:text-lg">
              An unexpected error occurred. Don't worry, we've logged the issue
              and will look into it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={reset}
                className="text-primary-foreground inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#B16CEA] to-[#FF5E69] px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </button>

              <Link
                href="/"
                className="border-border hover:bg-muted inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>

        <div className="border-border h-4 border-b border-dashed" />

        <div className="border-border border-b border-dashed px-6 py-12 md:px-12">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-muted-foreground mb-4 text-sm font-medium">
              Error Details
            </h3>
            <div className="bg-muted/50 border-border border border-dashed p-4">
              <div className="text-muted-foreground mb-2 font-mono text-xs">
                Error Message
              </div>
              <div className="text-foreground font-mono text-sm">
                {error.message || "Unknown error"}
              </div>
              {error.digest && (
                <>
                  <div className="text-muted-foreground mt-4 mb-2 font-mono text-xs">
                    Error ID
                  </div>
                  <div className="text-foreground font-mono text-sm">
                    {error.digest}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="border-border h-8 border-t border-dashed" />
      </div>
    </div>
  );
}
