// Writes the commit message and the Actions job summary for a Drive sync.
// Lives here rather than inline in the workflow because YAML, shell and
// JavaScript quoting stack up three deep and the backticks stop surviving.
//
//   node tools/sync-report.mjs <commit-msg-path> [summary-path]
//
// Compares the manifest against the previous commit's, so the report says what
// actually changed rather than restating the whole site every night.
import fs from "node:fs";
import { execFileSync } from "node:child_process";

const [msgPath, summaryPath] = process.argv.slice(2);
const now = JSON.parse(fs.readFileSync("src/content/image-manifest.json", "utf8"));

let before = { collections: {}, order: [] };
try {
  before = JSON.parse(execFileSync("git", ["show", "HEAD:src/content/image-manifest.json"], { encoding: "utf8" }));
} catch {
  // First run, or the file is new. Everything counts as added.
}

const slugs = now.order ?? Object.keys(now.collections);
const oldSlugs = new Set(before.order ?? Object.keys(before.collections ?? {}));
const count = (m, s) => m.collections?.[s]?.lookbook.length ?? 0;

const added = slugs.filter((s) => !oldSlugs.has(s));
const removed = [...oldSlugs].filter((s) => !slugs.includes(s));
const grew = slugs.filter((s) => oldSlugs.has(s) && count(now, s) !== count(before, s));
const total = slugs.reduce((n, s) => n + count(now, s), 0);

const headline =
  added.length ? `Add ${added.join(", ")} from Drive`
  : removed.length ? `Remove ${removed.join(", ")} — gone from Drive`
  : grew.length ? `Update ${grew.join(", ")} from Drive`
  : "Sync images from Drive";

const lines = [headline, "", `${slugs.length} collections, ${total} images.`, ""];
for (const s of added) lines.push(`  + ${s.padEnd(22)} ${String(count(now, s)).padStart(3)}  NEW`);
for (const s of removed) lines.push(`  - ${s.padEnd(22)} ${String(count(before, s)).padStart(3)}  removed`);
for (const s of grew) {
  const d = count(now, s) - count(before, s);
  lines.push(`  ~ ${s.padEnd(22)} ${String(count(now, s)).padStart(3)}  ${d > 0 ? "+" : ""}${d}`);
}
lines.push("", "Mirrored from Drive by .github/workflows/sync-drive.yml.", "");
fs.writeFileSync(msgPath, lines.join("\n"));

if (summaryPath) {
  const rows = slugs
    .map((s) => {
      const tag = added.includes(s) ? " **new**" : grew.includes(s) ? ` (${count(now, s) - count(before, s) > 0 ? "+" : ""}${count(now, s) - count(before, s)})` : "";
      return `| ${s}${tag} | ${count(now, s)} |`;
    })
    .join("\n");

  const warn = added.length
    ? [
        "",
        "> **" + added.length + " new collection" + (added.length > 1 ? "s" : "") + " went live with nobody looking at " +
          (added.length > 1 ? "them" : "it") + ".**",
        "> Check for faces, third-party names, Instagram handles and phone numbers,",
        "> and add a summary in src/content/collection-copy.ts — until then the page",
        "> shows a title and images and nothing else.",
      ].join("\n")
    : "";

  fs.appendFileSync(
    summaryPath,
    `## ${headline}\n\n${slugs.length} collections, ${total} images.\n\n` +
      `| Collection | Images |\n|---|---|\n${rows}\n${warn}\n`,
  );
}

console.log(headline);
