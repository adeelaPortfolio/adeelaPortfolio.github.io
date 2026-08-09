# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The portfolio website of **Adeela Amanat**, a fashion & textile designer based in
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

**Recent changes, all live:**

- Home trimmed to **hero → Collections → About → Contact**. The "Textiles & Fashion"
  split and the "Surface Work" strip were removed at Adeela's request — both drew from
  the same collection cover, so one photograph appeared three times on one page.
- Hero buttons are **Thesis** and **My Work** (both solid), linking to `/work/thesis`
  and `/work#my-work`.
- Role reads **"Fashion & Textile Designer"** everywhere. It comes from one value,
  `site.role` — change it there, never in components.
- A responsive pass covered every page at 360–1440px (see *Responsive*). It fixed two
  real bugs, both now committed: the lightbox had **no backdrop at all**, and its arrows
  collapsed into the top corners on tablets.

- **The hero banner is one print panel, turned on its side.** `Prints & Cutlines/03.jpg`
  is a catalogue page of five panels on white; used whole it put white margin and two
  half-panels into the banner. `sources.mjs` now crops it to the left panel and rotates
  it **270°**. Anticlockwise is the load-bearing part: it puts the empty damask arch on
  the left under the wordmark and the flowers and fruit on the right where nothing
  covers them. 90° mirrors that and buries the artwork under the text.
- **The hero scrim was re-tuned with it.** It had been weighted for a pale sheet; over a
  dark panel that reading came out muddy and grey. The weight now sits in the
  left-to-right gradient, which only covers the text column, so the print stays
  saturated on the right.

  Both were verified at 390–2560px and are now committed and deployed.

**Check `git status` before assuming what's live.** The hero panel sat finished but
uncommitted in the tree for a session, so `npm run dev` showed the new banner while
adeelaportfolio.github.io still served the old whole-sheet one. A screenshot of the
live site is evidence about the last *push*, not about the working tree — compare
`out/images/hero.webp` against the deployed file before re-doing work that already exists.

- **The portrait is now Adeela's own picture**, supplied by her and living in the archive
  at `Portrait/adeela.jpg`. It replaces the 512px crop lifted out of a 2015 thesis page,
  which had been the only image of her anywhere in the archive. It is an **illustrated
  treatment of a photograph, not a photograph** — her choice, made knowingly; the alt
  text says "Illustrated portrait" so the page doesn't imply otherwise. The crop in
  `sources.mjs` exists only to cut a generator's sparkle watermark off the bottom edge.
  She may still want a real headshot; if she sends one, drop it in that folder, adjust
  the crop and re-run `npm run images`.

- **Inventive Clothing shipped on 2026-08-09** — 63 images, her own label, the sixth
  collection. Two things about it are load-bearing:
  - **The folder is numbered `1..64` unpadded**, unlike the rest of the archive. Plain
    `.sort()` put 10 before 2 and scattered the set, so `lib/assets.mjs` now sorts
    **naturally** (`Intl.Collator {numeric:true}`). Every existing collection was
    checked file-by-file against the old order: all six unchanged.
  - **Adeela blurred the clients' faces in the archive originals herself.** The
    pipeline does no blurring — that was tried and reverted in `f416e0a`. Two frames
    (`54.png`, `55.png`) show an unblurred professional model; those are campaign
    shots, in the same category as the Enchantress and Jahanara images already on the
    site. If new files arrive, **check faces on the contact sheet before publishing**.
- **`site.socials` is no longer empty.** It carries one real link, the label's
  Instagram, `instagram.com/inventiveclothing_`. Labelled "Instagram — Inventive
  Clothing" rather than plain "Instagram" because it is the brand's account, not a
  personal design one. The `?igsh=` share token was stripped.

**Open items — these need Adeela, not code:**

1. **Two files she may not want published**, both included because she asked for
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
| `src/content/collections.ts` | **Assembled, not written.** Builds the list from the manifest + copy |
| `src/content/collection-copy.ts` | The words for a collection. All optional; absent is fine |
| `src/content/image-manifest.json` | **Generated.** Written by `npm run images`; never edit by hand |

### Optional by design

`Collection.concept`, `.process`, `.swatches`, `.materials` and `.credit` are all
**optional**, and `src/app/work/[slug]/page.tsx` guards each section. This exists so a
collection with no development material simply has no Development section, rather than
tempting anyone to invent one. Keep it that way.

`concept` joined that list on 2026-08-09, when Adeela asked for the Concept/Materials
block off Prints & Cutlines, Silk Scarfs, Bridal and Semi-Formals. **Only the thesis
carries one now.** The guard covers the pair: the block renders only if `concept` or
`materials` has content, and each column is guarded separately, so one without the
other can never print a lone heading over empty space. The Lookbook's top padding
keys off the same condition — `pt-24` under the block, `pt-16` when it is the first
section under the header.

