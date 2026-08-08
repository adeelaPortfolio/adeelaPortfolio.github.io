# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A portfolio website for a **textile & fashion designer** ("Adeela" — name assumed
from the folder, **not yet confirmed by the user**). Its purpose is to help her
**apply to fashion houses**, presenting **textiles and garments as co-equal pillars**
in a **classy, vintage editorial** style.

**Hard constraint: the project must cost $0.** Deployed free on Vercel. No paid
services, no backend, no database. Keep it fully static. A custom domain was
declined for now.

## Stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS 3**
- Fonts: **Playfair Display** (display) + **EB Garamond** (body), self-hosted via `next/font`
- Fully static — every route prerenders (`next build` → 15 static routes). Do not
  introduce server-only features (DB, auth, API routes needing a runtime, ISR) —
  they break the free static-hosting model.

## Commands

```bash
npm run dev     # localhost:3000, hot reload
npm run build   # production build — must pass before considering work done
npm start       # serve the production build
npm run lint    # ESLint (next lint)
```

Always run `npm run build` after non-trivial changes; it's the same static export
Vercel uses, so a green build means it will deploy.

## Architecture — content is decoupled from layout

**This is the most important thing to understand.** All content the designer edits
lives in `src/content/` as plain typed data. Pages/components map over that data.
You rarely touch layout to change content.

| File | Controls |
|------|----------|
| `src/content/types.ts` | The shape of every content object (read this first) |
| `src/content/site.ts` | Name, tagline, bio, statement, skills, education, socials, email, press, `cvPath` |
| `src/content/collections.ts` | Garment collections / lookbooks (has `getCollection(slug)`) |
| `src/content/textiles.ts` | Standalone textile / surface-design pieces |

Placeholder values are marked `// TODO`. See memory (`content-open-items`) for the
running list of what still needs real values.

### Images & the placeholder system

- Real images live in `public/images/` (see `public/images/README.md` for layout & sizes).
- **`src/components/EditorialImage.tsx`** renders a real optimized `next/image` when
  an `ImageItem.src` is set, otherwise a tasteful vintage placeholder frame. This is
  why the site looks finished with no photography. **Never remove this fallback** —
  swapping in a real image = just set the `src` string in a content file.
- The CV at `public/cv/adeela-cv.pdf` is a generated placeholder; replace with the real PDF.

### Routes (`src/app/`)

`/` (home) · `/collections` · `/collections/[slug]` (SSG via `generateStaticParams`)
· `/textiles` · `/about` · `/press` · `/contact` · plus `not-found.tsx`, `sitemap.ts`,
`robots.ts`, `icon.svg`.

### Key components (`src/components/`)

`Nav` (sticky, mobile drawer — client) · `Footer` · `Hero` · `PageHeader`
· `SectionHeading` · `CollectionCard` · `Gallery` (grid + lightbox — client)
· `TextileGrid` (cards + lightbox — client) · `SwatchStrip` · `EditorialImage`
· `Button` · `Reveal` (scroll fade-in — client, respects reduced-motion).

### Design tokens

Defined in `tailwind.config.ts` (colors: `ivory`, `cream`, `ink`, `sepia`, `gilt`,
`muted`; fonts: `font-display`, `font-body`) and `src/app/globals.css` (helper
classes: `.container-editorial`, `.eyebrow`, `.rule`, `.link-underline`; paper-grain
body background). Reuse these tokens/classes rather than hardcoding values.

## Conventions

- Match the existing editorial style: generous whitespace, uppercase letter-spaced
  `.eyebrow` kickers, hairline `.rule` dividers, serif display headings.
- Keep components server components unless they need interactivity/hooks; mark client
  ones with `"use client"` (Nav, Gallery, TextileGrid, Reveal).
- Always provide descriptive `alt` text on images (accessibility + SEO).
- `SITE_URL` (`src/lib/site-url.ts`) feeds metadata/sitemap; Vercel sets it in prod.

## Deploy (free)

Push to GitHub → import into Vercel → Deploy (auto-detects Next.js). See `README.md`
for the full walkthrough and the optional custom-domain step.
