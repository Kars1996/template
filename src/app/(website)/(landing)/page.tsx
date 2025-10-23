import Link from "next/link";
import {
  ArrowRight,
  Github,
  Zap,
  Palette,
  Database,
  Shield,
  Code,
  Rocket,
  Globe,
  Sparkles,
} from "lucide-react";

/*
Copyright © 2025 Kars (github.com/kars1996)

Not to be shared, replicated or used without prior consent.
Contact Kars for any enquiries
*/

export default function IndexPage() {
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
      title: "Rate Limiting",
      description: "Built-in Redis/Memory rate limiting for API protection",
    },
  ];

  return (
    <div className="min-h-screen bg-background px-4">
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
          <div className="mb-2 text-sm text-muted-foreground">テンプレート</div>
          <h1 className="mb-1 text-xl font-semibold">NextJS Template</h1>
          <p className="text-sm text-muted-foreground">
            Production-ready quickstart
          </p>
        </div>

        <div className="h-4 border-b border-dashed border-border" />

        <div className="border-b border-dashed border-border px-6 py-16 md:px-12 md:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-muted-foreground">v5.5</span>
          </div>

          <h2 className="mb-6 text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-tight">
            Build{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Faster
            </span>
            , Ship{" "}
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              Smarter
            </span>
          </h2>

          <p className="mb-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            A production-ready NextJS template with everything you need.
            Pre-configured with the best tools and practices for modern web
            development.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="https://github.com/kars1996/Template"
              className="group inline-flex items-center rounded-full bg-gradient-to-r from-[#B16CEA] to-[#FF5E69] px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#B16CEA]/25"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="https://github.com/kars1996/Template"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border-b border-dashed border-border px-6 py-8 md:px-12 ${
                index % 2 === 0 ? "md:border-r" : ""
              }`}
            >
              <div className="bg-primary/5 mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="h-4 border-b border-dashed border-border" />

        <div className="border-b border-dashed border-border px-6 py-16 md:px-12 md:py-20">
          <div className="mb-12">
            <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Get Started in{" "}
              <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
                Seconds
              </span>
            </h2>
            <p className="text-pretty text-base text-muted-foreground">
              Choose your preferred installation method and start building
            </p>
          </div>

          <div className="mb-8 border-b border-dashed border-border pb-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-primary/5 flex h-8 w-8 items-center justify-center rounded-lg border border-border">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Quick Setup</h3>
                <p className="text-xs text-muted-foreground">
                  Recommended for fastest start
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Install CLI globally
                </div>
                <div className="bg-muted/50 font-mono border border-dashed border-border p-4 text-sm">
                  <span className="text-primary">npm</span>{" "}
                  <span className="text-muted-foreground">i</span>{" "}
                  <span>create-kapp@latest</span>{" "}
                  <span className="text-muted-foreground">-g</span>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Create your project
                </div>
                <div className="bg-muted/50 font-mono border border-dashed border-border p-4 text-sm">
                  <span className="text-accent">create-kapp</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 border-b border-dashed border-border pb-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-accent/5 flex h-8 w-8 items-center justify-center rounded-lg border border-border">
                <Github className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Manual Clone</h3>
                <p className="text-xs text-muted-foreground">
                  Clone directly from GitHub
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Clone the repository
                </div>
                <div className="bg-muted/50 font-mono border border-dashed border-border p-4 text-sm">
                  <span className="text-accent">gh repo clone</span>{" "}
                  <span>kars1996/Template</span>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-medium text-muted-foreground">
                  Install dependencies
                </div>
                <div className="bg-muted/50 font-mono border border-dashed border-border p-4 text-sm">
                  <span className="text-secondary">npm</span>{" "}
                  <span>install</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="bg-secondary/5 flex h-8 w-8 items-center justify-center rounded-lg border border-border">
                <Rocket className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Start Development</h3>
                <p className="text-xs text-muted-foreground">
                  Launch your local server
                </p>
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium text-muted-foreground">
                Run the development server
              </div>
              <div className="bg-muted/50 font-mono border border-dashed border-border p-4 text-sm">
                <span className="text-secondary">npm</span> <span>run</span>{" "}
                <span className="text-primary">dev</span>
              </div>
            </div>

            <div className="bg-primary/5 mt-6 flex items-start gap-2 rounded-lg border border-dashed border-border p-4">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Your app will be running at{" "}
                <code className="font-mono rounded bg-background px-1.5 py-0.5 text-foreground">
                  localhost:3000
                </code>
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <div className="flex items-center gap-4">
              <Link
                href="https://kars.bio"
                target="_blank"
                className="opacity-60 transition-opacity hover:opacity-100"
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

            <div className="flex items-center gap-6 text-muted-foreground">
              <Link
                href="https://github.com/kars1996/Template"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </Link>
              <Link
                href="https://kars.bio"
                className="transition-colors hover:text-foreground"
              >
                Portfolio
              </Link>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