### The archive is the site

**Nothing has to be edited to publish a collection.** `npm run images` walks the
archive; every folder that directly contains images becomes a collection, with its
files as its gallery in the folder's own order, its own `/work/<slug>` route and a
sitemap entry. Drop a folder in, run it, and it is on the site. Delete the folder and
it is gone. This was verified end-to-end by adding a junk folder, building, seeing
`/work/kids-wear` appear as row 07, then deleting it and watching the site revert.

Three files shape that result. All three are **optional corrections**, not registries:

| File | Decides |
|------|---------|
| `tools/lib/discover.mjs` | the rule itself — folder → collection, group, slug, title |
| `tools/sources.mjs` | pixels: merges, covers, crops, ratio, display order |
| `src/content/collection-copy.ts` | words: title, season, year, summary, concept |

**Omitting a folder does not hide it.** A folder nobody mentions is published with
defaults. To take something off the site, take it out of the archive — or, if it
holds images that are not a collection at all (the portrait), name it in
`notCollections` in `sources.mjs`.

**A collection with no copy has no season, no year and no summary, and the layout
omits all three.** `CollectionRow`, `CollectionCard` and the detail page each guard
them; the type marks them optional. This is the same principle as *Optional by
design* — an unattended folder must never acquire an invented season or description
because a slot exists for one. Alt text falls back to `"<title> — image 3"`, which is
dull and true.

**Drive is the source of truth, and the site syncs itself.**
`.github/workflows/sync-drive.yml` mirrors a Drive folder into the archive at 02:20
UTC daily, rebuilds and deploys — no machine involved. `tools/pull-drive.mjs` does the
mirroring with a service-account JWT and plain `fetch`, deliberately with no
`googleapis` dependency, and skips files whose md5 already matches. Setup (service
account, sharing, the two repo secrets) is in **`docs/drive-sync.md`**.

Two things about that workflow are load-bearing:

- **It deploys Pages itself** rather than leaving it to `deploy.yml`. A push made with
  `GITHUB_TOKEN` does not trigger other workflows, so its commit would otherwise never
  reach the site. Both workflows share the `pages` concurrency group so two deploys
  cannot overlap.
- **`actions/cache/restore` and `.../save` are separate steps.** The combined action
  computes its save key at restore time, and `tools/.drive-state.json` is rewritten
  mid-run, so the cache would have been keyed to the pre-sync state and never advanced.

**Automation skips the safety review.** Images from a new Drive folder go live without
anyone seeing them. The run summary flags every new collection with a reminder to check
faces, third-party names, handles and phone numbers — but the crops in `sources.mjs`
only cover files that were already there. This is the accepted trade, chosen knowingly.

**`npm run publish`** does the whole loop: images → build → commit → push → Actions
deploys. It refuses to run if the tree holds changes the pipeline does not own, so it
can never fold someone's work-in-progress into an image commit. `-- --dry` stops
before committing.

**`ARCHIVE_ROOT`** overrides where the archive lives:
`ARCHIVE_ROOT="G:/My Drive/Adeela portfolio Data" npm run images`. Point it at a
Google Drive for Desktop mount and "put it in Drive" and "put it in the archive"
become the same action. A missing root throws rather than publishing an empty site.

- **`tools/sources.mjs` names DIRECTORIES, not files.** Each override lists source
  folders in Adeela's archive; `npm run images` publishes whatever is in them, in
  filename order, which is the sequence she numbered them in. That sort is **natural,
  not lexicographic** — digit runs compare as numbers, so an unpadded `1..64` folder
  stays in her order. Letters still bind a variant to its plate (`41` < `41a` < `42`).
- **The image budget is nearly spent.** `build-images.mjs` fails past 45 MB; the set is
  at **40.5 MB** since Inventive Clothing landed. The next folder will need images cut,
  or `QUALITY`/`MAX` lowered — cut counts before quality, per the error message.
- **To add, remove or reorder images: change the folder and re-run `npm run images`.**
  No code edit. This matters — the archive is her working folder and gets reorganised
  regularly, and an earlier hand-listed manifest broke every single time it did, once
  mid-run while silently dropping an entire PDF's worth of images.
- **A collection's cover is `assets[0]` unless `sources.mjs` names a `cover`.** That
  default is the first file in folder order, which for Bridal was a pencil croquis —
  fine inside the gallery, wrong as the one image representing the collection on
  `/work`. Give `cover` the **archive-relative path**, not the bare filename, whenever a
  collection lists more than one directory: Bridal draws on "Bridal 1" and "Bridal 2"
  and both number from 01, so `"04.jpg"` silently resolves to the first folder listed.
  `build-images.mjs` now throws if a named cover matches nothing.
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
  obtain. Her print-resolution originals (up to 6300 × 14981) are never served. The one
  exception is the hero (`max: 1626`), which is the cropped panel's own long edge — the
  same pixels the old whole-sheet banner already published, not more.
