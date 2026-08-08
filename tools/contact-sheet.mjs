// Builds numbered contact sheets of the whole archive so the work can be
// reviewed without a PDF viewer. Output: tools/.out/sheet-NN.jpg + legend.txt
import fs from "node:fs";
import sharp from "sharp";
import { allAssets, open } from "./lib/assets.mjs";

const OUT = "tools/.out";
const THUMB = 300, LABEL = 26, PAD = 6, COLS = 6, ROWS = 6;
const CELL_W = THUMB + PAD * 2, CELL_H = THUMB + LABEL + PAD * 2;
const PER = COLS * ROWS;

fs.mkdirSync(OUT, { recursive: true });
const assets = allAssets();
const legend = [];

for (let s = 0; s * PER < assets.length; s++) {
  const slice = assets.slice(s * PER, s * PER + PER);
  const composites = [];

  for (let i = 0; i < slice.length; i++) {
    const a = slice[i];
    const n = s * PER + i + 1;
    const col = i % COLS, row = Math.floor(i / COLS);
    let meta = { width: 0, height: 0 };
    let thumb;
    try {
      const img = open(a);
      meta = await img.metadata();
      thumb = await img
        .resize(THUMB, THUMB, { fit: "contain", background: "#EFE9DC" })
        .jpeg({ quality: 82 })
        .toBuffer();
    } catch (e) {
      legend.push(`${String(n).padStart(3)}  !! FAILED  ${a.id}  (${e.message.slice(0, 60)})`);
      continue;
    }
    legend.push(`${String(n).padStart(3)}  ${String(meta.width) + "x" + meta.height}`.padEnd(20) + a.id);

    composites.push({ input: thumb, left: col * CELL_W + PAD, top: row * CELL_H + PAD });
    const label = `<svg width="${THUMB}" height="${LABEL}">
      <rect width="100%" height="100%" fill="#1b1a17"/>
      <text x="6" y="19" font-family="monospace" font-size="17" fill="#f5efe2">${n}</text>
      <text x="${THUMB - 6}" y="19" font-family="monospace" font-size="13" fill="#b9ad96"
        text-anchor="end">${meta.width}x${meta.height}</text>
    </svg>`;
    composites.push({
      input: Buffer.from(label),
      left: col * CELL_W + PAD,
      top: row * CELL_H + PAD + THUMB,
    });
  }

  const file = `${OUT}/sheet-${String(s + 1).padStart(2, "0")}.jpg`;
  await sharp({
    create: { width: COLS * CELL_W, height: ROWS * CELL_H, channels: 3, background: "#3a352c" },
  })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toFile(file);
  console.log("wrote", file);
}

fs.writeFileSync(`${OUT}/legend.txt`, legend.join("\n"));
console.log(`\n${assets.length} assets across ${Math.ceil(assets.length / PER)} sheets`);
