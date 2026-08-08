import type { Swatch } from "@/content/types";

// ─────────────────────────────────────────────────────────────────────────────
// SwatchStrip — a row of fabric / colour chips with names and fibre notes.
// ─────────────────────────────────────────────────────────────────────────────

export default function SwatchStrip({ swatches }: { swatches: Swatch[] }) {
  return (
    <ul className="flex flex-wrap gap-x-8 gap-y-6">
      {swatches.map((s) => (
        <li key={s.name} className="flex items-center gap-4">
          <span
            className="h-12 w-12 flex-none rounded-full border border-ink/10 shadow-inner"
            style={{ backgroundColor: s.color }}
            aria-hidden
          />
          <span className="leading-tight">
            <span className="block font-body text-sm text-ink">{s.name}</span>
            {s.note && (
              <span className="block font-body text-xs italic text-muted">{s.note}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