- A single may also carry **`rotate`** (a quarter-turn, for a tall panel used as a wide
  banner). It has to be applied **after** `resize` in `build-images.mjs`: sharp runs
  extract → resize → rotate whatever the call order, so a `.rotate()` written earlier in
  the chain silently does nothing. Empirically verified, not assumed.
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

The hero's crop in `sources.mjs` is a third, different thing: it selects *which artwork*
is in the banner (one panel out of a five-panel catalogue page), and deliberately keeps
that panel's own gold border intact. That is why it publishes at `max` rather than
through a `w`/`h` cover box — a box would cut the border straight off.

### Responsive — layouts fold, they don't shrink

Recruiters open portfolios on phones. The site is verified at **360 / 390 / 430 / 768 /
1024 / 1440 px**, and every page must have `scrollWidth === clientWidth` at all six —
a sideways scroll on a portfolio reads as carelessness.

The rule that fixes most of it: **a row that won't fit should re-flow, not compress.**
Two ways this went wrong, both now corrected and worth not reintroducing:

- **`CollectionRow`** is `flex-wrap` below `md` and `md:flex-nowrap` above, with
  `md:order-*` restoring the desktop sequence. Its season label is `shrink-0
  whitespace-nowrap` (correct — "Degree Thesis" at `tracking-label` must not break), so
  in a single row it took ~120px of a 312px phone column and squeezed the title into
  four words a line. Folding the title to its own full-width line is the fix.
- **Long unbreakable tokens set the page's minimum width.** `amanatadeela@gmail.com` at
  `text-3xl` once forced the whole `/contact` document to 457px inside a 360px viewport.
  That page is gone, but the rule isn't: any email, URL or single-word display heading
  needs a smaller base step and `break-words` / `break-all`.

Other standing rules:

- **Type scales start smaller than they used to.** `PageHeader` is
  `text-4xl → 5xl → 6xl → 7xl`; collection titles are `text-3xl → 4xl → lg:5xl`.
  Cinzel is wide, and titles are content ("Semi-Formals" is one 12-character word).
- **Nothing interactive sits on top of the artwork on a phone.** The `Gallery` lightbox
  puts prev/next in a bar under the plate below `sm` and at the sides from `sm` up.
- **Tap targets are ≥44px.** The Nav toggle is `h-11 w-11` with `-mr-2` to keep its
  optical alignment.
- `body { overflow-x: clip }` in `globals.css` is a **safety net for the `vw`-sized
  full-bleed strip**, not a licence. `clip`, not `hidden`, so no scroll container is
  created and fixed/sticky positioning still works. If a phone needs it, there is a
  layout bug above it — find that instead.

### Routes (`src/app/`)

`/` · `/work` · `/work/[slug]` (5, SSG) · `/about` · `/awards` (awards + CV download)
· plus `not-found`, `sitemap.ts`, `robots.ts`, `icon.svg`.

**There is no `/contact` route** — removed at Adeela's request on 2026-08-09. Contact is
now a single `mailto:` in three places: the Footer (on every page), and the "Get in
Touch" button on `/` and `/about`. `Button` renders a plain `<a>` for a `mailto:` href,
without `target="_blank"` — a blank target on a mailto leaves an empty tab behind.
If a contact page is ever wanted back, it was `src/app/contact/page.tsx` up to commit
`b46677e`. Whatever replaces it, **the email must stay reachable from every page**:
recruiters are the audience, and the CV download is not a substitute.

Collections carry `group` ("Thesis" / "My Work") and optional `subgroup` ("Printed");
`/work` renders them under those headings, which is Adeela's own two-category structure.
Each group heading has an `id`, so the hero's "My Work" button can link to `/work#my-work`.

`sitemap.ts` and `robots.ts` need `export const dynamic = "force-static"` under
`output: "export"`, or the build fails.

### Key components (`src/components/`)

`Nav` (sticky; white text over the home hero — client) · `Footer` · `Hero`
· `PageHeader` · `SectionHeading` · `CollectionRow` (the numbered index row, with a
hover preview in the right margin; folds below `md`) · `CollectionCard` (home featured)
· `Gallery` (masonry + lightbox, the lightbox re-laid-out for phones — client)
· `SwatchStrip` · `EditorialImage` · `Button` · `Reveal` (client — starts at opacity 0,
so it photographs blank unless the page is scrolled first) · `ImageGuard`
(right-click/drag deterrent — client).

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

## Responsive

To check the site at phone and tablet widths for $0: `npm run build`, serve `out/` from
a throwaway server, and drive headless Chrome over CDP.

