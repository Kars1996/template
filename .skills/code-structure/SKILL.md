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

function NavBar({ authed }: { authed: boolean }) {
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

export { NavBar };
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

## 9. Hard Rules (Pre-Flight)

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