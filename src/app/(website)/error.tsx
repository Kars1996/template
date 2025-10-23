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
    <div className="min-h-screen bg-background h-full">
      <div className="mx-auto max-w-4xl border-x border-dashed border-border">
        <div className="border-b border-dashed border-border px-6 py-3 md:px-12">
          <p className="text-center text-xs text-muted-foreground">
            Serving world-class design{" "}
            <Link
              href="https://resynced.design"
              target="_blank"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              @ Resynced Design
            </Link>
          </p>
        </div>

        <div className="border-b border-dashed border-border px-6 py-6 md:px-12 md:py-8">
          <div className="mb-2 text-sm text-muted-foreground">エラー</div>
          <h1 className="mb-1 text-xl font-semibold">Error</h1>
          <p className="text-sm text-muted-foreground">Something went wrong</p>
        </div>

        <div className="h-4 border-b border-dashed border-border" />

        <div className="border-b border-dashed border-border px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="bg-destructive/5 mb-8 inline-flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-destructive">
              <AlertTriangle className="h-10 w-10 text-destructive" />
            </div>

            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Something Went Wrong
            </h2>

            <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              An unexpected error occurred. Don't worry, we've logged the issue
              and will look into it.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>

        <div className="h-4 border-b border-dashed border-border" />

        <div className="border-b border-dashed border-border px-6 py-12 md:px-12">
          <div className="mx-auto max-w-2xl">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Error Details
            </h3>
            <div className="bg-muted/50 border border-dashed border-border p-4">
              <div className="font-mono mb-2 text-xs text-muted-foreground">
                Error Message
              </div>
              <div className="font-mono text-sm text-foreground">
                {error.message || "Unknown error"}
              </div>
              {error.digest && (
                <>
                  <div className="font-mono mb-2 mt-4 text-xs text-muted-foreground">
                    Error ID
                  </div>
                  <div className="font-mono text-sm text-foreground">
                    {error.digest}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="h-8 border-t border-dashed border-border" />
      </div>
    </div>
  );
}
