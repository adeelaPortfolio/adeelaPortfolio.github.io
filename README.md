# Adeela — Textile & Fashion Designer Portfolio

A fast, image-first portfolio built to help a textile & fashion designer apply to
fashion houses. Textiles and garments are presented as co-equal pillars, in a
classy, vintage editorial style.

- **Stack:** Next.js (App Router) · TypeScript · Tailwind CSS
- **Fonts:** Playfair Display + EB Garamond (self-hosted, free)
- **Hosting:** free forever on Vercel
- **Cost:** £0 (a custom domain is optional, ~£10/yr)

---

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Edit files under `src/` and the page reloads.

```bash
npm run build   # production build (also proves the static export Vercel uses)
npm start       # serve the production build locally
```

---

## Editing content (no coding required for the common cases)

Everything the designer changes lives in **`src/content/`**:

| File             | What it controls                                            |
|------------------|------------------------------------------------------------|
| `site.ts`        | Name, tagline, bio, statement, skills, education, socials, email, press, CV path |
| `collections.ts` | The garment collections / lookbooks                        |
| `textiles.ts`    | The standalone textile / surface-design pieces             |

Placeholder text is marked with `// TODO`. See `src/content/types.ts` for the
shape of every field.

### Adding real images

Images live in **`public/images/`** — see `public/images/README.md` for the
folder layout and recommended sizes. Until an image exists, a vintage placeholder
renders in its place, so the site always looks complete.

To swap one in: drop the file in the right folder, then set its `src` in the
matching content file, e.g.

```ts
cover: { src: "/images/collections/sericulture/cover.jpg", alt: "…" }
```

### The CV

Replace `public/cv/adeela-cv.pdf` with the real CV (same filename), or change
`site.cvPath` in `src/content/site.ts`.

---

## Publish for free on Vercel

1. Create a free account at https://vercel.com (sign in with GitHub).
2. Push this project to a GitHub repository.
3. In Vercel: **Add New → Project → Import** your repo → **Deploy**.
   Vercel auto-detects Next.js; no configuration needed.
4. You get a live URL like `adeela-portfolio.vercel.app`. Every `git push`
   redeploys automatically.

**Optional custom domain** (~£10/yr): buy a domain, then in Vercel go to
Project → Settings → Domains and add it. Then update `SITE_URL` in
`src/lib/site-url.ts` (Vercel also sets this automatically in production).

### Alternative free hosts

The site is a standard Next.js app and also deploys free on **Netlify** or
**Cloudflare Pages** using their Next.js presets.

---

## Project structure

```
src/
  app/            # routes: /, /collections, /collections/[slug], /textiles,
                  #         /about, /press, /contact  + sitemap, robots, 404
  components/     # Nav, Footer, Hero, Gallery, TextileGrid, EditorialImage, …
  content/        # ← edit these: site.ts, collections.ts, textiles.ts, types.ts
  lib/            # tones + site URL helpers
public/
  images/         # real photography goes here (placeholders until then)
  cv/             # downloadable CV
```
