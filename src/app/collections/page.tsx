import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CollectionRow from "@/components/CollectionRow";
import Reveal from "@/components/Reveal";
import { collections } from "@/content/collections";
import { toneFor } from "@/lib/tones";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Seasonal lawn, pret, semi-formal and bridal collections for Pakistani textile houses, and for her own label.",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Lookbooks"
        title="Collections"
        intro="Nine years of seasonal work, most recent first — from her own bridal label back to the degree collection that won a gold medal. Select one to see the finished pieces and the artwork behind them."
      />

      <section className="container-editorial pt-8 pb-8">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i, 4) * 70}>
            <CollectionRow
              collection={c}
              index={i}
              tone={toneFor(c.slug)}
              priority={i < 3}
            />
          </Reveal>
        ))}
        <div className="rule" />
      </section>
    </>
  );
}
