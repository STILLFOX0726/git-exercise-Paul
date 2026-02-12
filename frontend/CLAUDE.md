# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OptiScam — an AI content detection web app built with Next.js 16 (App Router), React 19, and TypeScript. Located in the `my-newv/` subdirectory.

## Commands

All commands run from `my-newv/`:

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

## Architecture

- **Framework:** Next.js 16 App Router with React Server Components enabled, though the main page (`app/page.tsx`) is a client component (`"use client"`)
- **Styling:** Tailwind CSS v4 with OKLCH color variables, dark theme by default, glassmorphism patterns
- **UI Components:** Shadcn/ui (New York style) in `components/ui/` — uses Radix UI primitives, CVA for variants, `cn()` utility from `lib/utils.ts`
- **Path alias:** `@/*` maps to project root (e.g., `@/components/ui/button`)
- **State:** React hooks only (`useState`), no external state management
- **Forms:** React Hook Form + Zod validation (installed, not yet wired)
- **Analytics:** Vercel Analytics integrated in root layout

## Shadcn/ui Configuration

Config in `components.json`. To add new components:

```bash
npx shadcn@latest add <component-name>
```

Components go to `components/ui/`, hooks to `hooks/`, utilities to `lib/`.

## Key Patterns

- All custom CSS variables and animations are in `app/globals.css`
- Fonts: Geist Sans and Geist Mono loaded via `next/font/google` in `app/layout.tsx`
- The detection flow currently uses mock data — no API routes or backend integration yet
- Many Radix UI / Shadcn dependencies are installed but only Button, Card, and Tabs are actively used
