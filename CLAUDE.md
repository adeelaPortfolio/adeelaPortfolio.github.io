# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The portfolio website of **Adeela Amanat**, a textile & fashion designer based in
**Lahore, Pakistan**. Its purpose is to help her apply for **senior design roles at
Pakistani textile houses and lawn brands**, presenting textiles and garments as
co-equal pillars in a classy, vintage editorial style.

**Everything on this site must be true.** It was rebuilt from a placeholder version
that invented a London-based persona, a Central Saint Martins MA and a Vogue feature.
Recruiters may check. If a section has no real source material, omit the section —
do not fill it. That principle is baked into the types (see *Optional by design*).

**Hard constraint: the project must cost $0.** No paid services, no backend, no
database, no metered image optimisation.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS 3**
- Fonts: **Playfair Display** (display) + **EB Garamond** (body), self-hosted via `next/font`
- **Static export** (`output: "export"`) → `out/`, published on GitHub Pages.
  Do not introduce server-only features (DB, auth, API routes, ISR, middleware,
  `next/image` optimisation) — the export will fail or the site will break.

## Commands

```bash
npm run dev     # localhost:3000, hot reload
npm run build   # static export → out/  (must pass before considering work done)
npm run lint    # ESLint
node tools/build-images.mjs     # regenerate public/images from the raw archive
node tools/contact-sheet.mjs    # review the raw archive as numbered contact sheets
```

`npm run build` is exactly what GitHub Actions runs, so a green build means it deploys.

## Architecture — content is decoupled from layout

All content lives in `src/content/` as plain typed data. Pages map over that data.

| File | Controls |
|------|----------|
| `src/content/types.ts` | The shape of every content object (read this first) |
| `src/content/site.ts` | Name, tagline, bio, statement, skills, education, awards, `cvPath` |
| `src/content/collections.ts` | The 8 collections (has `getCollection(slug)`) |
| `src/content/textiles.ts` | 12 standalone print artworks |

### Optional by design

`Collection.process`, `.swatches`, `.materials` and `.credit` are **optional**, and
`src/app/collections/[slug]/page.tsx` guards each section. This exists so a collection
with no development material simply has no Development section, rather than tempting
anyone to invent one. Keep it that way.

`Collection.ratio` sets the gallery aspect ratio (`"4 / 3"` for the landscape Coronation
and thesis spreads, default `"3 / 4"`). Getting it wrong crops the artwork badly.

### Images

- **Source of truth is `tools/sources.mjs`**, not `public/images/`. It maps each raw
  archive asset to its published path and records *why* specific assets are excluded
  (third-party campaign branding, personal contact details printed into artwork,
  corrupt files). To change which images appear, edit that file and re-run the pipeline.
- The raw archive lives **outside the repo** at `J:\Cursor Projects\Adeela portfolio Data`
  and is never committed. `tools/lib/assets.mjs` resolves paths tolerantly (case- and
  rename-insensitive) because that folder is Adeela's working directory and gets
  reorganised.
- Output is capped at **1400 px**. This is deliberate: it is the ceiling on what any
  visitor can obtain. Her print-resolution originals (up to 6300 × 14981) are never served.
- **`src/components/EditorialImage.tsx`** renders a real image when `src` is set and a
  vintage placeholder frame otherwise. **Never remove that fallback.**
- The CV at `public/cv/adeela-cv.pdf` is Adeela's own Google Doc export and is the only
  downloadable file on the site.

### Routes (`src/app/`)

`/` · `/collections` · `/collections/[slug]` (8, SSG) · `/textiles` · `/about`
· `/awards` (awards + CV download) · `/contact` · plus `not-found`, `sitemap.ts`,
`robots.ts`, `icon.svg`. `sitemap.ts` and `robots.ts` need
`export const dynamic = "force-static"` under `output: "export"`.

### Key components (`src/components/`)

`Nav` (sticky; uses ivory text over the home hero — client) · `Footer` · `Hero`
· `PageHeader` · `SectionHeading` · `CollectionCard` · `Gallery` (grid crops uniformly,
lightbox fits the whole plate — client) · `TextileGrid` (client) · `SwatchStrip`
· `EditorialImage` · `Button` · `Reveal` (client) · `ImageGuard` (right-click/drag
deterrent — client).

### Design tokens

`tailwind.config.ts` (colors `ivory`, `cream`, `ink`, `sepia`, `gilt`, `muted`; fonts
`font-display`, `font-body`) and `src/app/globals.css` (`.container-editorial`,
`.eyebrow`, `.rule`, `.link-underline`). Reuse these rather than hardcoding values.

## Conventions

- Match the editorial style: generous whitespace, uppercase letter-spaced `.eyebrow`
  kickers, hairline `.rule` dividers, serif display headings.
- Server components by default; `"use client"` only where interactivity is needed.
- Always write descriptive `alt` text.
- Do not publish Adeela's phone number or home address on a page. They appear in the
  CV, which is her choice to distribute.

## Deploy (free)

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
The repo must be **public** (Pages on private repos requires a paid plan).
`SITE_URL` in `src/lib/site-url.ts` feeds metadata and the sitemap — keep it in sync
with the live URL.
