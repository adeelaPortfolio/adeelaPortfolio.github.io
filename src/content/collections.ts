import type { Collection } from "./types";
import manifest from "./image-manifest.json";

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS — Adeela's own two-category structure: her degree Thesis, and
// My Work (Printed → Prints & Cutlines and Silk Scarfs, plus Bridal and
// Semi-Formals).
//
// The IMAGES are not listed here. `tools/sources.mjs` maps each collection to
// source folders in her archive, `npm run images` reads whatever is in them in
// filename order — her sequence — and writes image-manifest.json. This file
// reads its galleries from that manifest, so the page can never claim more or
// fewer images than actually exist.
//
// To change images: change the folder, run `npm run images`. Nothing here needs
// editing. To change words: edit below.
// ─────────────────────────────────────────────────────────────────────────────

type Img = { src: string; width: number; height: number };
type ManifestEntry = { cover: Img; lookbook: Img[] };
const images = manifest.collections as Record<string, ManifestEntry>;

/** Gallery for one collection, straight from what the pipeline produced. */
function gallery(slug: string, describe: (n: number) => string) {
  return (images[slug]?.lookbook ?? []).map((img, i) => ({
    ...img,
    alt: describe(i + 1),
  }));
}

function cover(slug: string, alt: string) {
  const c = images[slug]?.cover;
  return c ? { ...c, alt } : { src: "", alt };
}

export const collections: Collection[] = [
  {
    slug: "thesis",
    group: "Thesis",
    title: "Redefining the Ottoman Queen",
    season: "Degree Thesis",
    year: "2015",
    summary:
      "The gold-medal thesis collection at the University of South Asia — Ottoman court dress merged with Victorian cut lines.",
    concept: [
      "The thesis took the Ottoman period as its subject, and Hürrem Sultan as its figure. Because no fixed dress code was recorded for her, the collection reconstructs one: Victorian cut lines merged with Ottoman fashion, with motifs drawn from Ottoman historical dress and architecture.",
      "Where the originals used gold work, the collection substitutes dori work and hand-carved aluminium foil with embellishment — a deliberate translation rather than a reproduction. The research boards, illustrations and final exhibition are shown here in sequence.",
    ],
    materials: [
      "Dori work",
      "Hand-carved aluminium foil embellishment",
      "Structured velvet and brocade",
    ],
    ratio: "4 / 3",
    cover: cover(
      "thesis",
      "Detail of gold embellishment from the Redefining the Ottoman Queen thesis collection",
    ),
    lookbook: gallery(
      "thesis",
      (n) => `Redefining the Ottoman Queen — thesis research, illustration or finished garment ${n}`,
    ),
  },
  {
    slug: "prints-and-cutlines",
    group: "My Work",
    subgroup: "Printed",
    title: "Prints & Cutlines",
    season: "Lawn & Pret",
    year: "2021",
    summary:
      "Digital textile prints, engineered panel layouts and garment cutlines developed across seasonal lawn and pret ranges.",
    ratio: "4 / 3",
    credit: "Some campaign photography is courtesy of the respective clients.",
    cover: cover("prints-and-cutlines", "Engineered digital lawn print laid out as garment panels"),
    lookbook: gallery(
      "prints-and-cutlines",
      (n) => `Digital print artwork, cutline layout or finished printed suit ${n}`,
    ),
  },
  {
    slug: "silk-scarves",
    group: "My Work",
    subgroup: "Printed",
    title: "Silk Scarfs",
    season: "Silk",
    year: "2018",
    summary:
      "Printed silk scarves — each design drawn as a bordered square and photographed as styled cloth.",
    ratio: "4 / 3",
    cover: cover(
      "silk-scarves",
      "Printed silk scarf design shown flat beside the scarf styled and draped",
    ),
    lookbook: gallery(
      "silk-scarves",
      (n) => `Printed silk scarf design ${n}, shown flat and styled`,
    ),
  },
  {
    slug: "bridal",
    group: "My Work",
    title: "Bridal",
    season: "Bridal",
    year: "2026",
    summary:
      "Bridal and heavy formal wear — hand-drawn figures, colour and fabrication boards, adda embroidery in progress, and the finished pieces worn.",
    ratio: "3 / 4",
    cover: cover("bridal", "Bridal outfit with hand-embroidered detail"),
    lookbook: gallery(
      "bridal",
      (n) => `Bridal and heavy formal wear — development or finished garment ${n}`,
    ),
  },
  {
    slug: "semi-formals",
    group: "My Work",
    title: "Semi-Formals",
    season: "Semi-Formal",
    year: "2018",
    summary:
      "Luxury semi-formal wear for women and children, developed from hand illustration through embroidery and trims to the finished campaign.",
    ratio: "4 / 3",
    cover: cover("semi-formals", "Luxury semi-formal collection campaign spread"),
    lookbook: gallery(
      "semi-formals",
      (n) => `Semi-formal collection — illustration, embroidery development or campaign spread ${n}`,
    ),
  },
  {
    // Her own label, May 2024 – March 2026. Everything below is from the
    // Career & Experience entry on her CV — no concept statement, because she
    // has not written one for it.
    slug: "inventive-clothing",
    group: "My Work",
    title: "Inventive Clothing",
    season: "Own Label",
    year: "2026",
    summary:
      "Adeela's own label — an independent brand she founded and ran end to end, from custom lawn stitching through semi-formal and bridal commissions.",
    ratio: "3 / 4",
    cover: cover(
      "inventive-clothing",
      "Hand-embroidered bridal lehnga made under Adeela's own label",
    ),
    lookbook: gallery(
      "inventive-clothing",
      (n) => `Inventive Clothing — garment, embroidery detail or finished commission ${n}`,
    ),
  },
];

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
