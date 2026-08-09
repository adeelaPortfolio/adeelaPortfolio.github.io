// ─────────────────────────────────────────────────────────────────────────────
// SOURCE OVERRIDES — optional corrections to what the archive already says.
//
// READ THIS FIRST: you do NOT have to edit this file to publish a collection.
// `tools/lib/discover.mjs` walks the archive and every folder of images becomes
// a collection on its own, with its images in the folder's own order. Drop a
// folder in, run `npm run images`, and it is on the site.
//
// This file exists for the handful of things a folder name cannot express:
//
//   • merging folders   — Bridal 1 + Bridal 2 are one collection, not two
//   • display order     — overrides appear first, in the order listed here;
//                         newly discovered folders are appended after them
//   • naming            — a slug or title that isn't just the folder name
//   • covers            — which single image represents the collection
//   • crops             — removing third-party names, handles, phone numbers
//   • ratio             — the gallery's placeholder aspect
//
// Anything omitted is inferred. Omitting a folder entirely does NOT hide it —
// it just means the folder is published with defaults. To take something off
// the site, remove it from the archive.
//
// Prose (summaries, concepts) lives in src/content/collection-copy.ts.
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
    // The folder is "Scarfs"; the site says "Silk Scarfs". The slug is pinned
    // here so the published URL survives a folder rename.
    slug: "silk-scarves",
    dirs: ["My Work/Scarfs"],
    ratio: "4 / 3",
  },
  {
    // Two folders, one collection — the only reason this entry has to exist.
    slug: "bridal",
    dirs: ["Bridal/Bridal 1", "Bridal/Bridal 2"],
    ratio: "3 / 4",
    // Without this the cover is Bridal 1/01.jpg, a pencil croquis — the row on
    // /work previewed the collection with a working sketch. The tassels read as
    // finished bridal work at thumbnail size. Full path, not "04.jpg": both
    // Bridal folders have an 04.
    cover: "Bridal/Bridal 2/04.jpg",
  },
  {
    slug: "semi-formals",
    dirs: ["My Work/Semi Formals"],
    ratio: "4 / 3",
    // Without this the cover is 01.jpg, a sheet of print panels on white. It
    // reads as artwork-on-paper at thumbnail size, and the same pink floral
    // panels already open the gallery. 06.jpg is the Enchantress campaign —
    // finished garments on a model, which is what the row is previewing.
    cover: "My Work/Semi Formals/06.jpg",
  },
  {
    // Adeela's own label. The folder is numbered 1..64 UNPADDED, so the natural
    // sort in lib/assets.mjs is what keeps it in her sequence — plain
    // lexicographic ordering puts 10 before 2 and scatters the set.
    slug: "inventive-clothing",
    dirs: ["My Work/Inventive Clothing"],
    ratio: "3 / 4",
    // Default cover was 1.jpeg, a rail of finished pieces on hangers — it reads
    // as a shop rack at thumbnail size. 3.jpeg is one embroidered bodice over
    // the rainbow lehnga, which is the label's own work rather than its
    // stockroom, and is cropped above the neck so no client face is in it.
    cover: "My Work/Inventive Clothing/3.jpeg",
  },
];

/**
 * Archive folders that hold images but are NOT collections. Without this the
 * portrait would turn up on /work as a one-image collection called "Portrait".
 * Paths are matched exactly, or as a prefix ending in "/".
 */
export const notCollections = ["Portrait"];

/** One-off site images, sourced the same way. */
export const singles = [
  {
    // The left panel of that sheet, on its own and turned on its side. 03.jpg is
    // a catalogue page of five panels on white; used whole it put the white
    // margin and two half-panels into the banner. Cropped to the one panel and
    // rotated, the floral archway reads as a single wide image.
    //
    // 270° (anticlockwise), not 90°: it lands the empty damask arch on the left,
    // under the wordmark and the heavy left-hand scrim, and the flowers, vase
    // and fruit on the right where nothing covers them. A 90° turn mirrors that
    // and buries the detail under the text.
    //
    // No w/h box: cover-cropping to one would cut the panel's own gold border
    // off. `max` is the panel's long edge, so it publishes at native size —
    // the same pixels the old whole-sheet hero already exposed, not more.
    id: "hero",
    from: "My Work/Prints & Cutlines/03.jpg",
    crop: { left: 0.0156, top: 0, width: 0.3238, height: 1 },
    rotate: 270,
    max: 1626,
  },
  {
    // Adeela's own portrait, supplied by her — an illustrated treatment of a
    // photograph, not a photograph. It replaces the 512px crop lifted out of a
    // 2015 thesis page, which was the only picture of her in the whole archive.
    //
    // The crop's one job is the bottom edge: the file carries a four-point
    // sparkle watermark at roughly x 707–752, y 1085–1135. Cutting at y = 1060
    // removes it, and 848 × 1060 is exactly 4:5, so the w/h box below resizes
    // without cropping anything further. Move that bottom edge down and the
    // watermark comes back.
    id: "portrait",
    from: "Portrait/adeela.jpg",
    w: 800,
    h: 1000,
    crop: { left: 0, top: 0, width: 1, height: 0.8618 },
  },
];
