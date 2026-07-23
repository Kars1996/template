---
name: code-structure
description: Skill to make clean optimized next.js websites using this template.
---

# Code Structure Skill

> Next.js App Router, React, TypeScript, Tailwind CSS v4, shadcn/ui.
> Covers how code is structured and written.

---

## 1. Tech Stack & Project Setup

- **Framework:** Next.js (App Router), React, TypeScript.
- **Styling:** Tailwind CSS v4 configured via `@import 'tailwindcss'` in `globals.css` and `@tailwindcss/postcss`. No `tailwind.config.js`.
- **UI Library:** shadcn/ui components live in `src/components/ui/`. Built with `cva`, `radix-ui` primitives, and `class-variance-authority`.
- **Animation:** `motion` (`motion/react`) for UI transitions. Raw `requestAnimationFrame` + Canvas 2D allowed for ambient effects.
- Path alias: `@/*` maps to `./src/*`.

---

## 2. File & Directory Conventions

### 2.A App Router Structure

- Route groups for layout isolation: `(website)`, `(marketing)`, `(landing)`.
- API routes: `app/api/.../route.ts`.
- Page-specific components: `app/.../_components/` (underscore prefix).
- Local component files named after their purpose: `landing-hero.tsx`, `settings-client.tsx`.

### 2.B Shared Directories

```
src/
  app/
    (website)/(marketing)/(landing)/_components/ # example in fully fledged site
    api/...
  components/
    ui/          # shadcn/ui primitives (button, card, dialog, etc.)
    global/      # nav, footer, cta (shared layout components)
  lib/
    utils.ts     # cn()
    API/         # api.ts, handler.ts, middleware.ts, rate-limiter.ts, utils.ts
    auth/        # get-token.ts, auth-wrapper.tsx
    validation/  # validate.ts, schemas.ts
    custom/
      providers/ # RootProvider, Toaster, TopLoader
      meta/      # constructMetadata helper
      link/      # custom link component
    animations/  # animation partials (shimmer, progressive-blur)
  hooks/         # use-media-query.ts, use-has-primary-touch.ts
  types/         # global .d.ts declarations
  constants/     # site.ts, index.ts (app-wide constants)
```

---

## 3. Syntax & Formatting

### 3.A General Rules

- **Single quotes** for all strings and JSX attributes.
- **Semicolons** required at the end of statements.
- **2-space indentation.**
- **No trailing commas anywhere** — not in arrays, not in objects, not in function parameter lists.
- **All imports at the top of the file.** Never use mid-file `import` or `await require()` / dynamic imports inside component bodies. If dynamic import is required, do it in a dedicated helper module with a static import at the top.

### 3.B TypeScript Patterns

- Use the `function` keyword for all component definitions. Do NOT use arrow functions (`const Component = () => ...`).
  - **Exception:** `src/components/ui/` (shadcn/ui primitives). These follow the stock shadcn CLI convention of `React.forwardRef` with an arrow function body, matching upstream shadcn output. Do not rewrite generated `ui/` files to the `function` keyword — this keeps them diffable against future `shadcn add` updates.
- Prefer **named exports** over default exports.
- Destructure props directly in the function parameter list.
- Define prop types as `type Props = { ... }` or inline in the function signature.
- Use `as const` for static arrays and objects.
- Use `type` instead of `interface` for prop definitions.
- Use `React.forwardRef` for components that need ref forwarding, with `.displayName = "..."`.
- Use `React.ComponentProps<'element'>` for base HTML prop spreading.

### 3.C Component Example

```tsx
'use client';

import { Button } from '@/components/ui/button';

import { NAVBAR_LINKS } from '@/constants';

export function NavBar({ authed }: { authed: boolean }) {
  return (
    <header>
      {NAVBAR_LINKS.map((l) => (
        <a key={l.to} href={l.to}>
          {l.label}
        </a>
      ))}
    </header>
  );
}
```

---

## 4. Import Order

Group imports in this exact order, separated by blank lines:

1. **React / Next.js** (`react`, `next/*`)
2. **Third-party libraries** (`motion/react`, `@hookform/resolvers`, etc.)
3. **Internal aliases** (`@/components/ui/...`, `@/lib/utils`, `@/hooks/...`)
4. **Relative imports** (only when absolutely necessary; prefer `@/` aliases)

