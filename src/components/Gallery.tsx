"use client";

import { useCallback, useEffect, useState } from "react";
import type { ImageItem } from "@/content/types";
import EditorialImage from "./EditorialImage";

// ─────────────────────────────────────────────────────────────────────────────
// Gallery — a responsive editorial grid of images with a keyboard-navigable
// lightbox. Works with placeholder slots too, so it looks complete pre-launch.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  images: ImageItem[];
  /** Placeholder tone for empty slots. */
  tone?: string;
  /** Columns at the largest breakpoint. */
  columns?: 2 | 3;
  /** Per-image aspect ratio. */
  ratio?: string;
}

export default function Gallery({
  images,
  tone = "#C9B99A",
  columns = 3,
  ratio = "3 / 4",
}: Props) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const show = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + images.length) % images.length,
      ),
    [images.length],
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

  const colClass = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <ul className={`grid grid-cols-1 gap-4 sm:gap-6 ${colClass}`}>
        {images.map((img, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sepia"
              aria-label={`View image: ${img.alt}`}
            >
              <EditorialImage
                item={img}
                ratio={ratio}
                tone={tone}
                /* Eager-load the first row. Lazy-loading everything meant a
                   gallery's first impression was a grid of blank rectangles. */
                priority={i < columns}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-scrim/92 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 font-body text-xs uppercase tracking-label text-white/80 hover:text-white"
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
            className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-6 font-display text-3xl text-white/70 hover:text-white sm:left-8"
            aria-label="Previous image"
          >
            ‹
          </button>

          <figure
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The lightbox exists so the artwork can actually be read, so it
                fits the whole plate rather than re-cropping it. Portrait plates
                and landscape spreads both need to survive this. */}
            <EditorialImage
              item={images[active]}
              ratio="auto"
              tone={tone}
              fit="contain"
              sizes="(max-width: 768px) 100vw, 1024px"
              className="h-[78vh]"
            />
            <figcaption className="mt-4 text-center font-body text-sm italic text-white/70">
              {images[active].caption ?? images[active].alt}
              <span className="ml-3 not-italic text-white/40">
                {active + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-6 font-display text-3xl text-white/70 hover:text-white sm:right-8"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
