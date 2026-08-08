import Link from "next/link";
import Hero from "@/components/Hero";
import SectionHeading from "@/components/SectionHeading";
import CollectionCard from "@/components/CollectionCard";
import EditorialImage from "@/components/EditorialImage";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { collections } from "@/content/collections";
import { textiles } from "@/content/textiles";
import { site } from "@/content/site";
import { toneFor } from "@/lib/tones";

// ─────────────────────────────────────────────────────────────────────────────
// Home — hero, featured collections, the two-pillar (textiles + fashion) split,
// an about teaser, and a closing contact call-to-action.
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featured = collections.slice(0, 3);
  const textilePreview = textiles.slice(0, 3);

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
              href="/collections"
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

      {/* Two-pillar split: Textiles + Fashion */}
      <section className="container-editorial pt-28 md:pt-36">
        <SectionHeading
          eyebrow="Two Disciplines, One Hand"
          title="Textiles & Fashion"
          intro="The cloth and the cut are designed together. Explore the surface work on its own, or see how it becomes a garment."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Reveal>
            <Link href="/textiles" className="group block">
              <EditorialImage
                item={textilePreview[0]?.image ?? { src: "", alt: "Textile detail" }}
                ratio="4 / 3"
                tone={textilePreview[0]?.tone}
                label="Textiles"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="mt-6">
                <p className="eyebrow">Surface & Material</p>
                <h3 className="mt-2 font-display text-3xl text-ink">
                  <span className="link-underline">Textiles</span>
                </h3>
                <p className="mt-3 max-w-md font-body text-ink/65">
                  Digital prints, repeat patterns and engineered panel layouts —
                  drawn for lawn, viscose and printed silk.
                </p>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <Link href="/collections" className="group block">
              <EditorialImage
                item={featured[1]?.cover ?? { src: "", alt: "Garment detail" }}
                ratio="4 / 3"
                tone={toneFor(featured[1]?.slug ?? "")}
                label="Fashion"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div className="mt-6">
                <p className="eyebrow">Silhouette & Construction</p>
                <h3 className="mt-2 font-display text-3xl text-ink">
                  <span className="link-underline">Fashion</span>
                </h3>
                <p className="mt-3 max-w-md font-body text-ink/65">
                  Cutlines, embroidery placement and sample development — the
                  garment built around the print it is cut from.
                </p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Full-bleed print strip — a band of her actual artwork, edge to edge.
          The page is otherwise a centred column, so this breaks the rhythm and
          lets the prints carry a section on their own. */}
      <section className="pt-28 md:pt-36">
        <div className="container-editorial">
          <p className="eyebrow mb-6">Surface Work</p>
        </div>
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <ul className="grid grid-cols-3 gap-px bg-ink/10 md:grid-cols-6">
            {textiles.slice(0, 6).map((t) => (
              <li key={t.title} className="bg-ivory">
                <Link
                  href="/textiles"
                  className="group block overflow-hidden"
                  aria-label={`Textiles — ${t.title}`}
                >
                  <EditorialImage
                    item={t.image}
                    ratio="1 / 1"
                    tone={t.tone}
                    label={t.title}
                    sizes="(max-width: 768px) 33vw, 17vw"
                    className="transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About teaser */}
      <section className="container-editorial pt-28 md:pt-36">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <EditorialImage
              item={site.portrait}
              ratio="4 / 5"
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
