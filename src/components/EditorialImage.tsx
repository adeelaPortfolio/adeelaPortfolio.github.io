import Image from "next/image";
import type { ImageItem } from "@/content/types";

// ─────────────────────────────────────────────────────────────────────────────
// EditorialImage
//
// Renders a real optimised photo when `item.src` is set, otherwise a tasteful
// vintage placeholder frame. Swapping in a real image is just setting `src`.
//
// Default behaviour is "natural": the frame takes the image's OWN aspect ratio,
// so nothing is ever cropped. Adeela's work is a mix of landscape catalogue
// spreads, portrait plates and square photos, and forcing them all through one
// box cut the sides off her artwork. Cropping now has to be asked for.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  item: ImageItem;
  /** Frame ratio, used only by "cover" and "contain". e.g. "3 / 4", "16 / 9". */
  ratio?: string;
  /** Placeholder tint (CSS colour). */
  tone?: string;
  /** Optional label shown on the placeholder (defaults to alt text). */
  label?: string;
  /** Tailwind classes for the wrapper. */
  className?: string;
  /** next/image sizes hint. */
  sizes?: string;
  /** Prioritise loading (use for above-the-fold images). */
  priority?: boolean;
  /**
   * "natural" — frame matches the image; nothing is cropped or letterboxed.
   * "cover"   — fills `ratio`, cropping the overflow. Banners only.
   * "contain" — fits inside `ratio`, letterboxing. Lightbox and fixed strips.
   */
  fit?: "natural" | "cover" | "contain";
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
  fit = "natural",
}: Props) {
  const hasImage = Boolean(item.src);
  const caption = label ?? item.caption ?? item.alt;

  // Natural mode needs the real dimensions; without them fall back to the frame.
  const natural = fit === "natural" && item.width && item.height;
  const frameRatio = natural ? `${item.width} / ${item.height}` : ratio;
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <div
      className={`relative overflow-hidden ${fit === "contain" ? "" : "bg-cream"} ${className}`}
      style={{ aspectRatio: frameRatio }}
    >
      {hasImage ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={sizes}
          priority={priority}
          draggable={false}
          className={`select-none ${objectFit}`}
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
