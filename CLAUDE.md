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
- Fonts: **Cinzel** (display) + **EB Garamond** (body), self-hosted via `next/font`
- **Static export** (`output: "export"`) → `out/`, published on GitHub Pages.
  Do not introduce server-only features (DB, auth, API routes, ISR, middleware,
  `next/image` optimisation) — the export will fail or the site will break.

## Commands

```bash
npm run dev           # localhost:3000, hot reload
npm run build         # static export → out/  (must pass before work is done)
npm run lint          # ESLint
npm run images        # regenerate public/images + image-manifest.json
npm run images:sheet  # contact sheets of the raw archive, for the safety review
```

`npm run build` is exactly what GitHub Actions runs, so a green build means it deploys.

## Architecture — content is decoupled from layout

All content lives in `src/content/` as plain typed data. Pages map over that data.

| File | Controls |
|------|----------|
| `src/content/types.ts` | The shape of every content object (read this first) |
| `src/content/site.ts` | Name, tagline, bio, statement, skills, education, awards, `cvPath` |
| `src/content/collections.ts` | The five collections — **words only**, images come from the manifest |
| `src/content/image-manifest.json` | **Generated.** Written by `npm run images`; never edit by hand |

### Optional by design

`Collection.process`, `.swatches`, `.materials` and `.credit` are **optional**, and
`src/app/work/[slug]/page.tsx` guards each section. This exists so a collection
with no development material simply has no Development section, rather than tempting
anyone to invent one. Keep it that way.

`Collection.ratio` sets the gallery aspect ratio (`"4 / 3"` for the landscape thesis and
print spreads, `"3 / 4"` for the portrait bridal work). Getting it wrong crops badly.

### Images — the folder is the plan

- **`tools/sources.mjs` names DIRECTORIES, not files.** Each collection lists source
  folders in Adeela's archive; `npm run images` publishes whatever is in them, in
  filename order, which is the sequence she numbered them in.
- **To add, remove or reorder images: change the folder and re-run `npm run images`.**
  No code edit. This matters — the archive is her working folder and gets reorganised
  regularly, and the previous hand-listed manifest broke every time it did.
- Gallery lengths come from the generated `image-manifest.json`, so a page can never
  claim more or fewer images than exist on disk.
- `sources.mjs` also carries `crops` — fractional crop boxes that remove third-party
  names and handles from client campaign photos, and Adeela's old phone number and
  email from two thesis pages. **Re-check these with `node tools/contact-sheet.mjs`
  whenever the archive changes**, and verify by looking at the rendered output.
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

`/` · `/work` · `/work/[slug]` (5, SSG) · `/about` · `/awards` (awards + CV download)
· `/contact` · plus `not-found`, `sitemap.ts`, `robots.ts`, `icon.svg`.

Collections carry `group` ("Thesis" / "My Work") and optional `subgroup` ("Printed"),
and `/work` renders them under those headings — Adeela's own two-category structure. `sitemap.ts` and `robots.ts` need
`export const dynamic = "force-static"` under `output: "export"`.

### Key components (`src/components/`)

`Nav` (sticky; uses ivory text over the home hero — client) · `Footer` · `Hero`
· `PageHeader` · `SectionHeading` · `CollectionCard` · `Gallery` (grid crops uniformly,
lightbox fits the whole plate — client) · `SwatchStrip`
· `EditorialImage` · `Button` · `Reveal` (client) · `ImageGuard` (right-click/drag
deterrent — client) · `CollectionRow` (the numbered index row).

### Design tokens

Colours are CSS variables (`--c-*`) defined in `src/app/globals.css` and consumed by
`tailwind.config.ts` as `rgb(var(--c-x) / <alpha-value>)` — the alpha placeholder is
required or every `text-ink/75` in the codebase breaks. The palette is "Jewel Atelier":
oxblood ground, gold accents.

Token names keep their meaning in any theme: `ivory` is the page ground, `ink` the
primary text. **`scrim` is the exception** — it is always dark, for washes over
photography. Use it, not `ink`, for anything layered over an image, and use plain
`white` for text on top of a scrim; `ivory` would invert with the theme.

Helpers in `globals.css`: `.container-editorial`, `.eyebrow`, `.rule`,
`.link-underline`, `.display-xl`. Reuse these rather than hardcoding values.

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
