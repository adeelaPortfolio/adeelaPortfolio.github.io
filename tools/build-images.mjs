// ─────────────────────────────────────────────────────────────────────────────
// Turns the raw archive into the web-sized WebP set under public/images/.
//
// Run:  npm run images
//
// Nothing here ships — this file lives outside src/ and public/ and is never
// imported by Next. The committed OUTPUT is what deploys.
//
// The longest edge is capped at MAX px on purpose: it is the ceiling on what
// any site visitor can ever obtain. Adeela's print-resolution originals (up to
// 6300 × 14981) stay on her machine.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { listImages, open, resolvePath } from "./lib/assets.mjs";
import { collections, singles } from "./sources.mjs";

const OUT = "public/images";
const MANIFEST = "src/content/image-manifest.json";
const MAX = 1400; // longest edge — also the ceiling on what any visitor can obtain
const COVER = 1200;
const QUALITY = 70;
const BUDGET_MB = 45; // hard ceiling — the run fails past this

const report = [];
const manifest = { collections: {}, singles: {} };

async function write(asset, outRel, opts = {}) {
  let img = open(asset).rotate();

  if (opts.trim) img = img.trim({ threshold: 12 });

  if (opts.crop) {
    const m = await open(asset).metadata();
    const c = opts.crop;
    img = img.extract({
      left: Math.round(m.width * c.left),
      top: Math.round(m.height * c.top),
      width: Math.round(m.width * c.width),
      height: Math.round(m.height * c.height),
    });
  }

  img =
    opts.w && opts.h
      ? // A hard crop to an exact box — only for the hero banner and the portrait.
        img.resize(opts.w, opts.h, {
          fit: "cover",
          position: opts.position ?? "centre",
          withoutEnlargement: true,
        })
      : img.resize(opts.max ?? MAX, opts.max ?? MAX, {
          fit: "inside",
          withoutEnlargement: true,
        });

  // A quarter-turn, for a tall engineered panel used as a wide banner.
  // MUST come after resize: sharp runs extract → resize → rotate whatever the
  // call order, so a .rotate() written earlier in the chain silently does
  // nothing. The resize box above is square, so turning last is equivalent.
  if (opts.rotate) img = img.rotate(opts.rotate);

  // Face blur. Fractional boxes, applied AFTER resize and rotate so the numbers
  // refer to the pixels that actually publish. Tuning them against a 6300px
  // original would silently drift the moment MAX changes.
  //
  // Sigma scales with the box: a fixed sigma that erases a face at 1400px
  // leaves it readable in a bigger frame. This is the one edit here that is a
  // privacy control rather than a crop, so it fails loudly (see sources.mjs)
  // instead of quietly doing nothing.
  if (opts.blur?.length) {
    let buf = await img.toBuffer();
    const m = await sharp(buf).metadata();
    const patches = [];
    for (const b of opts.blur) {
      const left = Math.max(0, Math.round(m.width * b.left));
      const top = Math.max(0, Math.round(m.height * b.top));
      const width = Math.min(m.width - left, Math.round(m.width * b.width));
      const height = Math.min(m.height - top, Math.round(m.height * b.height));
      if (width < 2 || height < 2) throw new Error(`${outRel}: blur box is off the image`);
      const sigma = Math.max(12, Math.round(Math.min(width, height) / 4));
      patches.push({
        input: await sharp(buf).extract({ left, top, width, height }).blur(sigma).toBuffer(),
        left,
        top,
      });
    }
    img = sharp(await sharp(buf).composite(patches).toBuffer());
  }

  const abs = path.join(OUT, outRel + ".webp");
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const info = await img.webp({ quality: QUALITY, effort: 5 }).toFile(abs);

  report.push({ out: outRel, from: asset.id, px: `${info.width}x${info.height}`, kb: info.size / 1024 });
  return { src: `/images/${outRel}.webp`, width: info.width, height: info.height };
}

