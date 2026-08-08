import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Awards & CV",
  description: `Awards, thesis and research work by ${site.fullName}, with a downloadable CV.`,
};

export default function AwardsPage() {
  // Newest first.
  const items = [...site.press].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Awards & CV"
        intro="Gold medals, thesis and research work from her training at the University of South Asia. A full curriculum vitae is available to download."
      />

      {/* CV download */}
      <section className="container-editorial pt-14">
        <Reveal className="flex flex-col items-start justify-between gap-6 bg-cream/50 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="eyebrow mb-3">Curriculum Vitae</p>
            <p className="font-display text-2xl text-ink">
              {site.fullName} — full CV
            </p>
            <p className="mt-2 font-body text-sm text-ink/60">
              Education, experience, and technical skills (PDF).
            </p>
          </div>
          <Button href={site.cvPath} variant="solid" external>
            Download CV
          </Button>
        </Reveal>
      </section>

      {/* Press list */}
      <section className="container-editorial pt-20 pb-8">
        <p className="eyebrow mb-8">Awards &amp; Recognition</p>
        <ul>
          {items.map((p, i) => (
            <Reveal key={`${p.title}-${p.year}`} delay={(i % 4) * 60}>
              <li className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t border-ink/10 py-7 sm:grid-cols-[80px_1fr_auto]">
                <span className="font-display text-xl text-sepia">{p.year}</span>
                <div>
                  <p className="font-display text-xl text-ink sm:text-2xl">
                    {p.href ? (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="link-underline"
                      >
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </p>
                  {p.detail && (
                    <p className="mt-1 font-body text-sm italic text-ink/60">{p.detail}</p>
                  )}
                </div>
                <span className="col-span-2 font-body text-xs uppercase tracking-label text-muted sm:col-span-1 sm:text-right">
                  {p.kind}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
        <div className="rule mt-2" />
      </section>
    </>
  );
}
