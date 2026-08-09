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
        {/* Two files, one download. Below md the panel is served upright: the
            banner is 2.18:1, and a portrait viewport crops that to a strip of
            trellis with the arch and the vase cut away. Upright it is 0.459
            against a phone hero box of ~0.49, so the artwork survives nearly
            whole. The breakpoint matches Tailwind's `md`. */}
        <EditorialImage
          item={site.heroImage}
          sources={
            site.heroImagePortrait
              ? [{ media: "(max-width: 767px)", src: site.heroImagePortrait.src }]
              : []
          }
          fit="cover"
          ratio="16 / 9"
          tone="#8A6A48"
          priority
          sizes="100vw"
          className="h-full w-full"
        />
        {/* Vintage wash for text legibility. Kept light on purpose: the banner
            is the print panel turned on its side, and its left half is already
            a dark damask arch, so the wordmark has contrast without help. The
            weight that is here is aimed at the two places that don't — the nav
            over the flowers top-right, and the scroll cue at the foot. */}
        {/* Below md the weight moves to the foot, because the layout does: the
            text sits at the bottom of a portrait panel whose left edge is border
            and flowers, not the dark arch the left-to-right wash was drawn for.
            Dimming that edge on a phone hides the artwork the hero exists to
            show. */}
        <div className="absolute inset-0 bg-gradient-to-b from-scrim/40 via-transparent to-scrim/50" />
        {/* Phones only: the text sits at the foot of a portrait panel, so the
            weight goes there and the top two-fifths — the arch and the vase —
            stay clear. A whole-height wash bright enough to read over flattened
            the artwork the hero exists to show. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-scrim/[0.92] via-scrim/65 to-transparent md:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-scrim/85 via-scrim/45 to-scrim/5 md:block" />
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
          {/* Adeela's two top-level categories. Both solid, so neither reads as
              the secondary option. */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/work/thesis" variant="solid">
              Thesis
            </Button>
            <Button href="/work#my-work" variant="solid">
              My Work
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
