# CLAUDE.md

Project memory for `reymartlouie.vercel.app` — read at the start of every session in this repo.

## What this project is

Rey Martlouie's personal portfolio site. Next.js 14 (App Router) + React 18 + TypeScript + Tailwind, deployed on Vercel, data layer on Supabase.

## Commands

```
npm run dev      # local dev server
npm run build    # production build
npm run start    # run production build
npm run lint     # eslint (next lint)
```

There is no test suite configured — verify UI changes by running `npm run dev` and checking the page in a browser, and run `npm run build` before considering a change done (it catches type errors `dev` won't).

## Structure

```
src/
  app/            — Next.js App Router pages, layout, opengraph-image
  components/
    sections/     — page sections (Works, Achievements, Signature, ...)
    ui/           — chrome + modals (StatusBar, per-project modals)
    cards/        — bento card components (HeroIntroCard, PhotoCard, ...)
    bento/        — bento grid primitives
  lib/            — Supabase client, shared utilities
public/           — static assets (icons, preview images)
```

## Design system

**`DESIGN.md`** at repo root is the source of truth for visual language: frosted-glass tokens, color/shadow system, per-project card identity, animation tokens, and the `Work` data shape. Read it before touching any styling, and treat style decisions in code as subordinate to it — if code and `DESIGN.md` disagree, that's a bug in one of them, not a judgment call to make silently.

## Keeping this memory current

This file (and `DESIGN.md`) are living documents, not one-time writeups. Update them in the same session as the change that makes them stale — don't defer it:

- **New feature / section / page shipped** → update the `Structure` map here if it adds a new top-level area; add it to `DESIGN.md`'s File Map if it's part of the visual system.
- **Visual/style pattern changed** (new color token, new card treatment, animation tweak, layout rule) → update `DESIGN.md` directly, in the relevant section, not just in a commit message.
- **New project added to the portfolio** (Works/Achievements entry) → update `DESIGN.md`'s Project Timelines table and File Map.
- **A plan is made for multi-step work** (via plan mode or otherwise) → once it's agreed, note the resulting direction in the relevant `DESIGN.md` section or here if it changes conventions; don't let one-off plans live only in chat history.
- **Commands, structure, or dependencies change** (new script, new top-level directory, framework upgrade) → update the relevant section of this file.

When updating, edit in place — don't append a changelog. These files describe current state, not history (git log is the history). `DESIGN.md` already ends with a "Last updated" line; keep that current when you touch it.
