# Publishing from Google Drive

The site rebuilds itself from a Drive folder every night. Add a folder of images
in Drive and it becomes a collection on `/work`. Add images to a folder already
there and they join that gallery, in the folder's own order. Delete a folder and
it comes off the site.

Nothing runs on anyone's laptop. `.github/workflows/sync-drive.yml` does it at
**02:20 UTC** daily, and can be run on demand from the Actions tab.

**This is free.** Actions minutes are unlimited on public repositories, the Drive
API costs nothing at this volume, and no Google Cloud billing account is needed.

---

## One-time setup

You need two repository secrets. Everything below happens once.

### 1. A service account for the workflow to read Drive as

A service account is a robot Google account with its own email address. It can
only see what you explicitly share with it.

1. Go to <https://console.cloud.google.com/> and create a project — any name.
   You do **not** need to enable billing.
2. **APIs & Services → Library → Google Drive API → Enable.**
3. **APIs & Services → Credentials → Create credentials → Service account.**
   Give it a name like `portfolio-sync`. Skip the optional role and user steps.
4. Open the service account → **Keys → Add key → Create new key → JSON.**
   A `.json` file downloads. **This file is the credential — treat it like a
   password.** It is the only copy; Google will not show it again.
5. Note the service account's email address, which looks like
   `portfolio-sync@your-project.iam.gserviceaccount.com`.

### 2. Share the Drive folder with it

In Drive, right-click the archive folder → **Share** → paste the service account
email → **Viewer** → Send. (Ignore the warning that it isn't a Google account.)

Viewer is deliberate. The workflow requests a **read-only** token, so even a
leaked key cannot change or delete anything in Drive.

### 3. Copy the folder id

Open the folder in Drive and take the id out of the URL:

```
https://drive.google.com/drive/folders/1ep8kqIvZ3zaWmJxBRJ-12gNa9SXDXYdY
                                       └──────────── this ─────────────┘
```

### 4. Put both into the repository

**Settings → Secrets and variables → Actions → New repository secret**, twice:

| Name | Value |
|------|-------|
| `GDRIVE_SA_KEY` | the entire contents of the JSON key file, pasted whole |
| `GDRIVE_FOLDER_ID` | the id from the URL |

### 5. Run it once by hand

**Actions → Sync from Drive → Run workflow.** Tick **dry run** for the first go:
it mirrors and builds but does not commit or deploy, so you can read the log
before anything is published.

If it works, run it again without dry run.

---

## What the folder should look like

The archive root holds category folders; folders of images inside them become
collections:

```
Adeela portfolio Data/
├── Bridal/
│   ├── Bridal 1/        ─┐ merged into one collection
│   └── Bridal 2/        ─┘ (tools/sources.mjs says so)
├── Final thesis/
│   └── Thesis Portfolio/   → /work/thesis        group "Thesis"
├── My Work/
│   ├── Prints & Cutlines/  → /work/prints-and-cutlines
│   ├── Scarfs/             → /work/silk-scarves
│   ├── Semi Formals/       → /work/semi-formals
│   └── Inventive Clothing/ → /work/inventive-clothing
└── Portrait/               → not a collection (named in `notCollections`)
```

**Any folder of images that isn't listed in `tools/sources.mjs` still gets
published**, using the folder's name as the title and the top-level folder as
the group heading. That is the point: a new folder needs no code.

**Number your files in the order you want them shown.** `1, 2, 3…` and
`01, 02, 03…` both work — the sort is numeric, so `10` comes after `9`.

---

## What a brand-new collection looks like before you describe it

Just its name and its pictures:

```
07  KIDS WEAR                                    →
─────────────────────────────────────────────────
```

No season, no year, no summary — the layout omits all three rather than
inventing them. To give it words, add an entry to
`src/content/collection-copy.ts`. Every field is optional.

---

## Things worth knowing

- **Images go live unreviewed.** That is the trade for full automation. The
  Actions run summary flags every new collection with a reminder to check it for
  faces, third-party names, Instagram handles and phone numbers. The existing
  crops in `tools/sources.mjs` only cover files that were already there.
- **The nightly run does nothing when nothing changed.** It compares checksums,
  makes no commit, and does not deploy.
- **There is a 45 MB ceiling** on the published image set (`BUDGET_MB` in
  `tools/build-images.mjs`); it currently sits at ~40 MB. Past that the run fails
  rather than deploying a slow site — a red cross in Actions, and the new folder
  will not appear until image counts come down.
- **Deleting in Drive deletes from the site.** The mirror removes local files
  that are gone from Drive. This is intentional, and it is why the service
  account has read-only access: the sync can never damage the Drive folder
  itself.
- **Google Docs, Sheets and Slides are skipped**, not exported. Only real image
  files are mirrored.
- **To run the same thing locally**, point the pipeline at any folder:
  `ARCHIVE_ROOT="G:/My Drive/Adeela portfolio Data" npm run publish`
