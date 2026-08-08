import type { Collection } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS — eight real bodies of work, most recent first.
//
// Every image here was produced by `npm run images` from Adeela's archive.
// File names are regular, so the galleries are generated rather than listed:
//   /images/collections/<slug>/cover.webp
//   /images/collections/<slug>/look-01.webp … look-NN.webp
//   /images/collections/<slug>/process-01.webp … process-NN.webp
// To change which source images are used, edit tools/sources.mjs and re-run
// the pipeline — not this file.
// ─────────────────────────────────────────────────────────────────────────────

/** Build a numbered gallery of `count` images for one collection. */
function gallery(
  slug: string,
  kind: "look" | "process",
  count: number,
  describe: (n: number) => string,
) {
  return Array.from({ length: count }, (_, i) => ({
    src: `/images/collections/${slug}/${kind}-${String(i + 1).padStart(2, "0")}.webp`,
    alt: describe(i + 1),
  }));
}

export const collections: Collection[] = [
  {
    slug: "inventive-bridal",
    title: "Inventive Clothing",
    season: "Bridal & Semi-Formal",
    year: "2026",
    summary:
      "The bridal and semi-formal line of Adeela's own label — designed, sourced and produced end to end, from first sketch to finished lehnga.",
    concept: [
      "Inventive Clothing began as custom lawn stitching and grew into semi-formal and bridal wear. Running it meant owning every stage: client consultation and fittings, raw fabric procurement, custom dyeing, trim selection, and sourcing the karigars whose hand-embroidery carries the pieces.",
      "The work shown here follows that whole arc — colour selection and fabrication boards, hand-drawn figures, panelled lehnga construction, adda frames mid-embroidery, and finally the finished garments worn.",
    ],
    materials: [
      "Hand-embroidered net & chiffon",
      "Custom-dyed raw silk",
      "Dori and zardozi karigar work",
      "Digitally printed panel lehngas",
    ],
    ratio: "3 / 4",
    cover: {
      src: "/images/collections/inventive-bridal/cover.webp",
      alt: "Bridal outfit in deep red with hand-embroidered detail, worn",
    },
    lookbook: gallery("inventive-bridal", "look", 14, (n) =>
      `Inventive Clothing bridal and semi-formal wear, finished garment ${n}`),
    process: gallery("inventive-bridal", "process", 14, (n) =>
      `Inventive Clothing development work — sketch, fabrication board or embroidery in progress ${n}`),
  },
  {
    slug: "jahanara-lawn",
    title: "Seasonal Lawn Prints",
    season: "Digital Print",
    year: "2021",
    summary:
      "Digital print development for Jahanara — original prints, repeat patterns and engineered layouts for a seasonal lawn range, delivered remotely.",
    concept: [
      "Working remotely as a freelance print designer, Adeela created original digital prints, repeat patterns and engineered layouts for Jahanara's seasonal lawn collections, curating colourways and delivering print-ready artwork.",
      "Engineered layout is the discipline here: a three-piece suit is not a length of repeating cloth but a set of shaped panels — shirt front, back, sleeve, dupatta — each drawn to its own dimensions so the pattern resolves exactly where the garment is cut.",
    ],
    materials: ["Cotton lawn", "Printed dupatta lengths", "Engineered panel layouts"],
    ratio: "3 / 4",
    credit: "Campaign photography courtesy of Jahanara.",
    cover: {
      src: "/images/collections/jahanara-lawn/cover.webp",
      alt: "Model wearing a printed lawn three-piece from the Jahanara seasonal range",
    },
    lookbook: gallery("jahanara-lawn", "look", 5, (n) =>
      `Jahanara seasonal lawn, printed three-piece worn — look ${n}`),
    process: gallery("jahanara-lawn", "process", 4, (n) =>
      `Jahanara engineered print artwork — panel layout ${n}`),
  },
  {
    slug: "labelle-lawn-pret",
    title: "Summer Lawn Pret",
    season: "Lawn Pret",
    year: "2020",
    summary:
      "A complete lawn pret capsule for La'Belle — print development, custom embroidery placements, colourways and garment cutlines through to final sampling.",
    concept: [
      "A full capsule taken from artwork to sampling: digital textile print development, embroidery placements specified panel by panel, colourways curated across the range, and cutlines drawn for every garment.",
      "The flat plates show how each suit is built before it is ever stitched — shirt front and back, sleeve and dupatta laid out together so the border, the placement motif and the ground print all agree.",
    ],
    materials: ["Cotton lawn", "Embroidered shirt fronts", "Printed dupattas"],
    ratio: "3 / 4",
    credit: "Campaign photography courtesy of La'Belle.",
    cover: {
      src: "/images/collections/labelle-lawn-pret/cover.webp",
      alt: "Model wearing a printed lawn pret suit from the La'Belle summer capsule",
    },
    lookbook: gallery("labelle-lawn-pret", "look", 11, (n) =>
      `La'Belle summer lawn pret, finished suit worn — look ${n}`),
    process: gallery("labelle-lawn-pret", "process", 8, (n) =>
      `La'Belle lawn pret print plate — engineered panel layout ${n}`),
  },
  {
    slug: "noor-maya",
    title: "Maya — Winter Collection",
    season: "Viscose Winter",
    year: "2019",
    summary:
      "Head Designer on Noor Textiles' Maya winter range — digital prints for viscose, embroidered and paired with woven wool shawls.",
    concept: [
      "As Head Designer, Adeela led a multidisciplinary team of textile and embroidery designers through the season: mood boards to final garment, custom embroidery artwork with specified techniques and thread selections, and colour palettes curated across prints, embroideries and trims so the range read as one collection.",
      "The plates here are the winter viscose prints — arched garden panels, Mughal medallions, paisley borders and painterly florals, each engineered to a three-piece layout.",
    ],
    materials: ["Printed viscose", "Woven wool shawls", "Embroidered placements"],
    ratio: "3 / 4",
    cover: {
      src: "/images/collections/noor-maya/cover.webp",
      alt: "Noor Textile 'Maya' winter collection cover plate",
    },
    lookbook: gallery("noor-maya", "look", 10, (n) =>
      `Maya winter collection — engineered viscose print plate ${n}`),
  },
  {
    slug: "coronation-lawn",
    title: "Luxury Lawn — Prints & Cutlines",
    season: "Lawn",
    year: "2018",
    summary:
      "Digital prints, multi-head embroideries and cutlines for Coronation's luxury lawn range — including art direction of the catalogue shoots.",
    concept: [
      "Three-piece lawn developed print-first: digital artwork for shirt, sleeve, back and dupatta, multi-head embroidery developed against it, and cutlines drawn for the pret range.",
      "Adeela also designed the stitched garments for the catalogues and handled the shoots for the luxury lawn collections, so the campaign imagery and the artwork behind it come from the same hand.",
    ],
    materials: ["Cotton lawn", "Multi-head embroidery", "Printed dupattas"],
    ratio: "4 / 3",
    credit: "Campaign photography produced for Coronation.",
    cover: {
      src: "/images/collections/coronation-lawn/cover.webp",
      alt: "Coronation luxury lawn campaign spread with printed three-piece suits",
    },
    lookbook: gallery("coronation-lawn", "look", 13, (n) =>
      `Coronation luxury lawn catalogue spread ${n}`),
    process: gallery("coronation-lawn", "process", 14, (n) =>
      `Coronation lawn print artwork and cutline layout ${n}`),
  },
  {
    slug: "coronation-scarves",
    title: "Printed Silk Scarves",
    season: "Silk",
    year: "2018",
    summary:
      "A run of printed silk scarves for Coronation — each design drawn as a bordered square and photographed as styled cloth.",
    concept: [
      "Scarves are the purest form of engineered print: the whole design has to resolve within one bordered square, readable folded, draped or flat.",
      "The series runs from exotic botanicals through baroque florals to formal medallion and trellis grounds, each with its own border and corner treatment.",
    ],
    materials: ["Printed silk twill"],
    ratio: "4 / 3",
    cover: {
      src: "/images/collections/coronation-scarves/cover.webp",
      alt: "Printed silk scarf design shown flat beside the scarf styled and draped",
    },
    lookbook: gallery("coronation-scarves", "look", 8, (n) =>
      `Coronation printed silk scarf design ${n}, shown flat and styled`),
  },
  {
    slug: "palais-royal",
    title: "Palais Royal",
    season: "Luxury Semi-Formal",
    year: "2018",
    summary:
      "Coronation's first luxury semi-formal collection, for women and children — designed by Adeela from illustration through embroidery development to campaign.",
    concept: [
      "Palais Royal was the label's first move into luxury semi-formal. The collection was built from hand illustration outward: silhouette drawn first, then the embroidery motifs, borders and trims developed against it, then colour resolved across the range.",
      "Organza semi-formals and silk tunics followed the same route — prints developed, the cut designed around them, embroideries tried against the finished cloth.",
    ],
    materials: ["Organza", "Silk", "Embroidered borders and trims"],
    ratio: "4 / 3",
    credit: "Campaign photography produced for Coronation.",
    cover: {
      src: "/images/collections/palais-royal/cover.webp",
      alt: "Palais Royal semi-formal collection campaign spread, women's and children's wear",
    },
    lookbook: gallery("palais-royal", "look", 8, (n) =>
      `Palais Royal semi-formal campaign spread ${n}`),
    process: gallery("palais-royal", "process", 6, (n) =>
      `Palais Royal development — fashion illustration with embroidery motifs and trims ${n}`),
  },
  {
    slug: "ottoman-queen",
    title: "Redefining the Ottoman Queen",
    season: "Degree Thesis",
    year: "2015",
    summary:
      "The gold-medal thesis collection at the University of South Asia — Ottoman court dress merged with Victorian cut lines.",
    concept: [
      "The thesis took the Ottoman period as its subject, and Hürrem Sultan as its figure. Because no fixed dress code was recorded for her, the collection reconstructs one: Victorian cut lines merged with Ottoman fashion, with motifs drawn from Ottoman historical dress and architecture.",
      "Where the originals used gold work, the collection substitutes dori work and hand-carved aluminium foil with embellishment — a deliberate translation rather than a reproduction.",
    ],
    materials: [
      "Dori work",
      "Hand-carved aluminium foil embellishment",
      "Structured velvet and brocade",
    ],
    ratio: "4 / 3",
    cover: {
      src: "/images/collections/ottoman-queen/cover.webp",
      alt: "Detail of gold embellishment from the Redefining the Ottoman Queen thesis collection",
    },
    lookbook: gallery("ottoman-queen", "look", 8, (n) =>
      `Redefining the Ottoman Queen — illustration, finished garment or thesis display ${n}`),
    process: gallery("ottoman-queen", "process", 9, (n) =>
      `Ottoman and Victorian dress research board ${n}`),
  },
];

/** Look up one collection by slug. */
export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
