# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The portfolio website of **Adeela Amanat**, a textile & fashion designer based in
**Lahore, Pakistan**. Its purpose is to help her apply for **senior design roles at
Pakistani textile houses and lawn brands**.

**Live:** https://adeelaportfolio.github.io
**Repo:** `adeelaPortfolio/adeelaPortfolio.github.io` (public — Pages on a private repo
is a paid feature)

**Everything on this site must be true.** It was rebuilt from a placeholder version
that invented a London persona, a Central Saint Martins MA and a Vogue feature.
Recruiters may check. If a section has no real source material, omit the section —
do not fill it. That principle is baked into the types (see *Optional by design*).

**Hard constraint: the project must cost $0.** No paid services, no backend, no
database, no metered image optimisation.

---

## Where we left off (2026-08-09)

The site is complete and deployed. Structure, images, theme and layout are all done.

**Open items — these need Adeela, not code:**

1. **Inventive Clothing** — her own label, the most senior role on her CV, has no
   images yet. When she supplies a folder: add it to `tools/sources.mjs`, add an entry
   to `src/content/collections.ts` (group `"My Work"`), run `npm run images`. That's it.
2. **Social handles** — none exist anywhere in her material. `site.socials` is `[]` and
   the Footer/Contact blocks hide themselves when empty. Never ship a bare
   `instagram.com` link.
3. **A current headshot.** The About portrait is cropped from a framed photo inside her
   2015 thesis PDF — the only picture of her in the whole archive.
4. **Two files she may not want published**, both included because she asked for
   everything in the folder: `Bridal/Bridal 2/06.jpg` is a 336×924 sidebar strip, not
   artwork; `Prints & Cutlines/41e.jpg` and `41f.jpg` are 800×800 and visibly soft.
   Deleting the file from the folder and re-running the pipeline is the fix.

**Offered but not yet decided:** the home page still has a section headed "Collections"
with a "View all collections →" link. The hero buttons were renamed to Thesis / My Work;
Adeela was asked whether to rename these to match and hasn't answered.

---

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

---

## Architecture — content is decoupled from layout

All content lives in `src/content/` as plain typed data. Pages map over that data.

| File | Controls |
|------|----------|
| `src/content/types.ts` | The shape of every content object (read this first) |
| `src/content/site.ts` | Name, tagline, bio, statement, skills, education, awards, `cvPath` |
| `src/content/collections.ts` | The five collections — **words only**; images come from the manifest |
| `src/content/image-manifest.json` | **Generated.** Written by `npm run images`; never edit by hand |

### Optional by design

`Collection.process`, `.swatches`, `.materials` and `.credit` are **optional**, and
`src/app/work/[slug]/page.tsx` guards each section. This exists so a collection with no
development material simply has no Development section, rather than tempting anyone to
invent one. Keep it that way.

### Images — the folder is the plan

- **`tools/sources.mjs` names DIRECTORIES, not files.** Each collection lists source
  folders in Adeela's archive; `npm run images` publishes whatever is in them, in
  filename order, which is the sequence she numbered them in.
- **To add, remove or reorder images: change the folder and re-run `npm run images`.**
  No code edit. This matters — the archive is her working folder and gets reorganised
  regularly, and an earlier hand-listed manifest broke every single time it did, once
  mid-run while silently dropping an entire PDF's worth of images.
- Gallery lengths come from `image-manifest.json`, so a page can never claim more or
  fewer images than exist on disk.
- `sources.mjs` also carries `crops` — fractional boxes that remove **third-party names
  and Instagram handles** from client campaign photos, and Adeela's **old phone number
  and email** from two thesis pages. **After any archive change, run
  `npm run images:sheet` and review the sheets.** Verify crops by rendering the output
  and looking at it: a first attempt left a stray "L" from "La'Belle" visible in three.
- The raw archive lives **outside the repo** at `J:\Cursor Projects\Adeela portfolio Data`
  and is never committed. `tools/lib/assets.mjs` resolves paths tolerantly (case- and
  rename-insensitive) for the same reason.
- Output is capped at **1400 px**. Deliberate: it is the ceiling on what any visitor can
  obtain. Her print-resolution originals (up to 6300 × 14981) are never served.
