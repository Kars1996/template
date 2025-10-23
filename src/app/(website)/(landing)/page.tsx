import Link from "next/link";
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
    <div className="min-h-screen bg-black text-white selection:bg-[#B16CEA]/20">
      <div className="mx-auto grid max-w-4xl grid-cols-[clamp(40px,10vw,80px),1fr,clamp(40px,10vw,80px)] border-x border-dashed border-white/10">
        {/* Decorative side borders with cross pattern */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(177,108,234,0.03)_0%,transparent_70%)]" />
        </div>

        {/* Hero Section */}
        <div className="relative col-start-2 border-b border-dashed border-white/10 py-12">
          <div className="absolute inset-0 h-full w-full bg-[radial-gradient(white_1px,transparent_1px)] opacity-[0.02] [background-size:16px_16px]" />

          <div className="relative flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#B16CEA]" />
              <span className="text-white/80">Production-Ready Template</span>
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Build{" "}
              <span className="bg-gradient-to-r from-[#B16CEA] via-[#FF5E69] to-[#FFA84B] bg-clip-text text-transparent">
                Faster
              </span>
              , Ship{" "}
              <span className="bg-gradient-to-r from-[#FFA84B] via-[#FF5E69] to-[#B16CEA] bg-clip-text text-transparent">
                Smarter
              </span>
              <span className="align-super text-xs pl-1">v5.5</span>
            </h2>

            <p className="max-w-2xl text-base leading-relaxed text-white/70">
              A production-ready NextJS template with everything you need to
              build modern web applications. Pre-configured with the best tools
              and practices for professional development.
            </p>

            <div className="mt-2 flex items-center gap-3">
              <Link
                href="https://github.com/kars1996/Template"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#B16CEA] to-[#FF5E69] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#B16CEA]/25"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="https://github.com/kars1996/Template"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                View Source
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="relative col-start-2 border-b border-dashed border-white/10 py-12">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-xs font-medium tracking-wider text-white/50">
              FEATURES
            </span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="grid gap-px bg-white/[0.02] sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-black p-6 transition-all duration-300 hover:bg-white/[0.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B16CEA]/5 via-transparent to-[#FFA84B]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#B16CEA]/20 to-[#FFA84B]/20 shadow-sm shadow-[#B16CEA]/10 transition-all duration-300 group-hover:scale-110">
                      <feature.icon className="h-5 w-5 text-[#B16CEA]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-white/60">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative col-start-2 border-b border-dashed border-white/10 py-12">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <span className="text-xs font-medium tracking-wider text-white/50">
              GET STARTED
            </span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          <div className="mb-8 text-sm leading-relaxed text-white/70">
            <p>
              Choose your preferred method to start building. Both approaches
              will get you up and running in seconds.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#B16CEA]/10 via-transparent to-[#FF5E69]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#B16CEA] to-[#FF5E69] shadow-lg shadow-[#B16CEA]/20">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Quick Setup</h3>
                    <p className="text-xs text-white/50">Using CLI tool</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="mb-2 text-xs text-white/50">
                      1. Install globally
                    </div>
                    <div className="font-mono rounded-lg border border-white/10 bg-black/60 p-3 text-xs">
                      <span className="text-[#B16CEA]">npm</span>{" "}
                      <span className="text-white/90">
                        i create-kapp@latest -g
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-xs text-white/50">
                      2. Create project
                    </div>
                    <div className="font-mono rounded-lg border border-white/10 bg-black/60 p-3 text-xs">
                      <span className="text-[#FF5E69]">create-kapp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/[0.04]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E69]/10 via-transparent to-[#FFA84B]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#FF5E69] to-[#FFA84B] shadow-lg shadow-[#FF5E69]/20">
                    <Github className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">Manual Clone</h3>
                    <p className="text-xs text-white/50">From GitHub</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="mb-2 text-xs text-white/50">
                      1. Clone repository
                    </div>
                    <div className="font-mono rounded-lg border border-white/10 bg-black/60 p-3 text-xs">
                      <span className="text-[#FF5E69]">gh repo clone</span>{" "}
                      <span className="text-white/90">kars1996/Template</span>
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-xs text-white/50">
                      2. Install deps
                    </div>
                    <div className="font-mono rounded-lg border border-white/10 bg-black/60 p-3 text-xs">
                      <span className="text-[#FFA84B]">npm</span>{" "}
                      <span className="text-white/90">install</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-[#B16CEA]" />
            <span>
              Then run{" "}
              <code className="font-mono rounded bg-white/10 px-2 py-0.5 text-[#FFA84B]">
                npm run dev
              </code>{" "}
              to start developing
            </span>
          </div>
        </div>

        <div className="relative col-start-2 border-b border-dashed border-white/10 py-12">
          <div className="flex flex-col gap-5 text-sm leading-relaxed text-white/70">
            <p>
              Questions or want to collaborate?{" "}
              <a
                href="mailto:hello@kars.bio"
                className="font-medium text-white underline decoration-[#B16CEA] decoration-1 underline-offset-2 transition-colors hover:text-[#B16CEA]"
              >
                hello@kars.bio
              </a>
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-xs text-white/40">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
              <Sparkles className="h-3 w-3" />
              <span>Open Source & Free Forever</span>
            </div>
          </div>
        </div>

        <div className="relative col-start-2 flex items-center justify-between py-8 text-xs text-white/40">
          <span className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-[#B16CEA]" />
            {new Date().getFullYear()}{" "}
            <span className="hidden md:inline">Kars</span>
          </span>

          <span className="flex items-center gap-4">
            <a
              href="mailto:hello@kars.bio"
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
            <a
              href="https://github.com/kars1996/Template"
              className="transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://kars.bio"
              className="transition-colors hover:text-white"
            >
              Portfolio
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
