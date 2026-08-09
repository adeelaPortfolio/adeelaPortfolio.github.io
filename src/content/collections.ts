import type { Collection } from "./types";
import manifest from "./image-manifest.json";
import { copy } from "./collection-copy";

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS — assembled, not written.
//
// The list below is not a list. Every collection on the site comes from
// image-manifest.json, which `npm run images` generates by walking Adeela's
// archive: each folder of images is a collection, its files are its gallery, in
// the folder's own order. Add a folder to the archive, run `npm run images`,
// and /work has a new entry with its own page and route — no edit here, and no
// edit to tools/sources.mjs either.
//
// Two files shape the result, both optional:
//
//   tools/sources.mjs            pixels — merges, covers, crops, ratio, order
//   src/content/collection-copy.ts  words — title, season, year, summary…
//
// A collection with no copy renders as its folder name and its images. Season,
// year and summary are simply absent, and every component guards them. That is
// deliberate: an unattended folder must never acquire an invented season or an
// invented description just because the layout has a slot for one.
// ─────────────────────────────────────────────────────────────────────────────

type Img = { src: string; width: number; height: number };
type ManifestEntry = {
  title: string;
  group: string;
  subgroup?: string;
  ratio?: string;
  dirs: string[];
  cover: Img;
  lookbook: Img[];
};

const entries = manifest.collections as Record<string, ManifestEntry>;
// Display order is the pipeline's: sources.mjs overrides first, in the order
// they are listed there, then anything newly discovered, appended.
const order: string[] = (manifest as { order?: string[] }).order ?? Object.keys(entries);

function build(slug: string): Collection {
  const e = entries[slug];
  const c = copy[slug] ?? {};
  const title = c.title ?? e.title;
  // No copy means no bespoke alt text. "<title> — image 3" is dull, but it is
  // accurate, which beats a generated sentence about work nobody has described.
  const describe = c.describe ?? ((n: number) => `${title} — image ${n}`);

  return {
    slug,
    group: e.group,
    title,
    cover: { ...e.cover, alt: c.coverAlt ?? title },
    lookbook: e.lookbook.map((img, i) => ({ ...img, alt: describe(i + 1) })),
    ...(c.subgroup ?? e.subgroup ? { subgroup: c.subgroup ?? e.subgroup } : {}),
    ...(e.ratio ? { ratio: e.ratio } : {}),
    ...(c.season ? { season: c.season } : {}),
    ...(c.year ? { year: c.year } : {}),
    ...(c.summary ? { summary: c.summary } : {}),
    ...(c.concept?.length ? { concept: c.concept } : {}),
    ...(c.materials?.length ? { materials: c.materials } : {}),
    ...(c.credit ? { credit: c.credit } : {}),
  };
}

export const collections: Collection[] = order
  .filter((slug) => entries[slug])
  .map(build);

/** Look up one collection by slug. */
export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

/**
 * Collections grouped for the index page, preserving the order above:
 * Thesis first, then My Work with its Printed pair kept together.
 */
export function groupedCollections() {
  const groups: { group: string; items: Collection[] }[] = [];
  for (const c of collections) {
    const last = groups[groups.length - 1];
    if (last && last.group === c.group) last.items.push(c);
    else groups.push({ group: c.group, items: [c] });
  }
  return groups;
}
