"use client";

import { useCallback, useEffect, useState } from "react";
import type { Textile } from "@/content/types";
import EditorialImage from "./EditorialImage";

// ─────────────────────────────────────────────────────────────────────────────
// TextileGrid — cards for standalone surface-design pieces (image + title +
// technique + description), with a lightbox that surfaces the full detail.
// ─────────────────────────────────────────────────────────────────────────────

export default function TextileGrid({ textiles }: { textiles: Textile[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + textiles.length) % textiles.length,
      ),
    [textiles.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(1);
      if (e.key === "ArrowLeft") show(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, show]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {textiles.map((t, i) => (
          <li key={t.title}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sepia"
              aria-label={`View textile: ${t.title}`}
            >
              <div className="overflow-hidden">
                <EditorialImage
                  item={t.image}
                  ratio="1 / 1"
                  tone={t.tone}
                  label={t.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <p className="eyebrow mt-5">{t.technique}</p>
              <h3 className="mt-2 font-display text-2xl text-ink">
                <span className="link-underline">{t.title}</span>
              </h3>
              <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink/60">
                {t.description}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={textiles[active].title}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 font-body text-xs uppercase tracking-label text-ivory/80 hover:text-ivory"
            aria-label="Close"
          >
            Close ✕
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(-1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-6 font-display text-3xl text-ivory/70 hover:text-ivory sm:left-8"
            aria-label="Previous"
          >
            ‹
          </button>

          <figure
            className="grid max-h-[86vh] w-full max-w-4xl grid-cols-1 items-center gap-8 md:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            <EditorialImage
              item={textiles[active].image}
              ratio="1 / 1"
              tone={textiles[active].tone}
              label={textiles[active].title}
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <figcaption className="text-ivory">
              <p className="font-body text-xs uppercase tracking-label text-gilt">
                {textiles[active].technique}
              </p>
              <h3 className="mt-3 font-display text-3xl">{textiles[active].title}</h3>
              <p className="mt-4 font-body leading-relaxed text-ivory/80">
                {textiles[active].description}
              </p>
              <p className="mt-6 font-body text-xs text-ivory/40">
                {active + 1} / {textiles.length}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-6 font-display text-3xl text-ivory/70 hover:text-ivory sm:right-8"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
