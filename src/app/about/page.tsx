import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EditorialImage from "@/components/EditorialImage";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.fullName} — ${site.role}. Biography, skills, and education.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="The Designer" title={`About ${site.name}`} />

      {/* Portrait + statement */}
      <section className="container-editorial pt-16">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Reveal>
            <EditorialImage
              item={site.portrait}
              tone="#9A8A72"
              label="Portrait"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Reveal>
          <Reveal delay={120}>
            {site.statement && (
              <blockquote className="font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
                &ldquo;{site.statement}&rdquo;
              </blockquote>
            )}
            <div className={`space-y-5 ${site.statement ? "mt-8" : ""}`}>
              {site.bio.map((p, i) => (
                <p key={i} className="max-w-prose font-body text-lg leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills + education */}
      <section className="container-editorial pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="eyebrow mb-6">Capabilities</p>
            <div className="rule mb-8" />
            {/* Bullets are a ::before disc rather than list-disc: these <li>s are
                grid items, and an outside marker hangs into the neighbouring
                column. pl-5 keeps wrapped lines indented past the disc. */}
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {site.skills.map((s) => (
                <li
                  key={s}
                  className="relative pl-5 font-body text-ink/80 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-sepia/70 before:content-['']"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <p className="eyebrow mb-6">Education</p>
            <div className="rule mb-8" />
            <ul className="space-y-8">
              {site.education.map((e) => (
                <li key={e.qualification}>
                  <p className="font-display text-xl text-ink">{e.qualification}</p>
                  <p className="mt-1 font-body text-ink/70">{e.institution}</p>
                  <p className="mt-1 font-body text-sm italic text-muted">{e.years}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-editorial pt-24">
        <Reveal className="border-t border-ink/10 pt-14">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-md font-display text-2xl italic text-ink">
              Interested in working together?
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href={`mailto:${site.email}`} variant="solid">
                Get in Touch
              </Button>
              <Button href={site.cvPath} variant="outline" external>
                Download CV
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
