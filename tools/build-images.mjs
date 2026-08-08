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
import { allAssets, open } from "./lib/assets.mjs";
import { collections, textiles, singles } from "./sources.mjs";

const OUT = "public/images";
const MAX = 1400;        // longest edge for gallery images — also the ceiling on what any visitor can obtain
const COVER = 1200;      // longest edge for collection covers
const QUALITY = 70;
const BUDGET_MB = 30;    // hard ceiling — the build fails past this

const index = new Map(allAssets().map((a) => [a.id, a]));
const report = [];
const manifest = { collections: {}, textiles: {}, singles: {} };

function get(id) {
  const a = index.get(id);
  if (!a) throw new Error(`unknown asset: ${id}`);
  return a;
}

async function write(id, outRel, opts = {}) {
  const asset = get(id);
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
      ? img.resize(opts.w, opts.h, {
          fit: "cover",
          position: opts.position ?? "centre",
          withoutEnlargement: true,
        })
      : img.resize(MAX, MAX, { fit: "inside", withoutEnlargement: true });

  const abs = path.join(OUT, outRel + ".webp");
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const info = await img.webp({ quality: QUALITY, effort: 5 }).toFile(abs);

  report.push({ out: outRel, from: id, px: `${info.width}x${info.height}`, kb: info.size / 1024 });
  return { src: `/images/${outRel}.webp`, width: info.width, height: info.height };
}

/** Cover boxes follow the collection's own aspect ratio, so nothing is cropped
 *  twice — a landscape catalogue spread gets a landscape cover. */
function coverBox(ratio) {
  const [a, b] = ratio.split("/").map((n) => Number(n.trim()));
  return a >= b
    ? { w: COVER, h: Math.round((COVER * b) / a) }
    : { w: Math.round((COVER * a) / b), h: COVER };
}

/** A gallery entry is either a bare asset id, or `{ from, crop }` where crop is
 *  in fractions of the source — used to cut third-party names and handles out
 *  of client campaign images. Fractions survive any change of resolution. */
const entryOf = (item) => (typeof item === "string" ? { from: item } : item);

for (const c of collections) {
  const box = coverBox(c.ratio);
  const entry = { cover: null, lookbook: [], process: [] };
  const cov = entryOf(c.cover);
  entry.cover = await write(cov.from, `collections/${c.slug}/cover`, {
    ...box, trim: c.trim, crop: cov.crop,
  });

  for (const [i, item] of c.lookbook.entries()) {
    const e = entryOf(item);
    entry.lookbook.push(
      await write(e.from, `collections/${c.slug}/look-${String(i + 1).padStart(2, "0")}`, {
        trim: c.trim, crop: e.crop,
      }),
    );
  }
  for (const [i, item] of (c.process ?? []).entries()) {
    const e = entryOf(item);
    entry.process.push(
      await write(e.from, `collections/${c.slug}/process-${String(i + 1).padStart(2, "0")}`, {
        trim: c.trim, crop: e.crop,
      }),
    );
  }
  manifest.collections[c.slug] = entry;
  console.log(`✓ ${c.slug}  (${entry.lookbook.length} looks, ${entry.process.length} process)`);
}

for (const t of textiles) {
  // Trim by default: the print plates carry wide white margins, which against a
  // dark page ground read as blank blocks beside the artwork rather than paper.
  manifest.textiles[t.name] = await write(t.from, `textiles/${t.name}`, {
    w: 1200, h: 1200, position: t.position, trim: t.trim ?? true,
  });
}
console.log(`✓ textiles (${textiles.length})`);

for (const s of singles) {
  manifest.singles[s.id] = await write(s.from, s.id, {
    w: s.w, h: s.h, crop: s.crop,
  });
}
console.log(`✓ singles (${singles.length})`);

fs.writeFileSync("tools/.out/manifest.json", JSON.stringify(manifest, null, 2));

const totalKb = report.reduce((n, r) => n + r.kb, 0);
const biggest = [...report].sort((a, b) => b.kb - a.kb).slice(0, 5);
console.log(`\n${report.length} images, ${(totalKb / 1024).toFixed(1)} MB total`);
console.log("largest:");
for (const b of biggest) console.log(`  ${b.kb.toFixed(0).padStart(5)} KB  ${b.px.padEnd(11)} ${b.out}`);

if (totalKb / 1024 > BUDGET_MB) {
  console.error(`\n✗ over the ${BUDGET_MB} MB budget — cut image counts before quality.`);
  process.exit(1);
}
