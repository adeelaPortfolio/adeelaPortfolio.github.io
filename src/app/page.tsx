import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import EditorialImage from "@/components/EditorialImage";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { collections } from "@/content/collections";
import { site } from "@/content/site";
import { toneFor } from "@/lib/tones";

// ─────────────────────────────────────────────────────────────────────────────
// Home — hero, featured work, the two-pillar (print + garment) split, a
// an about teaser, and a closing contact call-to-action.
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featured = collections.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Featured collections */}
      <section className="container-editorial pt-24 md:pt-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Collections"
            intro="Lawn, pret, semi-formal and bridal — nine years of seasonal collections for Pakistani textile houses, and for her own label."
          />
          <Reveal delay={120}>
            <Link
              href="/work"
              className="link-underline font-body text-sm uppercase tracking-[0.14em] text-sepia"
            >
              View all collections →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <Reveal key={c.slug} delay={i * 90}>
              <CollectionCard collection={c} tone={toneFor(c.slug)} priority={i === 0} />
            </Reveal>
          ))}
        </div>
      </section>


      {/* About teaser */}
      <section className="container-editorial pt-28 md:pt-36">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <EditorialImage
              item={site.portrait}
              tone="#9A8A72"
              label="Portrait"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-5">The Designer</p>
            <blockquote className="font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
              &ldquo;{site.statement}&rdquo;
            </blockquote>
            <p className="mt-8 max-w-prose font-body text-ink/70">{site.bio[0]}</p>
            <div className="mt-8">
              <Button href="/about" variant="outline">
                About {site.name}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-editorial pt-28 md:pt-36">
        <Reveal className="border-y border-ink/10 py-20 text-center">
          <p className="eyebrow mb-5">Available for Work</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            Seeking a designer who works from the material outward?
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="solid">
              Get in Touch
            </Button>
            <Button href={site.cvPath} variant="outline" external>
              Download CV
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
