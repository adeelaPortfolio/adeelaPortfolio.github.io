// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE DRIVE → THE ARCHIVE.
//
//   node tools/pull-drive.mjs
//
// Mirrors a Drive folder into ARCHIVE_ROOT so `npm run images` can treat it as
// the archive. Adding a folder in Drive adds a collection to the site; deleting
// one removes it. This is the piece that makes Drive the source of truth.
//
// Deliberately dependency-free. A service-account JWT is a signed JSON blob and
// Drive's REST API is plain HTTPS, so node:crypto and fetch are enough — no
// googleapis package, nothing to keep patched, nothing added to the install
// that the site itself never uses.
//
// Environment:
//   GDRIVE_SA_KEY     service-account key, the whole JSON (or a path to it)
//   GDRIVE_FOLDER_ID  the folder to mirror — the id in its Drive URL
//   ARCHIVE_ROOT      where to write (defaults to the local archive path)
//
// Incremental by md5: a file already on disk with a matching checksum is not
// downloaded again. A first run pulls everything (~570 MB); later runs usually
// pull nothing. Files that vanish from Drive are deleted locally, because the
// alternative is a site that can never lose a collection.
//
// Google Docs/Sheets/Slides are skipped rather than exported — this mirrors an
// image archive, and a silent .docx appearing in a gallery folder helps nobody.
// ─────────────────────────────────────────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const FOLDER_ID = process.env.GDRIVE_FOLDER_ID;
const ROOT = process.env.ARCHIVE_ROOT || "J:/Cursor Projects/Adeela portfolio Data";
const STATE = "tools/.drive-state.json";
const CONCURRENCY = 6;

if (!FOLDER_ID) throw new Error("GDRIVE_FOLDER_ID is not set");

// ── auth ─────────────────────────────────────────────────────────────────────
function serviceAccount() {
  const raw = process.env.GDRIVE_SA_KEY;
  if (!raw) throw new Error("GDRIVE_SA_KEY is not set");
  const json = raw.trim().startsWith("{") ? raw : fs.readFileSync(raw, "utf8");
  const key = JSON.parse(json);
  if (!key.client_email || !key.private_key) {
    throw new Error("GDRIVE_SA_KEY is not a service-account key (no client_email/private_key)");
  }
  return key;
}

const b64 = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");