**The trap:** `chrome --headless --window-size=360,3000 --screenshot` does **not** give
a 360px viewport on Windows. Chrome clamps the window to ~500 CSS px, renders at 500 and
crops the PNG to 360. It looks exactly like catastrophic horizontal overflow — text
sliced mid-word on every page — and it is an artifact. `--force-device-scale-factor`
does not help.

Use CDP `Emulation.setDeviceMetricsOverride` + `Page.captureScreenshot
{captureBeyondViewport:true}`. No puppeteer needed: Node has a global `WebSocket`, so
launch with `--remote-debugging-port`, read `webSocketDebuggerUrl` from `/json/version`,
then `Target.createTarget` → `Target.attachToTarget {flatten:true}`.

Two things worth doing in the same pass:

- **Scroll before capturing.** `Reveal` uses IntersectionObserver and starts at opacity
  0, so anything below the fold photographs as blank space. Scrolling *fast* is not
  enough — a 400px/60ms pass left a whole section at opacity 0 and the screenshot showed
  a plain gap where the CV panel was, which reads exactly like "the section didn't
  render". 300px steps with ~140ms settle fixed it. Assert it rather than trusting the
  scroll: probe for `getComputedStyle(e).opacity < 1` in the same pass as the overflow
  check, and confirm against the built HTML before believing a section is missing.
- **Assert, don't eyeball.** Probe `documentElement.scrollWidth` vs `clientWidth` and
  list elements whose `getBoundingClientRect().right` exceeds the viewport — the rect
  check still works after `body { overflow-x: clip }` hides the scrollbar evidence.

## Gotchas that have actually bitten

- **Stop any local preview server before `npm run build`.** A `python -m http.server`
  running in `out/` makes the build fail with `EBUSY: rmdir 'out'`. This once caused a
  chained `build && commit` to skip the commit while the following `push` still ran, so
  a "successful deploy" shipped the *previous* commit. **Verify changes against the
  served HTML, not the deploy status.**
- **Tailwind opacity modifiers only accept values on the scale** (steps of 5). A
  plausible-looking `bg-scrim/92` compiles to **no rule at all** — silently, with no
  build warning. That shipped a lightbox whose backdrop was a 4px blur over a fully
  legible page. Write `bg-scrim/[0.92]` for off-scale values, and sweep for others with:
  ```bash
  grep -rhoE '\b(bg|text|border|from|via|to|ring|shadow)-[a-z]+/[0-9]+' src/ \
    | sort -u | awk -F'/' '$2 % 5 != 0'
  ```
- **A responsive `sm:` override must cancel every property the base class set.**
  `bottom-2 sm:inset-y-0 sm:bottom-auto` collapsed the lightbox arrows into the top
  corners on tablets: `sm:bottom-auto` is emitted after `sm:inset-y-0`, so it undid the
  `bottom:0` that was doing the vertical centring.
- **Tailwind opacity is a fixed scale.** `bg-scrim/92` is not valid — 92 is not a step,
  so the class silently produces nothing and the lightbox rendered with no backdrop at
  all. Use an arbitrary value: `bg-scrim/[0.92]`.
- **Chrome screenshots**: a stale `--user-data-dir` lock makes Chrome write nothing and
  report nothing. Use a fresh directory per run.
- **You cannot screenshot a narrow viewport from the Chrome CLI on Windows.**
  `--window-size=360,3000` is clamped to ~500 CSS px in *both* headless modes; Chrome
  renders at 500 and crops the PNG to 360, which looks exactly like catastrophic
  horizontal overflow on every page. `--force-device-scale-factor` doesn't help. Use CDP
  `Emulation.setDeviceMetricsOverride` + `Page.captureScreenshot
  {captureBeyondViewport:true}` — Node's global `WebSocket` is enough, no puppeteer.
  Scroll the page first or `Reveal` leaves everything below the fold blank at opacity 0.
- **GitHub Pages caches**: after deploying, re-check with a cache-busting query string.
- Adeela renames folders in her archive *while work is in progress*. If the pipeline
  can't resolve a path, list the directory before assuming anything is lost.

## Conventions

- Match the editorial style: generous whitespace, uppercase letter-spaced `.eyebrow`
  kickers, hairline `.rule` dividers, serif display headings.
- **Any layout change is checked at 360px before it is called done**, not just at the
  desktop width you happened to be looking at. See *Responsive* above for the widths
  and *Gotchas* for how to screenshot them.
- Server components by default; `"use client"` only where interactivity is needed.
- Always write descriptive `alt` text.
- Do not publish Adeela's phone number or home address on a page. They appear in the
  CV, which is her choice to distribute.

## Deploy (free)

Push to `main` → `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
`SITE_URL` in `src/lib/site-url.ts` feeds metadata and the sitemap — keep it in sync
with the live URL.
