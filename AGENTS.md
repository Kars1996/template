# AGENTS.md

Before writing or editing any code in this repo, read `code-structure` skill in full. It defines file placement, TypeScript/component patterns, import order, and the comment style (ASD-STE100) used across this codebase.

## Highest-priority rules (don't default against these)

- Use the `function` keyword for components — never arrow functions. Exception: `src/components/ui/` (shadcn primitives) keep the stock `React.forwardRef` arrow-function style.
- No trailing commas, anywhere.
- Icons: `react-icons/fa` / `react-icons/si` only. Don't reach for `lucide-react`, even though it's installed.
- Server Components by default. Isolate `'use client'` to the smallest leaf component, not whole pages.
- Check `UTILS_REGISTRY.md` and existing `lib/`/`hooks/`/`db/schema/` files before adding a new helper, hook, or schema — extend what exists instead of duplicating it.
- Comments only where names can't explain the "why," written in STE (short, active-voice, plain-word sentences) — not a restatement of the code.
- No backward-compatibility layers. Remove obsolete paths instead of adding compatibility shims, fallbacks, or migrations.
- Simplest implementation that meets current requirements — no speculative abstractions, config, or indirection.

## Engineering principles

- **No backward compatibility.** Remove obsolete paths instead of adding compatibility layers, fallbacks, or migrations.
- **Simplicity first.** Choose the simplest implementation that fully meets the current requirements. Avoid speculative abstractions, configuration, and indirection.
- **Grow in layers.** Start from the smallest version that works end to end, and add each new capability on top of a product that already works. Never trade a working product for unfinished complexity.
- **Modular components.** Keep components modular and concerns clearly separated. (This generalizes the `'use client'`-isolation rule above — apply single-concern separation everywhere, not just at the client/server boundary.)
- **Prefer established libraries.** Prefer established, well-maintained libraries when they reduce overall complexity or improve reliability. Do not reimplement common functionality without a clear reason.
- **Lean on what's already there.** Check the dependencies already in the project before writing your own implementation or adding packages. Do not assume a library lacks a capability without checking its documentation and types.
- **Build for the long term.** Make architectural decisions for the long term. Do not accept a stopgap that only works for now and is meant to be replaced later.

When in doubt on anything else — file placement, import grouping, prop typing, metadata, etc. — defer to the skill, not assumptions. Ask the user for clarification if unclear on anything.