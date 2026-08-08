// ─────────────────────────────────────────────────────────────────────────────
// SOURCE MAP — which archive folders feed which collection.
//
// This file names DIRECTORIES, not files. Whatever is in the folder is what
// gets published, in filename order, which is the sequence Adeela numbered them
// in. To add, remove or reorder images, change the folder and re-run
// `npm run images` — nothing here needs editing.
//
// Prose (titles, summaries, concepts) lives in src/content/collections.ts.
// This file is only about where the pixels come from.
// ─────────────────────────────────────────────────────────────────────────────

export const collections = [
  {
    slug: "thesis",
    dirs: ["Final thesis/Thesis Portfolio"],
    ratio: "4 / 3",
    // Pages 2 and 3 print Adeela's old phone number and hotmail address into
    // the artwork. Cropped, never published whole.
    crops: {
      "02.jpg": { left: 0, top: 0, width: 1, height: 0.815 },
      "03.jpg": { left: 0, top: 0, width: 0.663, height: 1 },
    },
  },
  {
    slug: "prints-and-cutlines",
    dirs: ["My Work/Prints & Cutlines"],
    ratio: "4 / 3",
    // Five client campaign graphics print other people's names and Instagram
    // handles over the photo. Cropped to the garment so no third party is
    // named. Verified by rendering the output, not by trusting the numbers.
    crops: {
      "65.jpg": { left: 0, top: 0, width: 0.51, height: 0.74 },   // "NAYAB in SPOTLIGHT" + @ZeeN'M
      "67.jpg": { left: 0, top: 0, width: 1, height: 0.92 },      // "greeneyed.gurl" footer bar
      "76.jpg": { left: 0.03, top: 0, width: 0.50, height: 1 },   // "KHADIJA in SPOTLIGHT"
      "77.jpg": { left: 0.16, top: 0, width: 0.68, height: 0.92 },// "kanwal.135" footer bar
      "81.jpg": { left: 0.02, top: 0, width: 0.51, height: 1 },   // "KANWAL AFTAB in SPOTLIGHT"
    },
  },
  {
    slug: "silk-scarves",
    dirs: ["My Work/Scarfs"],
    ratio: "4 / 3",
  },
  {
    slug: "bridal",
    dirs: ["Bridal/Bridal 1", "Bridal/Bridal 2"],
    ratio: "3 / 4",
  },
  {
    slug: "semi-formals",
    dirs: ["My Work/Semi Formals"],
    ratio: "4 / 3",
  },
  // Inventive Clothing: add its folder here once Adeela supplies the images.
  // { slug: "inventive-clothing", dirs: ["My Work/Inventive Clothing"], ratio: "3 / 4" },
];

/** One-off site images, sourced the same way. */
export const singles = [
  {
    id: "hero",
    from: "My Work/Prints & Cutlines/03.jpg",
    w: 2400,
    h: 1350,
  },
  {
    // The only photograph of Adeela anywhere in the archive: a framed portrait
    // inside a thesis page. Cropped to the frame's interior — the rest of that
    // page prints her old phone number and email.
    id: "portrait",
    from: "Final thesis/Thesis Portfolio/03.jpg",
    w: 800,
    h: 1000,
    crop: { left: 0.737, top: 0.108, width: 0.146, height: 0.326 },
  },
];
