import Link from "next/link";
import { Home, Search } from "lucide-react";
import Meta from "@/lib/custom/meta";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export const metadata = Meta({
  title: "Page not found",
  description:
    "This page does not exist. Please verify the URL is correct and try again.",
});

export default function _404Page() {
  return (
    <div className="h-full min-h-screen bg-background">
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
          <h1 className="mb-1 text-xl font-semibold">404</h1>
          <p className="text-sm text-muted-foreground">Page not found</p>
        </div>

        <div className="h-4 border-b border-dashed border-border" />

        <div className="border-b border-dashed border-border px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <div className="bg-muted/50 mb-8 inline-flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-border">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>

            <h2 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Page Not Found
            </h2>

            <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </div>
          </div>
        </div>

        <div className="h-4 border-b border-dashed border-border" />

        <div className="border-b border-dashed border-border px-6 py-12 md:px-12">
          <div className="mb-6 text-center">
            <h3 className="text-sm font-medium text-muted-foreground">
              Popular Pages
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/"
              className="hover:bg-muted/50 group border border-dashed border-border p-4 transition-colors"
            >
              <div className="mb-2 text-sm font-semibold group-hover:text-primary">
                Home
              </div>
              <div className="text-xs text-muted-foreground">
                Return to homepage
              </div>
            </Link>

            <Link
              href="https://github.com/kars1996/Template"
              className="hover:bg-muted/50 group border border-dashed border-border p-4 transition-colors"
            >
              <div className="mb-2 text-sm font-semibold group-hover:text-primary">
                GitHub
              </div>
              <div className="text-xs text-muted-foreground">
                View the repository
              </div>
            </Link>

            <Link
              href="https://kars.bio"
              className="hover:bg-muted/50 group border border-dashed border-border p-4 transition-colors"
            >
              <div className="mb-2 text-sm font-semibold group-hover:text-primary">
                Portfolio
              </div>
              <div className="text-xs text-muted-foreground">
                Check out more work
              </div>
            </Link>
          </div>
        </div>
        <div className="h-8 border-t border-dashed border-border" />
      </div>
    </div>
  );
}
