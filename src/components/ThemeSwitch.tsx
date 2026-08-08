"use client";

import { useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ThemeSwitch — TEMPORARY comparison scaffolding.
//
// Reads ?theme=noir|jewel|bold and applies it, so all three palettes can be
// reviewed from one static build. Delete this component, its use in layout.tsx,
// and the two losing token blocks in globals.css once a theme is chosen — a
// portfolio should assert one point of view, not offer a menu.
// ─────────────────────────────────────────────────────────────────────────────

const THEMES = new Set(["noir", "jewel", "bold"]);

export default function ThemeSwitch() {
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("theme");
    if (t && THEMES.has(t)) document.documentElement.dataset.theme = t;
  }, []);

  return null;
}
