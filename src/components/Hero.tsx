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
          fit="cover"
          ratio="16 / 9"
          tone="#8A6A48"
          priority
          sizes="100vw"
          className="h-full w-full"
        />
        {/* Vintage wash for text legibility. The hero is a dense, pale print
            rather than a dark photograph, so this has to carry real weight —
            a light scrim leaves both the wordmark and the nav unreadable. */}
        <div className="absolute inset-0 bg-gradient-to-b from-scrim/65 via-scrim/35 to-scrim/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-scrim/75 via-scrim/25 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-editorial relative flex h-full flex-col items-start justify-end pb-20 md:justify-center md:pb-0">
        <div className="max-w-2xl animate-fade-up">
          <p className="font-body text-xs uppercase tracking-label text-white/80 sm:text-sm">
            {site.role}
          </p>
          <h1 className="display-xl mt-6 text-7xl text-white sm:text-8xl md:text-[8.5rem]">
            {site.name}
          </h1>
          <p className="mt-7 max-w-lg font-display text-xl italic leading-snug text-white/90 sm:text-2xl md:text-3xl">
            {site.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/work" variant="solid">
              View Collections
            </Button>
            <Button
              href="/work/prints-and-cutlines"
              variant="outline"
              className="border-white/40 text-ivory hover:border-white hover:text-white"
            >
              Explore Prints
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue — the hero fills the viewport, so say there is more below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7 hidden justify-center md:flex">
        <span className="font-body text-[0.65rem] uppercase tracking-label text-white/55">
          Scroll
        </span>
      </div>
    </section>
  );
}
