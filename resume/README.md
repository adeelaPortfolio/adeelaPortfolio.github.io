# Resume

Standalone from the website. Nothing here is imported by Next.js, nothing here
deploys — editing these files cannot break the site.

## Files

| File | Role |
|---|---|
| `resume.html` | **Authoritative source.** Edit this; both PDFs are made from it. |
| `adeela-resume.pdf` | Light / print theme. This is the one to send and to print. |
| `adeela-resume-dark.pdf` | Dark theme, matching the reference site. For screen and email. |
| `resume.md` | Plain-text copy for job portals and ATS forms. Kept in sync by hand. |

## One file, two themes

Dark is the default. The stylesheet carries a `:root[data-theme="light"]` override
block, and a three-line inline script sets `data-theme="light"` when the URL ends in
`#light`. So the two PDFs come from the same source with no risk of drift — open
`resume.html` for dark, `resume.html#light` for print.

## Regenerating both PDFs

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$base   = "file:///J:/Cursor%20Projects/Adeela_Portfolio/resume/resume.html"
$out    = "J:\Cursor Projects\Adeela_Portfolio\resume"
& $chrome --headless=new --disable-gpu --user-data-dir="$env:TEMP\chrome-pdf-profile" `
  --virtual-time-budget=8000 --no-pdf-header-footer `
  --print-to-pdf="$out\adeela-resume-dark.pdf" "$base"
& $chrome --headless=new --disable-gpu --user-data-dir="$env:TEMP\chrome-pdf-profile" `
  --virtual-time-budget=8000 --no-pdf-header-footer `
  --print-to-pdf="$out\adeela-resume.pdf" "$base#light"
```

Three things that will silently break this if changed:

- **`--user-data-dir` is required.** Without it Chrome writes no file at all when a
  normal Chrome window is already open, and reports success.
- **`%20`** for the space in "Cursor Projects".
- **`--virtual-time-budget=8000`** — the fonts are a network fetch from Google Fonts,
  and a shorter budget can render before they arrive.

No npm packages, no service, no cost.

## Design

Copied from **https://ahmadzafar005.github.io/**, measured from its live `styles.css`:
A4, numbered `01`/`02` section badges in a bordered pill, uppercase headings whose
last word takes an accent gradient, and a timeline with a
`linear-gradient(accent, transparent)` spine and ringed dots.

The site's violet (`#8b5cf6` → `#a855f7`) is replaced with antique gold. The light
theme uses the portfolio's own tokens from `tailwind.config.ts` — gilt `#A6763E` and
sepia `#7B4A2F`. The dark theme lifts them to `#C08A46` → `#E3B972`, because gilt and
sepia are too dark to read on a near-black background.

Fonts are Space Grotesk and Inter, pulled from Google Fonts at render time and
embedded into the PDF. Neither is installed locally, so the link must stay.

## Print rules

Getting these wrong is what turns a clean 2-page CV into a ragged 3-page one:

- `print-color-adjust: exact` on `html`, or Chrome drops the dark background.
- A whole role is deliberately **not** `break-inside: avoid`. A tall role straddling a
  page boundary gets pushed entire and wastes most of a page. Instead `.tl-period` and
  `.tl-role` are `break-after: avoid` and each `li` is `break-inside: avoid`, so a long
  bullet list may split but a heading is never stranded and no line breaks mid-way.

## Checking a change

Screenshot rather than opening the PDF:

```powershell
& $chrome --headless=new --disable-gpu --user-data-dir="$env:TEMP\chrome-shot-profile" `
  --virtual-time-budget=8000 --hide-scrollbars --force-device-scale-factor=1.15 `
  --window-size=794,2200 --screenshot="$env:TEMP\cv.png" "$base#light"
```

To confirm it still fits two pages, read `/Count` out of the PDF:

```powershell
$b = [System.IO.File]::ReadAllBytes("$out\adeela-resume.pdf")
$s = [System.Text.Encoding]::GetEncoding(28591).GetString($b)
[regex]::Match($s, '/Count\s+(\d+)').Groups[1].Value
```
