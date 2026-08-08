// ─────────────────────────────────────────────────────────────────────────────
// CURATION MANIFEST — the provenance record for every image on the site.
//
// Each entry maps a raw archive asset to a path under public/images/. Assets
// are addressed as "<file>" or "<pdf>#<n>", where n is the 1-based ordinal of
// the nth image stream in that PDF (page numbers are unreliable: bridal 2.pdf
// carries 9 images across 8 pages).
//
// Deliberately EXCLUDED, and why:
//   • labelle FB_IMG_…512446/515037/518740/521629/525690/545393 — influencer
//     campaign graphics with other people's names and handles burned in
//     ("KANWAL AFTAB in SPOTLIGHT", "@greeneyed.gurl"). Not Adeela's to publish.
//   • jahanara FB_IMG_…955623 — carries a "Linen'19" client campaign lockup.
//   • thesis #2 and #3 — both print Adeela's old personal phone number and
//     email address into the artwork. #3 is used ONLY as a cropped portrait.
//   • bridal 2.pdf #6 — a 336×924 sidebar strip, not artwork.
//   • noor tex viscose 6.jpg / 8.jpg — corrupt in every surviving copy.
// ─────────────────────────────────────────────────────────────────────────────

const BRIDAL1 = "bridal/bridal 1.pdf";
const BRIDAL2 = "bridal/bridal 2.pdf";
const SEMI = "coronation/semi formals.pdf";
const SCARF = "coronation/scarfs.pdf";
const PRINTS = "coronation/my textile prints and cutlines.pdf";
const THESIS = "final thesis/thesis portfolio.pdf";

const r = (file, from, to) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${file}#${from + i}`);

