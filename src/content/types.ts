// ─────────────────────────────────────────────────────────────────────────────
// Content model for the portfolio.
//
// Everything Adeela needs to change lives in the sibling data files
// (site.ts, collections.ts). To swap a placeholder for a real
// photo: drop the image in /public/images/... and set the matching `src` field
// to that path (e.g. "/images/bridal/01.webp"). When `src`
// is empty, a tasteful vintage placeholder renders automatically.
// ─────────────────────────────────────────────────────────────────────────────

/** A single image slot. Leave `src` empty ("") to render a placeholder. */
export interface ImageItem {
  /** Public path, e.g. "/images/bridal/01.webp". Empty = placeholder. */
  src: string;
  /** Descriptive alt text — always fill this in for accessibility & SEO. */
  alt: string;
  /** Optional short caption shown under the image in some layouts. */
  caption?: string;
  /** True pixel size, filled in by the image pipeline. When present the image
   *  is displayed at its own aspect ratio and is never cropped. */
  width?: number;
  height?: number;
}

/** A fabric / colour swatch shown as a small chip. */
export interface Swatch {
  /** Human name, e.g. "Mulberry Silk". */
  name: string;
  /** CSS colour for the chip (used until a real swatch photo is added). */
  color: string;
  /** Optional fibre / technique note, e.g. "Charmeuse, 19mm". */
  note?: string;
}

/** A garment collection / lookbook. */
export interface Collection {
  /** URL slug, e.g. "silk-scarves". Must be unique. */
  slug: string;
  /**
   * Top-level category on the index: "Thesis" or "My Work". Collections are
   * grouped under these headings in the order the groups first appear.
   */
  group: string;
  /** Optional second level, e.g. "Printed" for the two print collections. */
  subgroup?: string;
  /** Display title. */
  title: string;
  /** Season label, e.g. "Autumn/Winter". */
  season: string;
  /** Year label, e.g. "2025". */
  year: string;
  /** One-line summary for cards and listings. Names the client first. */
  summary: string;
  /**
   * Full concept statement (1–3 short paragraphs). Optional, like `process`
   * and `materials`: the detail page drops the whole Concept/Materials block
   * when a collection has neither, rather than showing half of it.
   */
  concept?: string[];
  /** Cover image (used on the home page and the collections grid). */
  cover: ImageItem;
  /** The lookbook — finished garments, campaign and catalogue imagery. */
  lookbook: ImageItem[];
  /**
   * Development work: print plates, cutlines, mood boards, sketches, embroidery
   * artwork. Optional — omit rather than invent one.
   */
  process?: ImageItem[];
  /**
   * Gallery aspect ratio, e.g. "4 / 3" for landscape catalogue spreads.
   * Defaults to the portrait "3 / 4". Getting this wrong crops the artwork.
   */
  ratio?: string;
  /** Photography credit, e.g. "Campaign photography courtesy of La'Belle." */
  credit?: string;
  /** Key materials list. Optional — only where the cloth is actually known. */
  materials?: string[];
  /** Fabric & colour swatches. Optional — never hand-invent hex values. */
  swatches?: Swatch[];
}

/** A standalone textile / surface-design piece. */
export interface Textile {
  /** Display title, e.g. "Indigo Shibori". */
  title: string;
  /** Technique, e.g. "Hand-resist dye". */
  technique: string;
  /** Short description of the piece. */
  description: string;
  /** The artwork image. */
  image: ImageItem;
  /** Fallback tone for the placeholder (CSS colour). */
  tone?: string;
}

/** A press feature, exhibition, or award. */
export interface PressItem {
  /** e.g. "Gold Medal, Tamgha-e-Quaid". */
  title: string;
  /** e.g. "Feature", "Exhibition", "Award". */
  kind: string;
  /** e.g. "2025". */
  year: string;
  /** Optional detail line. */
  detail?: string;
  /** Optional external link. */
  href?: string;
}

/** An education entry. */
export interface EducationItem {
  qualification: string;
  institution: string;
  years: string;
}

/** Site-wide identity, bio, and contact content. */
export interface SiteContent {
  /** Short display name used in the wordmark, e.g. "Adeela". */
  name: string;
  /** Full name for the About page & footer. */
  fullName: string;
  /** Professional role line. */
  role: string;
  /** Hero tagline. */
  tagline: string;
  /** City / country. */
  location: string;
  /** Contact email. */
  email: string;
  /** Social links. */
  socials: { label: string; href: string }[];
  /** Hero background image. */
  heroImage: ImageItem;
  /** Portrait for the About page. */
  portrait: ImageItem;
  /** Bio paragraphs for the About page. */
  bio: string[];
  /** Designer statement / philosophy (short). Optional — the pull quote on the
   *  home and About pages hides itself when there isn't one. */
  statement?: string;
  /** Skills list. */
  skills: string[];
  /** Education entries. */
  education: EducationItem[];
  /** Press, exhibitions, awards. */
  press: PressItem[];
  /** Path to a downloadable CV in /public, e.g. "/cv/adeela-cv.pdf". */
  cvPath: string;
}
