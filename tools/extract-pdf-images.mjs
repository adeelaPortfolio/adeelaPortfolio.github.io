// ─────────────────────────────────────────────────────────────────────────────
// Extracts every page image out of the portfolio PDFs into plain image folders,
// so the artwork can be browsed and reused without opening a PDF.
//
//   node tools/extract-pdf-images.mjs            # write the folders
//   node tools/extract-pdf-images.mjs --dry-run  # list what would be written
//
// Each PDF gets a sibling folder named after it, holding its images numbered in
// page order:  Bridal\bridal 1.pdf  →  Bridal\Bridal 1\01.jpg … 26.jpg
//
// The JPEG bytes are copied out verbatim — no decoding, no re-encoding, so the
// files are bit-for-bit the originals at full resolution, not web copies.
//
// Existing files are never overwritten: the script stops if a target folder
// already has images in it.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { PDFS, carvePdf, resolvePath, SRC_ROOT } from "./lib/assets.mjs";

const dryRun = process.argv.includes("--dry-run");

/** "bridal 1.pdf" → "Bridal 1" — title case, matching the folder style. */
function folderNameFor(pdfRelPath) {
  return path
    .basename(pdfRelPath, ".pdf")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

let totalFiles = 0;
let totalBytes = 0;

for (const pdf of PDFS) {
  const abs = resolvePath(pdf);
  const outDir = path.join(path.dirname(abs), folderNameFor(pdf));
  const images = carvePdf(pdf);

  if (fs.existsSync(outDir)) {
    const existing = fs.readdirSync(outDir).filter((f) => /\.jpe?g$/i.test(f));
    if (existing.length) {
      console.log(`↷ skipped  ${outDir}  (already holds ${existing.length} images)`);
      continue;
    }
  }

  const width = String(images.length).length;
  let bytes = 0;
  if (!dryRun) fs.mkdirSync(outDir, { recursive: true });

  for (const [i, img] of images.entries()) {
    const name = `${String(i + 1).padStart(Math.max(2, width), "0")}.jpg`;
    if (!dryRun) fs.writeFileSync(path.join(outDir, name), img.data);
    bytes += img.data.length;
  }

  totalFiles += images.length;
  totalBytes += bytes;
  console.log(
    `${dryRun ? "would write" : "✓ wrote"}  ${String(images.length).padStart(3)} images  ` +
      `${(bytes / 1024 / 1024).toFixed(1).padStart(6)} MB  →  ` +
      path.relative(SRC_ROOT, outDir),
  );
}

console.log(
  `\n${dryRun ? "Would extract" : "Extracted"} ${totalFiles} images, ` +
    `${(totalBytes / 1024 / 1024).toFixed(1)} MB total.`,
);