export const collections = [
  {
    slug: "inventive-bridal",
    ratio: "3 / 4",
    cover: `${BRIDAL1}#23`,
    lookbook: [
      `${BRIDAL1}#23`, `${BRIDAL1}#24`, `${BRIDAL1}#26`, `${BRIDAL1}#25`,
      `${BRIDAL2}#9`, `${BRIDAL2}#8`, `${BRIDAL1}#20`, `${BRIDAL1}#21`,
      `${BRIDAL1}#22`, `${BRIDAL2}#7`, `${BRIDAL1}#15`, `${BRIDAL1}#16`,
      `${BRIDAL1}#17`, `${BRIDAL1}#18`,
    ],
    process: [
      `${BRIDAL1}#1`, `${BRIDAL1}#2`, `${BRIDAL2}#1`, `${BRIDAL2}#2`,
      `${BRIDAL1}#7`, `${BRIDAL1}#9`, `${BRIDAL1}#8`, `${BRIDAL1}#3`,
      `${BRIDAL1}#5`, `${BRIDAL1}#10`, `${BRIDAL1}#12`, `${BRIDAL1}#13`,
      `${BRIDAL1}#14`, `${BRIDAL2}#3`,
    ],
  },
  {
    slug: "jahanara-lawn",
    ratio: "3 / 4",
    cover: "jahanara/FB_IMG_1782762963986.jpg",
    lookbook: [
      "jahanara/FB_IMG_1782762963986.jpg", "jahanara/FB_IMG_1782762926786.jpg",
      "jahanara/FB_IMG_1782762937020.jpg", "jahanara/FB_IMG_1782762942501.jpg",
      "jahanara/FB_IMG_1782762950262.jpg",
    ],
    process: [
      "jahanara/front.jpg", "jahanara/shirt.jpg",
      "jahanara/sleeve.jpg", "jahanara/dupata1.jpg",
    ],
  },
  {
    slug: "labelle-lawn-pret",
    ratio: "3 / 4",
    cover: "labelle/FB_IMG_1782762475196.jpg",
    lookbook: [
      "labelle/FB_IMG_1782762475196.jpg", "labelle/FB_IMG_1782762480275.jpg",
      "labelle/FB_IMG_1782762482915.jpg", "labelle/FB_IMG_1782762485672.jpg",
      "labelle/FB_IMG_1782762488078.jpg", "labelle/FB_IMG_1782762491149.jpg",
      "labelle/FB_IMG_1782762494417.jpg", "labelle/FB_IMG_1782762497593.jpg",
      "labelle/FB_IMG_1782762499680.jpg", "labelle/FB_IMG_1782762502057.jpg",
      "labelle/FB_IMG_1782762504274.jpg",
    ],
    process: [
      "labelle/d1.jpg", "labelle/d2.jpg", "labelle/d3.jpg", "labelle/d4a.jpg",
      "labelle/d5.jpg", "labelle/d6a.jpg", "labelle/d8.jpg", "labelle/d11a.jpg",
    ],
  },
  {
    slug: "noor-maya",
    ratio: "3 / 4",
    cover: "noor tex viscose/cover.tif",
    trim: true, // these plates carry ~40% dead white margin
    lookbook: [
      "noor tex viscose/9.jpg", "noor tex viscose/0.jpg", "noor tex viscose/1.jpg",
      "noor tex viscose/2.jpg", "noor tex viscose/3.jpg", "noor tex viscose/4.jpg",
      "noor tex viscose/5.jpg", "noor tex viscose/7.jpg", "noor tex viscose/10.jpg",
      "noor tex viscose/11.jpg",
    ],
    process: [],
  },
  {
    slug: "coronation-lawn",
    ratio: "4 / 3",
    cover: `${PRINTS}#4`,
    lookbook: [
      `${PRINTS}#4`, `${PRINTS}#7`, `${PRINTS}#1`, `${PRINTS}#2`, `${PRINTS}#10`,
      `${PRINTS}#13`, `${PRINTS}#16`, `${PRINTS}#19`, `${PRINTS}#22`,
      `${PRINTS}#24`, `${PRINTS}#27`, `${PRINTS}#30`, `${PRINTS}#36`,
    ],
    process: [
      `${PRINTS}#3`, `${PRINTS}#6`, `${PRINTS}#9`, `${PRINTS}#12`, `${PRINTS}#15`,
      `${PRINTS}#20`, `${PRINTS}#23`, `${PRINTS}#26`, `${PRINTS}#32`,
      `${PRINTS}#41`, `${PRINTS}#43`, `${PRINTS}#46`, `${PRINTS}#49`, `${PRINTS}#52`,
    ],
  },
  {
    slug: "coronation-scarves",
    ratio: "4 / 3",
    cover: `${SCARF}#2`,
    lookbook: r(SCARF, 1, 8),
    process: [],
  },
  {
    slug: "palais-royal",
    ratio: "4 / 3",
    cover: `${SEMI}#4`,
    lookbook: [
      `${SEMI}#4`, `${SEMI}#2`, `${SEMI}#6`, `${SEMI}#8`, `${SEMI}#10`,
      `${SEMI}#12`, `${SEMI}#14`, `${SEMI}#1`,
    ],
    process: [`${SEMI}#3`, `${SEMI}#5`, `${SEMI}#7`, `${SEMI}#9`, `${SEMI}#11`, `${SEMI}#13`],
  },
  {
    slug: "ottoman-queen",
    ratio: "4 / 3",
    cover: `${THESIS}#4`,
    lookbook: [
      `${THESIS}#4`, `${THESIS}#14`, `${THESIS}#15`, `${THESIS}#16`,
      `${THESIS}#17`, `${THESIS}#18`, `${THESIS}#19`, `${THESIS}#1`,
    ],
    process: r(THESIS, 5, 13),
  },
];

/** Standalone surface-design pieces for /textiles — square crops of artwork. */
export const textiles = [
  { name: "engineered-shirt-front", from: "jahanara/front.jpg" },
  { name: "shirt-back-panel", from: "jahanara/shirt.jpg" },
  { name: "sleeve-repeat", from: "jahanara/sleeve.jpg" },
  { name: "dupatta-border", from: "jahanara/dupata1.jpg", position: "top" },
  { name: "mughal-medallion", from: "noor tex viscose/9.jpg" },
  { name: "paisley-border", from: "noor tex viscose/0.jpg" },
  { name: "garden-arch", from: "noor tex viscose/3.jpg" },
  { name: "striped-rose-placement", from: "labelle/d1.jpg" },
  { name: "chevron-bloom", from: "labelle/d5.jpg" },
  { name: "indigo-cypress", from: "labelle/d8.jpg" },
  { name: "printed-silk-scarf", from: `${SCARF}#3` },
  { name: "baroque-scarf", from: `${SCARF}#4` },
];

/** One-off site images. */
export const singles = [
  { id: "hero", from: "jahanara/shirt.jpg", w: 2400, h: 1350 },
  // The only photograph of Adeela anywhere in the archive: a framed portrait
  // inside a thesis page. Cropped to the frame's interior — the rest of that
  // page prints her old personal phone number and email, so it is never shown.
  { id: "portrait", from: `${THESIS}#3`, w: 800, h: 1000,
    crop: { left: 0.737, top: 0.108, width: 0.146, height: 0.326 } },
];
