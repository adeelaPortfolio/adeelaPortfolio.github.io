"use client";

import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ImageGuard — suppresses right-click "Save image as…" and drag-to-desktop on
// the portfolio artwork.
//
// Be clear about what this is: a deterrent, not protection. Anything a browser
// can display can be saved by someone who wants it badly enough, and no public
// website can change that. The protection that actually matters is upstream —
// the build pipeline caps every image at 1400px, so the print-resolution
// originals (up to 6300 × 14981) are never served at all.
// ─────────────────────────────────────────────────────────────────────────────

export default function ImageGuard() {
  useEffect(() => {
    const block = (e: Event) => {
      if (e.target instanceof HTMLImageElement) e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    return () => {
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
    };
  }, []);

  return null;
}
