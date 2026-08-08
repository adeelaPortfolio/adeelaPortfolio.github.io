import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import SwatchStrip from "@/components/SwatchStrip";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { collections, getCollection } from "@/content/collections";
import { toneFor } from "@/lib/tones";

// Pre-render every collection at build time (fully static → free on Vercel).
export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Collection not found" };
  return {
    title: `${c.title} — ${c.season} ${c.year}`,
    description: c.summary,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const tone = toneFor(collection.slug);
  // Landscape catalogue spreads must not be forced through a portrait crop.
  const ratio = collection.ratio ?? "3 / 4";

  // Prev / next for footer navigation.
  const index = collections.findIndex((c) => c.slug === collection.slug);
  const prev = collections[(index - 1 + collections.length) % collections.length];
  const next = collections[(index + 1) % collections.length];

  return (
    <>
      <PageHeader
        eyebrow={`${collection.season} ${collection.year}`}
        title={collection.title}
        intro={collection.summary}
      />

      {/* Concept + materials */}
      <section className="container-editorial pt-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow mb-6">The Concept</p>
            <div className="space-y-5">
              {collection.concept.map((p, i) => (
                <p key={i} className="max-w-prose font-body text-lg leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          {collection.materials?.length ? (
            <Reveal delay={120}>
              <p className="eyebrow mb-6">Materials</p>
              <ul className="space-y-3">
                {collection.materials.map((m) => (
                  <li
                    key={m}
                    className="border-b border-ink/10 pb-3 font-body text-ink/75"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Lookbook */}
      <section className="container-editorial pt-24">
        <SectionHeading
          eyebrow="The Collection"
          title="Lookbook"
          intro="Select any image to view it full-screen; use the arrow keys to move through the collection."
        />
        <div className="mt-12">
          <Gallery images={collection.lookbook} tone={tone} columns={3} ratio={ratio} />
        </div>
      </section>

      {/* Development — print plates, cutlines, research, sketches. Omitted when
          a collection has no development material rather than padded out. */}
      {collection.process?.length ? (
        <section className="container-editorial pt-24">
          <SectionHeading
            eyebrow="Development"
            title="Prints & Development"
            intro="Artwork, engineered layouts, cutlines and research behind the finished pieces."
          />
          <div className="mt-12">
            <Gallery images={collection.process} tone={tone} columns={2} ratio={ratio} />
          </div>
        </section>
      ) : null}

      {/* Swatches */}
      {collection.swatches?.length ? (
        <section className="container-editorial pt-24">
          <SectionHeading eyebrow="Palette & Cloth" title="Fabric Swatches" />
          <Reveal className="mt-12">
            <SwatchStrip swatches={collection.swatches} />
          </Reveal>
        </section>
      ) : null}

      {collection.credit ? (
        <section className="container-editorial pt-16">
          <p className="font-body text-sm italic text-ink/50">{collection.credit}</p>
        </section>
      ) : null}

      {/* Prev / next */}
      <section className="container-editorial pt-24">
        <div className="rule" />
        {/* Prev and next pair up on their own row until there is width for all
            three side by side — collection titles are long enough that a
            three-across row shreds them on a tablet. */}
        <div className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-8 lg:grid-cols-[1fr_auto_1fr]">
          <Link href={`/work/${prev.slug}`} className="group min-w-0">
            <span className="eyebrow">← Previous</span>
            <span className="mt-2 block font-display text-lg text-ink group-hover:text-sepia sm:text-xl md:text-2xl">
              {prev.title}
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group min-w-0 text-right lg:order-last">
            <span className="eyebrow">Next →</span>
            <span className="mt-2 block font-display text-lg text-ink group-hover:text-sepia sm:text-xl md:text-2xl">
              {next.title}
            </span>
          </Link>
          <div className="col-span-2 flex justify-center lg:col-span-1">
            <Button href="/work" variant="outline">
              All Collections
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
