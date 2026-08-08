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
      <div className="flex items-baseline gap-5 md:gap-10">
        <span className="font-display text-xl text-sepia/70 tabular-nums md:text-2xl">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="display-xl text-3xl text-ink transition-colors group-hover:text-sepia sm:text-4xl md:text-5xl">
            {collection.title}
          </h3>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-ink/60 md:text-base">
            {collection.summary}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="eyebrow whitespace-nowrap">
            {collection.season}
          </p>
          <p className="mt-2 font-display text-lg text-ink/70 md:text-xl">
            &rsquo;{collection.year.slice(-2)}
          </p>
        </div>

        <span
          aria-hidden
          className="hidden shrink-0 font-display text-2xl text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-sepia sm:block"
        >
          &rarr;
        </span>
      </div>

      {/* Cover, revealed on hover. Absolutely positioned so it contributes no
          height — in flow at opacity-0 it reserved ~280px per row and the index
          read as a column of blank gaps. */}
      <div className="pointer-events-none absolute right-36 top-1/2 hidden w-32 -translate-y-1/2 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 lg:block xl:right-44 xl:w-40">
        <EditorialImage
          item={collection.cover}
          ratio="3 / 4"
          tone={tone}
          label={collection.title}
          priority={priority}
          sizes="180px"
        />
      </div>
    </Link>
  );
}
