# Adeela Amanat — Portfolio

The portfolio site of **Adeela Amanat**, fashion & textile designer, Lahore.
Her degree thesis and four bodies of professional work — printed textiles and
cutlines, silk scarfs, bridal, and semi-formals — plus her CV.

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
| `src/content/collections.ts` | The five collections — titles and descriptions |

To replace the CV, drop a new PDF at `public/cv/adeela-cv.pdf`.

## Changing the images

Images are generated from Adeela's raw archive, which lives **outside this repo** and is
never committed.

```bash
npm run images:sheet   # numbered contact sheets of the whole archive → tools/.out/
npm run images         # rebuild public/images/ from tools/sources.mjs
```

`tools/sources.mjs` maps each collection to **folders** in that archive. The pipeline
publishes whatever is in them, in filename order — so to add, remove or reorder images,
change the folder and re-run `npm run images`. No code edit needed.

It also carries crop boxes that remove third-party names and personal contact details
burned into some images. Run `npm run images:sheet` and review the contact sheets after
any archive change.

Every output is capped at 1400 px, so the print-resolution originals are never published.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes it to
GitHub Pages. Nothing else to do.

First-time setup: create a **public** repo named `<username>.github.io`, push to it,
then set **Settings → Pages → Source** to **GitHub Actions**. Pages on private repos
requires a paid plan, which is why the repo is public.

If the site ever loads unstyled, check `public/.nojekyll` still exists — without it
GitHub Pages drops the `_next/` directory.
