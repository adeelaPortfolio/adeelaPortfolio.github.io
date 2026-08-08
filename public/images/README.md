# Where images go

Drop real photography here, then point the content files at it. Until a file
exists, the site shows a tasteful vintage placeholder automatically — nothing breaks.

## Folder layout

```
public/images/
├── hero.jpg                      → site.heroImage.src = "/images/hero.jpg"
├── portrait.jpg                  → site.portrait.src   = "/images/portrait.jpg"
├── collections/
│   └── <slug>/                   (slug matches src/content/collections.ts)
│       ├── cover.jpg
│       ├── look-01.jpg … look-06.jpg
│       ├── mood-01.jpg …
│       └── sketch-01.jpg …
└── textiles/
    └── mulberry-jacquard.jpg …
```

## How to swap a placeholder for a real photo

1. Save the image into the right folder above.
2. Open the matching content file in `src/content/` and set the `src`:
   ```ts
   cover: { src: "/images/collections/sericulture/cover.jpg", alt: "…" }
   ```
3. Keep the `alt` text descriptive — it matters for accessibility and SEO.

## Recommended sizes / ratios

| Use            | Ratio | Suggested width |
|----------------|-------|-----------------|
| Hero           | wide  | 2400 px         |
| Collection cover / lookbook | 3:4 (portrait) | 1200 px |
| Mood board     | 4:5   | 1000 px         |
| Textile pieces | 1:1 (square)  | 1200 px  |
| Portrait       | 4:5   | 1000 px         |

Export as JPG (photos) or WebP. Next.js optimises them automatically.
