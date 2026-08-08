import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CollectionRow from "@/components/CollectionRow";
import Reveal from "@/components/Reveal";
import { collections, groupedCollections } from "@/content/collections";
import { toneFor } from "@/lib/tones";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Degree thesis, printed textiles and cutlines, silk scarfs, bridal and semi-formal wear by Adeela Amanat.",
};

export default function WorkPage() {
  const groups = groupedCollections();
  // Numbering runs continuously across the groups, so the index reads as one
  // body of work rather than restarting at 01 under every heading.
  let n = 0;

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Work"
        intro="Nine years across printed textiles, bridal and semi-formal wear, opening with the degree collection that won a gold medal. Select one to see it in full."
      />

      <section className="container-editorial pt-4 pb-8">
        {groups.map(({ group, items }) => (
          <div
            key={group}
            id={group.toLowerCase().replace(/\s+/g, "-")}
            className="scroll-mt-28 pt-12 first:pt-4"
          >
            <p className="eyebrow mb-2">{group}</p>

            {items.map((c, i) => {
              const index = n++;
              // Compare against the previous item IN THIS GROUP, not the global
              // running index — otherwise the first item compares with itself
              // and the subgroup heading never renders.
              const showSub = c.subgroup && c.subgroup !== items[i - 1]?.subgroup;
              return (
                <div key={c.slug}>
                  {showSub && (
                    <p className="mt-8 font-body text-xs uppercase tracking-label text-muted">
                      {c.subgroup}
                    </p>
                  )}
                  <Reveal delay={Math.min(index, 4) * 70}>
                    <CollectionRow
                      collection={c}
                      index={index}
                      tone={toneFor(c.slug)}
                      priority={index < 3}
                    />
                  </Reveal>
                </div>
              );
            })}
          </div>
        ))}
        <div className="rule" />

        <p className="mt-8 font-body text-sm italic text-ink/50">
          {collections.length} collections · {" "}
          {collections.reduce((t, c) => t + c.lookbook.length, 0)} images
        </p>
      </section>
    </>
  );
}
