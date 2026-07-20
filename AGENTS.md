# AGENTS.md

Before writing or editing any code in this repo, read `code-structure` skill in full. It defines file placement, TypeScript/component patterns, import order, and the comment style (ASD-STE100) used across this codebase.

## Highest-priority rules (don't default against these)

- Use the `function` keyword for components — never arrow functions. Exception: `src/components/ui/` (shadcn primitives) keep the stock `React.forwardRef` arrow-function style.
- No trailing commas, anywhere.
- Icons: `react-icons/fa` / `react-icons/si` only. Don't reach for `lucide-react`, even though it's installed.
- Server Components by default. Isolate `'use client'` to the smallest leaf component, not whole pages.
- Check `UTILS_REGISTRY.md` and existing `lib/`/`hooks/`/`db/schema/` files before adding a new helper, hook, or schema — extend what exists instead of duplicating it.
- Comments only where names can't explain the "why," written in STE (short, active-voice, plain-word sentences) — not a restatement of the code.

When in doubt on anything else — file placement, import grouping, prop typing, metadata, etc. — defer to the skill, not assumptions. Ask the user for clarification if unclear on anything.