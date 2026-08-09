// ─────────────────────────────────────────────────────────────────────────────
// COLLECTION COPY — the words, and only the words.
//
// WHICH COLLECTIONS EXIST IS NOT DECIDED HERE. `npm run images` walks Adeela's
// archive and writes every folder it finds into image-manifest.json; the site
// builds its list from that. A folder added to the archive appears on /work
// whether or not it has an entry below.
//
// What an entry adds is language. Everything in it is optional and every field
// is guarded downstream, so a collection with no entry renders as its folder
// name plus its images — plain, but true. **That is the point.** A new folder
// gets no season, no year and no summary rather than an invented one, and the
// page simply omits those lines until Adeela says what they should be.
//
// So: never write a summary here to fill a gap. Write it when she tells you
// what the work is.
// ─────────────────────────────────────────────────────────────────────────────

export interface CollectionCopy {
  /** Overrides the folder name. */
  title?: string;
  /** Left-hand label on the index row, e.g. "Lawn & Pret". */
  season?: string;
  /** Four-digit year; the row prints the last two. */
  year?: string;
  /** One line, shown under the title on the index and as the page intro. */
  summary?: string;
  /** 1–3 paragraphs. Omit unless she has written one. */
  concept?: string[];
  /** Key materials. Omit unless the cloth is actually known. */
  materials?: string[];
  /** Photography credit. */
  credit?: string;
  /** "See more" link — only a URL she has actually supplied. */
  link?: { label: string; href: string };
  /** Second-level heading on /work, e.g. "Printed". */
  subgroup?: string;
  /** Alt text for image n of the gallery. Falls back to the title. */
  describe?: (n: number) => string;
  /** Alt text for the cover. */
  coverAlt?: string;
}

export const copy: Record<string, CollectionCopy> = {
  thesis: {
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
    coverAlt:
      "Detail of gold embellishment from the Redefining the Ottoman Queen thesis collection",
    describe: (n) =>
      `Redefining the Ottoman Queen — thesis research, illustration or finished garment ${n}`,
  },

  "prints-and-cutlines": {
    title: "Prints & Cutlines",
    season: "Lawn & Pret",
    year: "2021",
    subgroup: "Printed",
    summary:
      "Digital textile prints, engineered panel layouts and garment cutlines developed across seasonal lawn and pret ranges.",
    credit: "Some campaign photography is courtesy of the respective clients.",
    coverAlt: "Engineered digital lawn print laid out as garment panels",
    describe: (n) => `Digital print artwork, cutline layout or finished printed suit ${n}`,
  },

  "silk-scarves": {
    title: "Silk Scarfs",
    season: "Silk",
    year: "2018",
    subgroup: "Printed",
    summary:
      "Printed silk scarves — each design drawn as a bordered square and photographed as styled cloth.",
    coverAlt: "Printed silk scarf design shown flat beside the scarf styled and draped",
    describe: (n) => `Printed silk scarf design ${n}, shown flat and styled`,
  },

  bridal: {
    title: "Bridal",
    season: "Bridal",
    year: "2026",
    summary:
      "Bridal and heavy formal wear — hand-drawn figures, colour and fabrication boards, adda embroidery in progress, and the finished pieces worn.",
    coverAlt: "Bridal outfit with hand-embroidered detail",
    describe: (n) => `Bridal and heavy formal wear — development or finished garment ${n}`,
  },

  "semi-formals": {
    title: "Semi-Formals",
    season: "Semi-Formal",
    year: "2018",
    summary:
      "Luxury semi-formal wear for women and children, developed from hand illustration through embroidery and trims to the finished campaign.",
    coverAlt: "Luxury semi-formal collection campaign spread",
    describe: (n) =>
      `Semi-formal collection — illustration, embroidery development or campaign spread ${n}`,
  },

  // Her own label, May 2024 – March 2026. From the Career & Experience entry on
  // her CV. No concept statement, because she has not written one for it.
  "inventive-clothing": {
    title: "Inventive Clothing",
    season: "Own Label",
    year: "2026",
    summary:
      "Adeela's own label — an independent brand she founded and ran end to end, from custom lawn stitching through semi-formal and bridal commissions.",
    coverAlt: "Hand-embroidered bridal lehnga made under Adeela's own label",
    // The label's own account, and the only place the full body of its work
    // lives. The ?igsh= share token she sent is stripped.
    link: {
      label: "See the label on Instagram",
      href: "https://www.instagram.com/inventiveclothing_/",
    },
    describe: (n) => `Inventive Clothing — garment, embroidery detail or finished commission ${n}`,
  },
};
