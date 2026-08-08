// ─────────────────────────────────────────────────────────────────────────────
// Shared asset loader for the image tooling.
//
// Reads Adeela's raw archive, which lives OUTSIDE the repo and is never
// committed. Two kinds of source:
//   • loose image files      → id "labelle/d1.jpg"
//   • images inside the PDFs → id "bridal/bridal 1.pdf#7"
//
// PDF pages are addressed by IMAGE STREAM ORDINAL, not page number: some pages
// carry two images (bridal 2.pdf has 9 images across 8 pages), so page numbers
// are not stable identifiers.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

export const SRC_ROOT = "J:/Cursor Projects/Adeela portfolio Data";

export const PDFS = [
  "bridal/bridal 1.pdf",
  "bridal/bridal 2.pdf",
  "coronation/semi formals.pdf",
  "coronation/scarfs.pdf",
  "coronation/my textile prints and cutlines.pdf",
  "final thesis/thesis portfolio.pdf",
];

export const LOOSE_DIRS = ["labelle", "jahanara", "noor tex viscose"];

// ── Path resolution ──────────────────────────────────────────────────────────
// The archive is Adeela's working folder, so it gets reorganised: mid-build the
// folders were recapitalised and "noor tex viscose" became "Noor Textiles
// viscose". Asset IDs stay stable (they're the provenance record in
// sources.mjs); only the lookup adapts. Each path segment is matched against
// what is actually on disk — exactly, then case-insensitively, then by first
// word — so a rename doesn't silently break the pipeline.

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

/** Every page image lifts straight out: these PDFs store one uncompressed
 *  DCTDecode XObject per page, with a direct /Length. No decoding needed. */
export function carvePdf(relPath) {
  const buf = fs.readFileSync(resolvePath(relPath));
  const s = buf.toString("latin1");
  const out = [];
  let i = 0;
  while ((i = s.indexOf("DCTDecode", i)) !== -1) {
    // Anchor on the enclosing indirect object, NOT the nearest "<<" — several
    // of these PDFs put a nested /DecodeParms << >> dict before /Filter, which
    // would otherwise slice off the /Subtype and /Width keys.
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

/** Loose files on disk, excluding the two known-corrupt Noor plates. */
export const CORRUPT = new Set(["noor tex viscose/6.jpg", "noor tex viscose/8.jpg"]);

export function looseFiles() {
  const out = [];
  for (const dir of LOOSE_DIRS) {
    const abs = resolvePath(dir);
    for (const name of fs.readdirSync(abs).sort()) {
      if (!/\.(jpe?g|tiff?)$/i.test(name)) continue;
      const id = `${dir}/${name}`;
      if (CORRUPT.has(id)) continue;
      out.push({ id, file: path.join(abs, name) });
    }
  }
  return out;
}

/** One sharp instance for any asset id. `unlimited` is required for cover.tif,
 *  which otherwise trips libtiff's 50 MB cumulative allocation limit. */
export function open(asset) {
  const opts = { unlimited: true, limitInputPixels: false };
  return asset.data ? sharp(asset.data, opts) : sharp(asset.file, opts);
}

/** Every asset in the archive, PDFs carved and loose files listed. */
export function allAssets() {
  const out = [];
  for (const p of PDFS) out.push(...carvePdf(p));
  out.push(...looseFiles());
  return out;
}