// Start from a clean slate so images removed from a folder don't linger.
fs.rmSync(OUT, { recursive: true, force: true });

for (const c of collections) {
  const assets = c.dirs.flatMap((d) => listImages(d));
  if (!assets.length) {
    console.warn(`! ${c.slug}: no images found in ${c.dirs.join(", ")} — skipped`);
    continue;
  }

  // Blur boxes are keyed by ARCHIVE-RELATIVE PATH, not basename: Bridal 1 and
  // Bridal 2 both number from 01, so a basename key would blur a face into the
  // wrong photograph and leave the intended one published. A key that matches
  // nothing throws rather than warning — a privacy edit that silently does
  // nothing is the failure that actually costs something.
  const blurKeys = Object.keys(c.blurs ?? {});
  const matches = (a, k) => a.id === k || a.id.endsWith(`/${k}`);
  for (const k of blurKeys) {
    if (!assets.some((a) => matches(a, k)))
      throw new Error(`${c.slug}: blur key "${k}" is not in ${c.dirs.join(", ")}`);
  }
  const blursFor = (a) => c.blurs?.[blurKeys.find((k) => matches(a, k))];

  const entry = { lookbook: [] };
  for (const [i, asset] of assets.entries()) {
    entry.lookbook.push(
      await write(asset, `${c.slug}/${String(i + 1).padStart(2, "0")}`, {
        trim: c.trim,
        crop: c.crops?.[path.basename(asset.file)],
        blur: blursFor(asset),
      }),
    );
  }

  // Cover: the named file if given, otherwise the first image in sequence.
  //
  // `cover` may be a bare filename or an archive-relative path. The path form
  // is not optional when a collection draws on more than one folder: Bridal
  // pulls from "Bridal 1" and "Bridal 2" and both number their files from 01,
  // so a bare "04.jpg" silently resolves to whichever folder is listed first.
  const coverAsset =
    (c.cover &&
      assets.find((a) => a.id === c.cover || a.id.endsWith(`/${c.cover}`))) ??
    assets[0];
  if (c.cover && !assets.some((a) => a.id === c.cover || a.id.endsWith(`/${c.cover}`))) {
    throw new Error(`${c.slug}: cover "${c.cover}" is not in ${c.dirs.join(", ")}`);
  }
  // Covers are sized down, never cropped to a box — the site displays every
  // image at its own aspect ratio.
  entry.cover = await write(coverAsset, `${c.slug}/cover`, {
    max: COVER,
    trim: c.trim,
    crop: c.crops?.[path.basename(coverAsset.file)],
    blur: blursFor(coverAsset),
  });

  manifest.collections[c.slug] = entry;
  console.log(`✓ ${c.slug.padEnd(22)} ${String(entry.lookbook.length).padStart(3)} images`);
}

for (const s of singles) {
  const dir = path.dirname(s.from);
  const base = path.basename(s.from);
  const asset = listImages(dir).find((a) => path.basename(a.file) === base);
  if (!asset) throw new Error(`single "${s.id}": ${s.from} not found`);
  manifest.singles[s.id] = await write(asset, s.id, {
    w: s.w,
    h: s.h,
    max: s.max,
    crop: s.crop,
    rotate: s.rotate,
  });
}
console.log(`✓ singles                ${String(singles.length).padStart(3)} images`);

// Committed, so the site build never depends on the raw archive being present.
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

const totalKb = report.reduce((n, r) => n + r.kb, 0);
console.log(`\n${report.length} images, ${(totalKb / 1024).toFixed(1)} MB total`);
console.log("largest:");
for (const b of [...report].sort((a, b) => b.kb - a.kb).slice(0, 5)) {
  console.log(`  ${b.kb.toFixed(0).padStart(5)} KB  ${b.px.padEnd(11)} ${b.out}`);
}

if (totalKb / 1024 > BUDGET_MB) {
  console.error(`\n✗ over the ${BUDGET_MB} MB budget — cut image counts before quality.`);
  process.exit(1);
}
