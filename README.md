# Adeela Amanat — Portfolio

The portfolio site of **Adeela Amanat**, textile & fashion designer, Lahore.
Eight collections spanning nine years of lawn, pret, semi-formal and bridal work,
plus her surface-print artwork and CV.

Built with Next.js 15 + Tailwind, exported as static HTML, and published free on
GitHub Pages. It costs nothing to run and has no backend.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

## Changing the content

Text, collections and artwork are data, not layout. Edit these and the pages follow:

| File | Contains |
|------|----------|
| `src/content/site.ts` | Name, tagline, bio, skills, education, awards, CV path |
| `src/content/collections.ts` | The eight collections |
| `src/content/textiles.ts` | The standalone print artworks |

To replace the CV, drop a new PDF at `public/cv/adeela-cv.pdf`.

## Changing the images

Images are generated from Adeela's raw archive, which lives **outside this repo** and is
never committed.

```bash
npm run images:sheet   # numbered contact sheets of the whole archive → tools/.out/
npm run images         # rebuild public/images/ from tools/sources.mjs
```

`tools/sources.mjs` decides which source asset becomes which published image, and records
why certain assets are deliberately left out. Edit that file, not `public/images/`.

Every output is capped at 1400 px, so the print-resolution originals are never published.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes it to
GitHub Pages. Nothing else to do.

First-time setup: create a **public** repo named `<username>.github.io`, push to it,
then set **Settings → Pages → Source** to **GitHub Actions**. Pages on private repos
requires a paid plan, which is why the repo is public.

If the site ever loads unstyled, check `public/.nojekyll` still exists — without it
GitHub Pages drops the `_next/` directory.
