import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TextileGrid from "@/components/TextileGrid";
import Reveal from "@/components/Reveal";
import { textiles } from "@/content/textiles";

export const metadata: Metadata = {
  title: "Textiles",
  description:
    "Surface and print design — engineered panel layouts, repeat patterns and border prints for lawn, viscose and silk.",
};

export default function TextilesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Surface & Material"
        title="Textiles"
        intro="Before a garment exists, there is cloth. These are the prints themselves — engineered to the panel, drawn so the pattern resolves exactly where the suit is cut. Select any piece to read how it was made."
      />

      <section className="container-editorial pt-16 pb-8">
        <Reveal>
          <TextileGrid textiles={textiles} />
        </Reveal>
      </section>
    </>
  );
}