Example:

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { website } from '@/constants';
```

---

## 5. Component Patterns

### 5.A Server vs Client

- **Server Components by default.** Do not add `'use client'` unless the component uses state, effects, event listeners, or browser APIs.
- Isolate client logic in leaf components. Do not mark entire page files as `'use client'` if only a small section needs interactivity; extract that section into a dedicated `_components/...` file.
- `'use client'` goes on its own line at the very top of the file, before imports.

### 5.B shadcn/ui Components

- Located in `src/components/ui/`.
- Built with `cva` for variants.
- Forward refs using `React.forwardRef` with an arrow function body (stock shadcn CLI convention — see 3.B exception).
- Use `cn()` from `@/lib/utils` for all class merging.
- `asChild` prop supported via `@radix-ui/react-slot`.
- Icon sizing convention: `[&_svg]:size-4` for buttons; `[&>svg]:size-3` for badges.

### 5.C Icon Strategy

- Use `react-icons/fa` (Font Awesome) for all icons.
- Use `react-icons/si` (Simple Icons) for all brand icons (eg GitHub, Discord, Google, etc)
- Both `lucide-react` and `react-icons` are installed, but `react-icons/fa` is the standard for this project — don't mix in `lucide-react` for new icons.

### 5.D Refs & Cleanup

- Use `React.forwardRef` for reusable UI primitives.
- Always set `.displayName` on forwarded components.
- In `useEffect`, clean up listeners, observers, and `requestAnimationFrame` in the return function.
- Use `useCallback` for event handlers passed to effects or child components.

---

## 6. Hook Patterns

- Custom hooks live in `src/hooks/`.
- Named exports, `function` keyword.
- Return an object with `ref`, state booleans, and helper functions.
- Use `ResizeObserver` and `MutationObserver` for DOM measurements where needed, with proper cleanup.

---

## 7. Metadata & Utilities

### 7.A Metadata

- Use `constructMetadata` from `@/lib/custom/meta` for all page metadata.
- Default metadata uses values from `website` constants.
- Icons default to `/favicon.ico`.

### 7.B Utilities (`src/lib/utils.ts`)

- `cn(...inputs)` merges classes via `clsx` + `tailwind-merge`.

### 7.C Constants

- Store app-wide constants in `src/constants/` and group them by domain (e.g., `site.ts`, `nav.ts`, `footer.ts`).
- Re-export everything from `src/constants/index.ts` so the rest of the app imports from `@/constants` only.
- Example: header and footer nav links live in `src/constants/nav.ts` and are imported as `import { headerLinks, footerLinks } from '@/constants'`.
- Colors and brand values are defined in `src/constants/site.ts` (e.g., `website.accentColor`), however mainly use the `globals.css` for these values.

---

## 8. API & Data Patterns

### 8.A Server-Side Fetching

- Use Server Components by default. Fetch data directly in the page/layout with `async/await`.
- Session management: `@/lib/auth/get-token.ts`.
- API helpers: `src/lib/API/api.ts`, `handler.ts`, `middleware.ts`.

### 8.B API Routes

- Route handlers in `app/api/.../route.ts`.
- Use standard Next.js `Request` / `Response` objects.

---

## 9. Code Comments — ASD-STE100 Simplified Technical English

All code comments (line comments, block comments, JSDoc/TSDoc) must be written in **ASD-STE100 Simplified Technical English (STE)**. 

### 9.A When To Comment

- **Code must be self-documenting first.** Choose clear function, variable, and component names so the code explains itself. A comment is not a fix for a bad name — rename instead.
- **Add a comment only when the reader cannot get the "why" from the function and variable names alone.** If a well-named function fully explains its own purpose, do not add a comment on top of it.
- **Do not add a comment that just restates the code in words.** A comment must add information the code does not already show.
  - Incorrect: `// This hook tracks the screen width.` above `function useScreenWidth() {`  — the name already says this.
  - Correct use case: a non-obvious workaround, a browser quirk, a specific edge case, or a reason a piece of code exists in a form that looks odd or overly terse.
- **Favor comments that explain trade-offs, constraints, or edge cases over comments that narrate normal control flow.** Reserve comments for the places where being both clear and brief is genuinely hard — for example, a fix for a specific bug or a workaround for a memory leak (see 9.C).
- **When you do write a comment, keep it as short as STE allows.** STE controls *how* an unavoidable comment is worded; it does not justify adding more comments.

### 9.B Core Writing Rules

- **One instruction or one fact per sentence.** Do not join two ideas with "and", "or", "but" — split them into separate sentences instead.
- **Keep sentences short.** Target 20 words or fewer per sentence; hard cap at 25.
- **Use active voice, not passive voice.**
  - Correct: `// The hook clears the timer.`
  - Incorrect: `// The timer is cleared by the hook.`
- **Use simple verb tenses only:** simple present, simple past, simple future (`will`). Do not use continuous or perfect tenses.
  - Correct: `// This function saves the form data.`
  - Incorrect: `// This function is saving the form data.` / `// This function has saved the form data.`
- **Use approved, everyday words, and use each word for one meaning only.** Do not swap in a synonym for variety.
  - Use `start`, not `initiate` / `begin` / `commence`.
  - Use `use`, not `utilize` / `leverage`.
  - Use `show`, not `display` / `render` (unless `render` is the literal React term, in which case use it consistently and only for that meaning).
  - Use `get`, not `retrieve` / `obtain` / `fetch` (unless `fetch` refers to the literal `fetch()` API call).
- **Write instructions as direct commands.** Address the reader/maintainer directly.
  - Correct: `// Do not remove this listener. It stops memory leaks.`
  - Incorrect: `// This listener should not be removed as it could potentially cause memory leaks.`
