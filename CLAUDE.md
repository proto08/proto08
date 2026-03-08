# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev        # Start dev server with Turbopack
bun build      # Production build
bun lint       # ESLint via Next.js
```

No test suite is configured.

## Architecture

Personal bio/portfolio site built with Next.js (App Router), React 19, Tailwind CSS v4, and shadcn/ui.

**Key structure:**

- `app/` — Next.js App Router pages and root layout. Layout wraps all pages with `Header`, `Footer`, `ThemeProvider`, and Vercel Analytics.
- `components/app/` — App-specific components (`header.tsx`, `footer.tsx`). Header exports `scrollToSection` utility used by page components.
- `components/ui/` — shadcn/ui components (shadcn style: `new-york`, icon library: `lucide`). Add new components via `bunx shadcn@latest add <component>`.
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge).
- `entities/` — Domain entity types/enums (e.g., `BooleanEnum` for URL query params).
- `services/` — Custom React hooks for data/URL state (e.g., `useArticlesSearchQuery`).

**Styling:** Tailwind v4 with CSS variables defined in `app/globals.css`. Theme tokens use `oklch` color space. Dark mode is class-based via `next-themes`.

**Path alias:** `@/` maps to the project root.

## Code Style

Prettier is configured (enforced via CI on push):

- No semicolons, single quotes, 2-space indent, trailing commas (ES5)

Components that use browser APIs or hooks must have `'use client'` at the top.
