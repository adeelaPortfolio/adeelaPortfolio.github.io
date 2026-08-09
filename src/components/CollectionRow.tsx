import Link from "next/link";
import type { Collection } from "@/content/types";
import EditorialImage from "./EditorialImage";

// ─────────────────────────────────────────────────────────────────────────────
// CollectionRow — a numbered index row: 01 — Title … Season 'YY →
//
// Eight collections in a uniform card grid reads as a catalogue page. As an
// index it reads as a body of work, and it gives the client name and year the
// prominence a recruiter is actually scanning for. The cover image sits behind
// the row and rises on hover, so the page is typographic at rest and image-led
// on interaction.
//
// Below `md` the row folds instead of shrinking: number and season share a
// meta line, and the title takes the full column width underneath. Kept as one
// row, the un-shrinkable season label ("Degree Thesis" at label tracking) ate
// ~120px of a 312px phone column and squeezed the title into four words a line.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  collection: Collection;
  index: number;
  tone?: string;
  priority?: boolean;
}

export default function CollectionRow({ collection, index, tone, priority }: Props) {
  return (
    <Link
      href={`/work/${collection.slug}`}
      className={`group relative block py-7 transition-colors md:py-9 ${
        index === 0 ? "" : "border-t border-ink/15 hover:border-ink/40"
      }`}
    >
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-3 md:flex-nowrap md:gap-x-10">
        <span className="font-display text-lg text-sepia/70 tabular-nums sm:text-xl md:order-1 md:text-2xl">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Season and year. Rides the meta line beside the number on phones,
            returns to its own right-hand column from md.

            Both are optional — a collection discovered in the archive has
            neither until Adeela writes copy for it. The whole block goes rather
            than leaving an empty column pushing the title off its line. */}
        {(collection.season || collection.year) && (
          <div className="ml-auto flex items-baseline gap-3 md:order-3 md:ml-0 md:block md:shrink-0 md:text-right">
            {collection.season && (
              <p className="eyebrow whitespace-nowrap">{collection.season}</p>
            )}
            {collection.year && (
              <p className="font-display text-base text-ink/70 md:mt-2 md:text-xl">
                &rsquo;{collection.year.slice(-2)}
              </p>
            )}
          </div>
        )}

        <div className="order-last w-full min-w-0 md:order-2 md:w-auto md:flex-1">
          <h3 className="display-xl text-3xl text-ink transition-colors group-hover:text-sepia sm:text-4xl lg:text-5xl">
            {collection.title}
          </h3>
          {collection.summary && (
            <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink/60 md:text-base">
              {collection.summary}
            </p>
          )}
        </div>

        <span
          aria-hidden
          className="hidden shrink-0 font-display text-2xl text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sepia md:order-4 md:block"
        >
          &rarr;
        </span>
      </div>

      {/* Cover, revealed on hover.
          • Absolutely positioned so it contributes no height — in flow at
            opacity-0 it reserved ~280px per row and the index read as blank gaps.
          • Sits in the empty margin OUTSIDE the text column (`left-full`), so it
            never covers the title.
          • Width is the margin that actually exists — calc(50vw - 630px) — capped
            at 320px, and only shown from 2xl up, where that margin is wide
            enough to hold it without spilling off screen. */}
      <div className="pointer-events-none absolute left-full top-1/2 hidden w-[clamp(140px,calc(50vw-630px),320px)] -translate-y-1/2 pl-6 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 2xl:block">
        <EditorialImage
          item={collection.cover}
          tone={tone}
          label={collection.title}
          priority={priority}
          sizes="320px"
          className="shadow-2xl shadow-scrim/50 ring-1 ring-gilt/20"
        />
      </div>
    </Link>
  );
}