- **Avoid vague or ambiguous words:** no `should`, `may`, `might`, `could`, `it`, `this`, or `that` without a clear, nearby noun to refer to. Repeat the noun instead of using a pronoun if there is any doubt.
- **No noun clusters (stacked nouns as modifiers).** Break long noun strings apart with prepositions.
  - Correct: `// This is the config for the rate limiter.`
  - Incorrect: `// This is the rate limiter config object setup.`
- **No idioms, humor, or metaphors.** Comments are technical instructions, not prose.
- **Spell out numbers one to nine; use numerals for 10 and above,** consistent with STE data conventions.
- **Use terminology consistently across the whole codebase.** If `debounce` is used as the term for a delay pattern in one file, use `debounce` everywhere; do not alternate with `throttle-like delay` or similar.

### 9.C Comment Types & Placement

- **Line comments (`//`)** for short, single-fact notes above the line they describe.
- **Block comments (`/* */`)** only for multi-step explanations, and even then each line must follow the one-sentence-per-line STE rule.
- **JSDoc/TSDoc (`/** */`)** for exported functions, hooks, and components. Each `@param` and `@returns` line is one short STE sentence.

### 9.D Examples

No comment needed (the name says it all):

```tsx
function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
```

Comment needed, written in STE (a real edge case, stated in one short sentence):

```tsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }
  window.addEventListener('resize', handleResize);
  // Remove this listener on unmount. This stops a memory leak.
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

Incorrect — restates the code instead of adding new information:

```tsx
// This hook is utilized to potentially track and update the current
// screen width dynamically, and it should also handle cleanup logic
// which is important for avoiding memory leaks that could occur.
function useScreenWidth() {
  // ...
}
```

### 9.E Quick Checklist for Every Comment

- [ ] The comment is necessary — the code's names alone do not explain the "why".
- [ ] The comment adds information, it does not restate the code.
- [ ] One fact or instruction per sentence.
- [ ] 25 words or fewer per sentence.
- [ ] Active voice only.
- [ ] Simple present, simple past, or `will` future only.
- [ ] Approved, plain words; same word, same meaning, every time.
- [ ] No `should`/`may`/`might`/`could`.
- [ ] No unclear `it`/`this`/`that` — repeat the noun instead.
- [ ] No stacked noun clusters.
- [ ] No idioms or humor.

---

## 10. Utility Reuse & Utility Registry

- **Before writing a new helper function, check whether one already exists.** 
- **Do not write a second version of a function that already exists.** Import and reuse the existing one instead.
- **If an existing util almost fits but not fully, extend or generalize it** (e.g. add an optional parameter) rather than duplicating it under a new name.
- **Keep a local utility registry** at `UTILS_REGISTRY.md`. Use this file to track every shared utility function, hook, and constant so it can be found before something new gets written.
  - Update this file whenever you add, move, or rename a shared utility, hook, or constant.
  - Each entry has: name, file path, one short STE sentence on what it does, and one short STE sentence on when to use it.

### 10.A Registry Format

```md
## src/lib/utils.ts

- `cn(...inputs)` — This function merges class names. Use this for all class merging in components.

## src/hooks/use-media-query.ts

- `useMediaQuery(query)` — This hook tracks a CSS media query match. Use this for responsive logic in client components.

## src/lib/validation/schemas.ts

- `loginSchema` — This is the Zod schema for the login form. Use this for login form validation.
```

- [ ] Checked `UTILS_REGISTRY.md` and the relevant `lib/`/`hooks/` folders before writing a new utility.
- [ ] Reused or extended an existing utility instead of duplicating it, where possible.
- [ ] Added a new registry entry for any new shared utility, hook, or constant.

---

## 11. Hard Rules (Pre-Flight)

- [ ] Single quotes and semicolons everywhere.
- [ ] No trailing commas anywhere.
- [ ] Use `function` keyword for components; no arrow functions — except `src/components/ui/` (shadcn primitives), which keep the stock CLI arrow-function + `forwardRef` style.
- [ ] Named exports preferred over default exports.
- [ ] Destructure props in the function signature.
- [ ] Use `type` for prop definitions; use `as const` for static data.
- [ ] `React.forwardRef` + `.displayName` for ref-forwarding components.
- [ ] Import order: React/Next -> third-party -> `@/` internal -> relative.
- [ ] Server Components by default; isolate `'use client'` to leaf files.
- [ ] Use `react-icons/fa` for all icons; don't mix in `lucide-react`.
- [ ] Use `cn()` from `@/lib/utils` for class merging.
- [ ] `useEffect` must have cleanup for listeners, observers, and `requestAnimationFrame`.
- [ ] Use `useCallback` for stable callbacks passed to effects or children.
- [ ] `constructMetadata` for page metadata.
- [ ] Constants come from `@/constants`.
- [ ] Comments are added only where the code's names can't explain the "why" (see 9.A); code is self-documenting first.
- [ ] All code comments follow ASD-STE100 Simplified Technical English (see Section 9).
- [ ] Checked for an existing utility before writing a new one, and updated `UTILS_REGISTRY.md` for any new shared utility (see Section 10).