- **`src/components/EditorialImage.tsx`** renders a real image when `src` is set and a
  vintage placeholder frame otherwise. **Never remove that fallback.**
- The CV at `public/cv/adeela-cv.pdf` is Adeela's own Google Doc export and is the only
  downloadable file on the site.

### Aspect ratios — nothing gets cropped

Adeela's work is a genuine mix of landscape catalogue spreads, portrait plates and
square photos. Forcing them through one box cut the sides off her artwork, and she
reported it twice. So:

- Every `ImageItem` carries its **true pixel dimensions**, written by the pipeline.
- `EditorialImage` defaults to **`fit="natural"`**: the frame takes the image's own
  aspect ratio, so `object-cover` has nothing to crop.
- `Gallery` is **CSS-column masonry**, which tiles mixed heights without the ragged
  gaps a fixed grid would leave.
- Collection covers are resized, never cropped to a box.

**Cropping must now be asked for.** Only two places do, both deliberate and commented:
the full-bleed hero banner (`fit="cover"`), and the portrait, which is a crop of a face.
Uneven gallery rows are the intended result — uniform tiles would mean cropping again.

### Routes (`src/app/`)

`/` · `/work` · `/work/[slug]` (5, SSG) · `/about` · `/awards` (awards + CV download)
· `/contact` · plus `not-found`, `sitemap.ts`, `robots.ts`, `icon.svg`.

Collections carry `group` ("Thesis" / "My Work") and optional `subgroup` ("Printed");
`/work` renders them under those headings, which is Adeela's own two-category structure.
Each group heading has an `id`, so the hero's "My Work" button can link to `/work#my-work`.

`sitemap.ts` and `robots.ts` need `export const dynamic = "force-static"` under
`output: "export"`, or the build fails.

### Key components (`src/components/`)

`Nav` (sticky; white text over the home hero — client) · `Footer` · `Hero`
· `PageHeader` · `SectionHeading` · `CollectionRow` (the numbered index row, with a
hover preview in the right margin) · `CollectionCard` (home featured) · `Gallery`
(masonry + lightbox — client) · `SwatchStrip` · `EditorialImage` · `Button`
· `Reveal` (client) · `ImageGuard` (right-click/drag deterrent — client).

### Design tokens

Colours are CSS variables (`--c-*`) in `src/app/globals.css`, consumed by
`tailwind.config.ts` as `rgb(var(--c-x) / <alpha-value>)` — the alpha placeholder is
required or every `text-ink/75` in the codebase breaks. The palette is **"Jewel
Atelier"**: oxblood ground, gold accents, chosen over two alternatives because it sits
closest to the Pakistani luxury lawn/bridal market she's applying into.

Token names keep their meaning in any theme: `ivory` is the page ground, `ink` the
primary text. **`scrim` is the exception** — always dark, for washes over photography.
Use it, not `ink`, for anything layered over an image, and plain `white` for text on top
of a scrim; `ivory` would invert with the theme.

Helpers: `.container-editorial`, `.eyebrow`, `.rule`, `.link-underline`, `.display-xl`.

---

## Gotchas that have actually bitten

- **Stop any local preview server before `npm run build`.** A `python -m http.server`
  running in `out/` makes the build fail with `EBUSY: rmdir 'out'`. This once caused a
  chained `build && commit` to skip the commit while the following `push` still ran, so
  a "successful deploy" shipped the *previous* commit. **Verify changes against the
  served HTML, not the deploy status.**
- **Chrome screenshots**: a stale `--user-data-dir` lock makes Chrome write nothing and
  report nothing. Use a fresh directory per run.
- **GitHub Pages caches**: after deploying, re-check with a cache-busting query string.
- Adeela renames folders in her archive *while work is in progress*. If the pipeline
  can't resolve a path, list the directory before assuming anything is lost.

## Conventions

- Match the editorial style: generous whitespace, uppercase letter-spaced `.eyebrow`
  kickers, hairline `.rule` dividers, serif display headings.
- Server components by default; `"use client"` only where interactivity is needed.
- Always write descriptive `alt` text.
- Do not publish Adeela's phone number or home address on a page. They appear in the
  CV, which is her choice to distribute.

## Deploy (free)

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
`SITE_URL` in `src/lib/site-url.ts` feeds metadata and the sitemap — keep it in sync
with the live URL.
