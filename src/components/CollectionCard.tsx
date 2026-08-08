import Link from "next/link";
import type { Collection } from "@/content/types";
import EditorialImage from "./EditorialImage";

// ─────────────────────────────────────────────────────────────────────────────
// CollectionCard — cover image + season/title, links to the collection detail.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  collection: Collection;
  /** Placeholder tone for the cover. */
  tone?: string;
  priority?: boolean;
}

export default function CollectionCard({ collection, tone, priority = false }: Props) {
  return (
    <Link href={`/work/${collection.slug}`} className="group block">
      <div className="overflow-hidden">
        <EditorialImage
          item={collection.cover}
          tone={tone}
          label={collection.title}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5">
        <p className="eyebrow">
          {collection.season} &rsquo;{collection.year.slice(-2)}
        </p>
        <h3 className="mt-2 font-display text-2xl text-ink">
          <span className="link-underline">{collection.title}</span>
        </h3>
        <p className="mt-2 max-w-sm font-body text-sm leading-relaxed text-ink/60">
          {collection.summary}
        </p>
      </div>
    </Link>
  );
}
