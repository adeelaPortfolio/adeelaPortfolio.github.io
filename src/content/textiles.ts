import type { Textile } from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// TEXTILES — standalone surface-design pieces, shown as square artwork.
//
// These are the prints themselves rather than the garments made from them.
// Images come from `npm run images`; `tone` is sampled from each artwork's own
// centre rather than picked by hand, so the loading tint matches the piece.
// ─────────────────────────────────────────────────────────────────────────────

export const textiles: Textile[] = [
  {
    title: "Engineered Shirt Front",
    technique: "Digital textile print — engineered placement",
    description:
      "A shirt front drawn to its finished panel dimensions, so the border and the placement motif resolve exactly where the garment is cut.",
    image: {
      src: "/images/textiles/engineered-shirt-front.webp",
      alt: "Engineered digital print for a lawn shirt front, floral placement over a patterned ground",
    },
    tone: "#9fa592",
  },
  {
    title: "Shirt Back Panel",
    technique: "Digital textile print — engineered placement",
    description:
      "The back panel of the same three-piece, pattern-matched to the front across the side seam.",
    image: {
      src: "/images/textiles/shirt-back-panel.webp",
      alt: "Engineered digital print for a lawn shirt back panel",
    },
    tone: "#8d8f94",
  },
  {
    title: "Sleeve Repeat",
    technique: "Digital repeat pattern",
    description:
      "A continuous repeat sized for sleeve lengths — the one part of the suit that has to tile rather than sit as a placement.",
    image: {
      src: "/images/textiles/sleeve-repeat.webp",
      alt: "Digital repeat pattern designed for lawn sleeves",
    },
    tone: "#a2a588",
  },
  {
    title: "Dupatta Border",
    technique: "Engineered border print",
    description:
      "Detail from a full dupatta length — a border that runs the whole two-and-a-half metres and still reads when the cloth is draped.",
    image: {
      src: "/images/textiles/dupatta-border.webp",
      alt: "Engineered border print for a printed lawn dupatta, paisley and tulip motifs in indigo",
    },
    tone: "#72767a",
  },
  {
    title: "Mughal Medallion",
    technique: "Digital print on viscose — engineered panel",
    description:
      "A centre medallion panel from the Maya winter range, drawn for printed viscose.",
    image: {
      src: "/images/textiles/mughal-medallion.webp",
      alt: "Mughal-style medallion panel print in ochre and cream for winter viscose",
    },
    tone: "#b2a293",
  },
  {
    title: "Paisley Border Panel",
    technique: "Digital print on viscose — border layout",
    description:
      "Paisley border and field worked as one layout, so the border weight balances the ground.",
    image: {
      src: "/images/textiles/paisley-border.webp",
      alt: "Paisley border print panel in rose and cream for winter viscose",
    },
    tone: "#af918d",
  },
  {
    title: "Garden Arch",
    technique: "Digital print on viscose — engineered panel",
    description:
      "An architectural garden arch built as a single engineered panel — the print is the composition, not a repeat.",
    image: {
      src: "/images/textiles/garden-arch.webp",
      alt: "Engineered garden-arch panel print with trailing foliage, for winter viscose",
    },
    tone: "#bfbdb1",
  },
  {
    title: "Striped Rose Placement",
    technique: "Digital print — placement over stripe",
    description:
      "Roses placed over a hard black-and-white stripe, with the neckline drawn into the artwork.",
    image: {
      src: "/images/textiles/striped-rose-placement.webp",
      alt: "Rose placement print over a black and white stripe, with neckline detail",
    },
    tone: "#7a7471",
  },
  {
    title: "Chevron Bloom",
    technique: "Digital print — placement and border",
    description:
      "A soft floral placement carried on a chevron ground, drawn for a lawn pret capsule.",
    image: {
      src: "/images/textiles/chevron-bloom.webp",
      alt: "Floral placement print on a chevron ground in pink and cream",
    },
    tone: "#b5ada7",
  },
  {
    title: "Indigo Cypress",
    technique: "Digital print — engineered panel",
    description:
      "Cypress and arch motifs in indigo over a pale ground, engineered to a shirt panel.",
    image: {
      src: "/images/textiles/indigo-cypress.webp",
      alt: "Indigo cypress and arch motif print engineered to a shirt panel",
    },
    tone: "#92a197",
  },
  {
    title: "Printed Silk Scarf",
    technique: "Print on silk twill",
    description:
      "A bordered square that has to read folded, draped or flat — the most demanding format for an engineered print.",
    image: {
      src: "/images/textiles/printed-silk-scarf.webp",
      alt: "Botanical printed silk scarf design with a decorative border",
    },
    tone: "#c0bcbc",
  },
  {
    title: "Baroque Scarf",
    technique: "Print on silk twill",
    description:
      "Baroque florals worked to a corner-weighted border, so the design composes when the scarf is knotted.",
    image: {
      src: "/images/textiles/baroque-scarf.webp",
      alt: "Baroque floral printed silk scarf design in pink and gold",
    },
    tone: "#ac908a",
  },
];
