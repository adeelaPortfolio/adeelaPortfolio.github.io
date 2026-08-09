// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION DISCOVERY — the archive decides what collections exist.
//
// Nothing here has to be edited to publish a new collection. Drop a folder of
// images into the archive, run `npm run images`, and it appears on /work with
// its images in the folder's own order.
//
// The rule is deliberately dumb, because Adeela reorganises this archive while
// work is in progress and a clever rule would break silently:
//
//   1. Any directory that DIRECTLY contains images is a collection.
//   2. Its group is the top-level folder it sits under ("My Work", "Bridal"),
//      mapped through GROUPS below. A folder of images at the archive root
//      falls back to DEFAULT_GROUP.
//   3. tools/sources.mjs may override any of that — merge two folders into one
//      collection, rename it, reorder it, crop individual files. Overrides are
//      OPTIONAL. What they are not allowed to do is hide a folder by omission:
//      a directory nobody claims still becomes a collection.
//
// Ordering: overridden collections come first, in the order sources.mjs lists
// them, so the curated index stays put. Anything newly discovered is appended,
// sorted by path, so a new folder lands predictably at the end rather than
// shuffling the existing numbering.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { SRC_ROOT, IMAGE_RE, listImages } from "./assets.mjs";

/** Top-level archive folder → the group heading shown on /work. */
const GROUPS = {
  "Final thesis": "Thesis",
};
const DEFAULT_GROUP = "My Work";

/** "My Work/Semi Formals" → "semi-formals" */
export function slugify(name) {
  return name
    // NFKD splits an accented letter into letter + combining mark, and the
    // \p{M} class then drops the mark: "Café" → "cafe", not "caf".
    .normalize("NFKD")
    .replace(/\p{M}+/gu, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

/** "semi formals" → "Semi Formals"; leaves existing capitals alone. */
function titleize(name) {
  return name
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

/** Every directory under the archive that directly holds at least one image. */
export function imageDirs(root = SRC_ROOT) {
  const found = [];
  const walk = (abs, rel) => {
    let entries;
    try {
      entries = fs.readdirSync(abs, { withFileTypes: true });
    } catch {
      return; // unreadable (a Drive placeholder mid-sync, a permissions blip)
    }
    if (entries.some((e) => e.isFile() && IMAGE_RE.test(e.name)) && rel) found.push(rel);
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith(".")) continue;
      walk(path.join(abs, e.name), rel ? `${rel}/${e.name}` : e.name);
    }
  };
  walk(root, "");
  return found.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

/**
 * Merge the archive's real contents with the overrides in sources.mjs.
 * Returns the collection list the pipeline should build, in display order.
 */
export function discoverCollections(overrides = [], notCollections = []) {
  const isExcluded = (d) =>
    notCollections.some((n) => d === n || d.startsWith(`${n}/`));
  const dirs = imageDirs().filter((d) => !isExcluded(d));
  const claimed = new Set();
  const out = [];

  for (const o of overrides) {
    // An override may name folders that no longer exist — she renames them
    // mid-run. Keep whichever ones are still there; drop the collection only
    // if every one of its folders has gone.
    const live = (o.dirs ?? []).filter((d) => dirs.includes(d));
    const missing = (o.dirs ?? []).filter((d) => !dirs.includes(d));
    if (missing.length) {
      console.warn(`! ${o.slug}: ${missing.join(", ")} not in the archive — skipped`);
    }
    if (!live.length) continue;
    live.forEach((d) => claimed.add(d));
    out.push({
      ...o,
      dirs: live,
      group: o.group ?? GROUPS[live[0].split("/")[0]] ?? DEFAULT_GROUP,
      title: o.title ?? titleize(path.basename(live[0])),
      discovered: false,
    });
  }

  for (const dir of dirs) {
    if (claimed.has(dir)) continue;
    const parts = dir.split("/");
    const base = parts[parts.length - 1];
    out.push({
      slug: slugify(base),
      dirs: [dir],
      group: parts.length > 1 ? (GROUPS[parts[0]] ?? parts[0]) : DEFAULT_GROUP,
      title: titleize(base),
      discovered: true,
    });
  }

  // A duplicate slug would make two collections fight over one /work/<slug>
  // route and one output directory. Fail loudly rather than publish whichever
  // one happened to be written last.
  const seen = new Map();
  for (const c of out) {
    if (seen.has(c.slug)) {
      throw new Error(
        `two collections resolve to the slug "${c.slug}": ` +
          `${seen.get(c.slug).join(", ")} and ${c.dirs.join(", ")}. ` +
          `Rename one folder, or give one an explicit slug in tools/sources.mjs.`,
      );
    }
    seen.set(c.slug, c.dirs);
  }

  // Drop anything that resolved to no images at all.
  return out.filter((c) => {
    const n = c.dirs.reduce((t, d) => t + listImages(d).length, 0);
    if (!n) console.warn(`! ${c.slug}: no images found in ${c.dirs.join(", ")} — skipped`);
    return n > 0;
  });
}
