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

  // Masonry: images keep their own aspect ratios, so a fixed grid would leave
  // ragged gaps. CSS columns tile mixed heights without cropping anything.
  const colClass = columns === 2 ? "sm:columns-2" : "sm:columns-2 lg:columns-3";

  return (
    <>
      <ul className={`columns-1 gap-4 sm:gap-6 ${colClass}`}>
        {images.map((img, i) => (
          <li key={i} className="mb-4 break-inside-avoid sm:mb-6">
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-sepia"
              aria-label={`View image: ${img.alt}`}
            >
              <EditorialImage
                item={img}
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
          className="fixed inset-0 z-[100] flex items-center justify-center overscroll-contain bg-scrim/92 p-3 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-2 top-2 p-3 font-body text-xs uppercase tracking-label text-white/80 hover:text-white sm:right-4 sm:top-4"
            aria-label="Close"
          >
            Close ✕
          </button>

          <figure
            className="w-full max-w-5xl sm:px-12"
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
              className="h-[62vh] sm:h-[74vh]"
            />
            {/* Letterboxing means the box is usually taller than the artwork
                inside it, so on a phone the caption is pinned above the control
                bar instead of hanging off the bottom of that empty space. */}
            <figcaption className="absolute inset-x-0 bottom-[4.5rem] px-5 text-center font-body text-sm italic text-white/70 sm:static sm:mt-4 sm:px-0">
              {images[active].caption ?? images[active].alt}
              <span className="ml-3 not-italic text-white/40">
                {active + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          {/* Paging controls. On a phone there is no room beside the plate, so
              they sit in a bar underneath it; from sm they return to the sides.
              The bar itself stays click-through, so tapping past a control
              still dismisses the viewer. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2 flex items-center justify-center gap-10 sm:inset-y-0 sm:bottom-auto sm:justify-between sm:gap-0 sm:px-1 md:px-5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                show(-1);
              }}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center font-display text-3xl leading-none text-white/70 hover:text-white"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                show(1);
              }}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center font-display text-3xl leading-none text-white/70 hover:text-white"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
