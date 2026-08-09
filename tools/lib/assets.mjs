// ─────────────────────────────────────────────────────────────────────────────
// Asset loader for the image tooling.
//
// Adeela's raw archive lives OUTSIDE the repo and is never committed. It is her
// working folder, so it gets reorganised — folders have been renamed and files
// renumbered mid-build more than once. Two consequences shape this file:
//
//   1. Paths are resolved tolerantly (exact, then case-insensitive, then by
//      first word), so a rename doesn't break the pipeline outright.
//   2. Collections name DIRECTORIES, not individual files. Whatever is in the
//      folder is what gets published, in filename order. Reordering or swapping
//      images is a file operation, not a code change.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Where the raw archive lives. Override with ARCHIVE_ROOT to point the pipeline
 * somewhere else without editing code — most usefully at a Google Drive for
 * Desktop mount, so "put it in Drive" and "put it in the archive" become the
 * same action:
 *
 *   ARCHIVE_ROOT="G:/My Drive/Adeela portfolio Data" npm run images
 *
 * Failing loudly here is deliberate. If the archive is missing or still syncing,
 * every folder looks empty, and a silent run would publish a site with no
 * collections on it.
 */
export const SRC_ROOT = process.env.ARCHIVE_ROOT || "J:/Cursor Projects/Adeela portfolio Data";

if (!fs.existsSync(SRC_ROOT)) {
  throw new Error(
    `archive not found at "${SRC_ROOT}".\n` +
      `Set ARCHIVE_ROOT to where it lives, e.g.\n` +
      `  ARCHIVE_ROOT="G:/My Drive/Adeela portfolio Data" npm run images`,
  );
}

export const IMAGE_RE = /\.(jpe?g|png|tiff?|webp)$/i;

function resolveSegment(dir, want) {
  const entries = fs.readdirSync(dir);
  const exact = entries.find((e) => e === want);
  if (exact) return exact;
  const ci = entries.find((e) => e.toLowerCase() === want.toLowerCase());
  if (ci) return ci;
  const token = want.toLowerCase().split(/[\s.]/)[0];
  const byToken = entries.filter((e) => e.toLowerCase().split(/[\s.]/)[0] === token);
  if (byToken.length === 1) return byToken[0];
  throw new Error(
    `cannot resolve "${want}" in ${dir}` +
      (byToken.length ? ` — ambiguous: ${byToken.join(", ")}` : ""),
  );
}

/** Absolute path for an archive-relative path, tolerant of renames. */
export function resolvePath(relPath) {
  let abs = SRC_ROOT;
  for (const seg of relPath.split("/")) abs = path.join(abs, resolveSegment(abs, seg));
  return abs;
}

/**
 * Every image in one archive directory, in the sequence Adeela numbered them in.
 *
 * The sort is NATURAL, not lexicographic: digit runs compare as numbers. Most of
 * the archive is zero-padded ("01.jpg"), where the two agree — but Inventive
 * Clothing arrived numbered "1..64" unpadded, and plain .sort() puts 10 before 2
 * and scatters the set. She numbers folders in the order she wants them shown, so
 * honouring that numbering is the whole contract of this function.
 *
 * Letters still tie a variant to its plate: "41.jpg" < "41a.jpg" < "42.jpg",
 * because the leading numbers compare equal and the suffix breaks the tie.
 */
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

export function listImages(relDir) {
  const abs = resolvePath(relDir);
  return fs
    .readdirSync(abs)
    .filter((f) => IMAGE_RE.test(f))
    .sort((a, b) => collator.compare(a, b))
    .map((name) => ({ id: `${relDir}/${name}`, file: path.join(abs, name) }));
}

/** One sharp instance for an asset. `unlimited` is needed for large TIFFs,
 *  which otherwise trip libtiff's 50 MB cumulative allocation limit. */
export function open(asset) {
  const opts = { unlimited: true, limitInputPixels: false };
  return asset.data ? sharp(asset.data, opts) : sharp(asset.file, opts);
}

// ── PDF carving ──────────────────────────────────────────────────────────────
// Kept for tools/extract-pdf-images.mjs. The archive's PDFs have since been
// extracted into plain image folders, so the pipeline no longer needs this.

/** These PDFs store one uncompressed DCTDecode XObject per page with a direct
 *  /Length, so page images lift out byte-wise — no decoding, no poppler. */
export function carvePdf(relPath) {
  const buf = fs.readFileSync(resolvePath(relPath));
  const s = buf.toString("latin1");
  const out = [];
  let i = 0;
  while ((i = s.indexOf("DCTDecode", i)) !== -1) {
    // Anchor on the enclosing indirect object, NOT the nearest "<<" — some of
    // these PDFs nest a /DecodeParms << >> dict before /Filter, which would
    // otherwise slice off the /Subtype and /Width keys and silently yield zero
    // images for the whole file.
    const objStart = s.lastIndexOf(" obj", i);
    const streamKw = s.indexOf("stream", i);
    if (objStart === -1 || streamKw === -1) break;
    const dict = s.slice(objStart, streamKw);
    const len = /\/Length\s+(\d+)/.exec(dict);
    const w = /\/Width\s+(\d+)/.exec(dict);
    const h = /\/Height\s+(\d+)/.exec(dict);
    if (!len || !/\/Subtype\s*\/Image/.test(dict)) {
      i = streamKw;
      continue;
    }
    let p = streamKw + "stream".length;
    if (s[p] === "\r") p++;
    if (s[p] === "\n") p++;
    out.push({
      id: `${relPath}#${out.length + 1}`,
      data: buf.subarray(p, p + Number(len[1])),
      width: w ? Number(w[1]) : null,
      height: h ? Number(h[1]) : null,
    });
    i = p + Number(len[1]);
  }
  return out;
}
