import { site } from "@/content/site";
import Button from "./Button";
import EditorialImage from "./EditorialImage";

// ─────────────────────────────────────────────────────────────────────────────
// Hero — full-viewport opening: a striking image with the wordmark, role, and
// tagline layered over a soft vintage wash.
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
      {/* Background image / placeholder */}
      <div className="absolute inset-0">
        <EditorialImage
          item={site.heroImage}
          ratio="16 / 9"
          tone="#8A6A48"
          priority
          sizes="100vw"
          className="h-full w-full"
        />
        {/* Vintage wash for text legibility. The hero is a dense, pale print
            rather than a dark photograph, so this has to carry real weight —
            a light scrim leaves both the wordmark and the nav unreadable. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/40 to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-editorial relative flex h-full flex-col items-start justify-end pb-20 md:justify-center md:pb-0">
        <div className="max-w-2xl animate-fade-up">
          <p className="font-body text-sm uppercase tracking-label text-ivory/85">
            {site.role}
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[0.95] text-ivory sm:text-7xl md:text-8xl">
            {site.name}
          </h1>
          <p className="mt-6 max-w-lg font-display text-xl italic text-ivory/90 sm:text-2xl">
            {site.tagline}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/collections" variant="solid">
              View Collections
            </Button>
            <Button
              href="/textiles"
              variant="outline"
              className="border-ivory/40 text-ivory hover:border-ivory hover:text-ivory"
            >
              Explore Textiles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