async function accessToken() {
  const key = serviceAccount();
  const now = Math.floor(Date.now() / 1000);
  const claim = {
    iss: key.client_email,
    // Read-only on purpose. This token can never modify Adeela's Drive, so the
    // worst a leaked key can do is read the folder it was shared.
    scope: "https://www.googleapis.com/auth/drive.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64({ alg: "RS256", typ: "JWT" })}.${b64(claim)}`;
  const sig = crypto.createSign("RSA-SHA256").update(unsigned).sign(key.private_key, "base64url");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${unsigned}.${sig}`,
    }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(
      `Drive auth failed (${res.status}): ${body.error_description ?? JSON.stringify(body)}\n` +
        `  If this says "invalid_grant", the key is wrong or the clock is off.\n` +
        `  If the listing later comes back empty, the folder is not shared with\n` +
        `  ${serviceAccount().client_email}.`,
    );
  }
  return body.access_token;
}

// ── listing ──────────────────────────────────────────────────────────────────
async function api(url, token) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
    if (res.ok) return res;
    // 403 here is usually rate limiting, not permission; both are worth a retry
    // before giving up, because a half-mirrored archive publishes a broken site.
    if (![403, 429, 500, 502, 503, 504].includes(res.status)) {
      throw new Error(`${res.status} ${res.statusText} for ${url}\n${await res.text()}`);
    }
    await new Promise((r) => setTimeout(r, 2 ** attempt * 500));
  }
  throw new Error(`gave up after 5 attempts: ${url}`);
}

/** Every file under the folder, with its path relative to the mirror root. */
async function listTree(token) {
  const files = [];
  const queue = [{ id: FOLDER_ID, rel: "" }];
  while (queue.length) {
    const { id, rel } = queue.shift();
    let pageToken = "";
    do {
      const url = new URL("https://www.googleapis.com/drive/v3/files");
      url.searchParams.set("q", `'${id}' in parents and trashed = false`);
      url.searchParams.set("fields", "nextPageToken,files(id,name,mimeType,md5Checksum,size)");
      url.searchParams.set("pageSize", "1000");
      url.searchParams.set("supportsAllDrives", "true");
      url.searchParams.set("includeItemsFromAllDrives", "true");
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const body = await (await api(url, token)).json();
      for (const f of body.files ?? []) {
        const childRel = rel ? `${rel}/${f.name}` : f.name;
        if (f.mimeType === "application/vnd.google-apps.folder") {
          queue.push({ id: f.id, rel: childRel });
        } else if (f.mimeType.startsWith("application/vnd.google-apps.")) {
          console.log(`  skipped (Google Doc, not a file): ${childRel}`);
        } else {
          files.push({ id: f.id, rel: childRel, md5: f.md5Checksum, size: Number(f.size ?? 0) });
        }
      }
      pageToken = body.nextPageToken ?? "";
    } while (pageToken);
  }
  return files.sort((a, b) => a.rel.localeCompare(b.rel));
}

// ── mirror ───────────────────────────────────────────────────────────────────
const md5 = (abs) =>
  new Promise((resolve, reject) => {
    const h = crypto.createHash("md5");
    fs.createReadStream(abs).on("data", (d) => h.update(d)).on("end", () => resolve(h.digest("hex"))).on("error", reject);
  });

async function download(file, token) {
  const abs = path.join(ROOT, file.rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&supportsAllDrives=true`;
  const res = await api(url, token);
  // Write to a temp name and rename, so an interrupted run never leaves a
  // half-file that the next run's checksum test would have to catch.
  const tmp = `${abs}.part`;
  fs.writeFileSync(tmp, Buffer.from(await res.arrayBuffer()));
  fs.renameSync(tmp, abs);
}

const token = await accessToken();
console.log(`→ listing Drive folder ${FOLDER_ID}`);
const remote = await listTree(token);

if (!remote.length) {
  throw new Error(
    `the Drive folder is empty or not visible.\n` +
      `  Share it with ${serviceAccount().client_email} (Viewer is enough)\n` +
      `  and check GDRIVE_FOLDER_ID is the id from the folder's URL.`,
  );
}
console.log(`  ${remote.length} files in Drive`);

fs.mkdirSync(ROOT, { recursive: true });

// What needs fetching: missing locally, or a different checksum.
const todo = [];
for (const f of remote) {
  const abs = path.join(ROOT, f.rel);
  if (!fs.existsSync(abs)) { todo.push(f); continue; }
  if (!f.md5) continue; // no checksum offered — trust what is on disk
  if ((await md5(abs)) !== f.md5) todo.push(f);
}

console.log(`→ ${todo.length} to download, ${remote.length - todo.length} already current`);
let done = 0;
const queue = [...todo];
await Promise.all(
  Array.from({ length: Math.min(CONCURRENCY, queue.length) }, async () => {
    while (queue.length) {
      const f = queue.shift();
      await download(f, token);
      done++;
      if (done % 10 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
    }
  }),
);

// Anything local that Drive no longer has. Without this a folder deleted in
// Drive would live on in the archive, and so on the site, forever.
const keep = new Set(remote.map((f) => path.join(ROOT, f.rel)));
const removed = [];
const sweep = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) {
      sweep(abs);
      if (!fs.readdirSync(abs).length) fs.rmdirSync(abs);
    } else if (!keep.has(abs) && !abs.endsWith(".part")) {
      fs.unlinkSync(abs);
      removed.push(path.relative(ROOT, abs).replace(/\\/g, "/"));
    }
  }
};
sweep(ROOT);
if (removed.length) {
  console.log(`→ ${removed.length} removed (gone from Drive):`);
  for (const r of removed.slice(0, 20)) console.log(`  - ${r}`);
  if (removed.length > 20) console.log(`  … and ${removed.length - 20} more`);
}

fs.mkdirSync(path.dirname(STATE), { recursive: true });
fs.writeFileSync(
  STATE,
  JSON.stringify(
    { folderId: FOLDER_ID, files: remote.map(({ rel, md5: m, size }) => ({ rel, md5: m, size })) },
    null,
    2,
  ) + "\n",
);

console.log(
  `\n✓ archive mirrors Drive — ${remote.length} files, ` +
    `${todo.length} fetched, ${removed.length} removed`,
);
