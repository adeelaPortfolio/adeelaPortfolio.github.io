import Image from "next/image";
import type { ImageItem } from "@/content/types";

// ─────────────────────────────────────────────────────────────────────────────
// EditorialImage
//
// Renders a real optimised photo when `item.src` is set, otherwise a tasteful
// vintage placeholder frame carrying the image's label. This is what lets the
// whole site look finished before any real photography exists — swapping in a
// real image is just setting the `src` field in the content files.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  item: ImageItem;
  /** CSS aspect-ratio, e.g. "3 / 4", "4 / 5", "1 / 1", "16 / 9". */
  ratio?: string;
  /** Placeholder tint (CSS colour). */
  tone?: string;
  /** Optional label shown on the placeholder (defaults to alt text). */
  label?: string;
  /** Tailwind classes for the wrapper. */
  className?: string;
  /** next/image sizes hint. */
  sizes?: string;
  /** Prioritise loading (use for above-the-fold hero images). */
  priority?: boolean;
  /**
   * "cover" crops to fill the frame (right for uniform grids); "contain" fits
   * the whole image inside it (right for the lightbox, where cropping a print
   * plate would hide the artwork the viewer clicked to see).
   */
  fit?: "cover" | "contain";
}

/** Slightly darken a hex colour for the placeholder's inner frame. */
function shade(hex: string, amount = 0.14): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  const r = Math.max(0, Math.round(((num >> 16) & 255) * (1 - amount)));
  const g = Math.max(0, Math.round(((num >> 8) & 255) * (1 - amount)));
  const b = Math.max(0, Math.round((num & 255) * (1 - amount)));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function EditorialImage({
  item,
  ratio = "3 / 4",
  tone = "#C9B99A",
  label,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fit = "cover",
}: Props) {
  const hasImage = Boolean(item.src);
  const caption = label ?? item.caption ?? item.alt;

  return (
    <div
      className={`relative overflow-hidden ${fit === "contain" ? "" : "bg-cream"} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {hasImage ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className={`select-none ${fit === "contain" ? "object-contain" : "object-cover"}`}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(145deg, ${tone} 0%, ${shade(tone, 0.22)} 100%)`,
          }}
          role="img"
          aria-label={item.alt}
        >
          {/* Inset antique frame */}
          <div className="absolute inset-3 border border-white/20" />
          <div className="absolute inset-3 border border-black/10" style={{ margin: "3px" }} />
          <span className="px-6 text-center font-body text-[0.7rem] uppercase tracking-label text-white/85">
            {caption}
          </span>
          <span className="absolute bottom-3 right-4 font-display text-xs italic text-white/50">
            image forthcoming
          </span>
        </div>
      )}
    </div>
  );
}
