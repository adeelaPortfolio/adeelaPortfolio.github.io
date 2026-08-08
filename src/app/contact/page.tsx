import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EditorialImage from "@/components/EditorialImage";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import manifest from "@/content/image-manifest.json";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.fullName} for studio roles, collaborations, and commissions.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say Hello"
        title="Contact"
        intro="Open to senior design roles with textile houses, as well as collaborations and private commissions. The quickest way to reach me is by email."
      />

      <section className="container-editorial pt-16 pb-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <Reveal>
            {/* Email */}
            <p className="eyebrow mb-4">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-display text-3xl text-ink sm:text-4xl"
            >
              {site.email}
            </a>

            {/* Socials — hidden entirely until real profile links exist. */}
            <p className={`eyebrow mb-4 mt-14 ${site.socials.length ? "" : "hidden"}`}>
              Elsewhere
            </p>
            <ul className="space-y-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline font-display text-2xl text-ink"
                  >
                    {s.label}
                    <span className="ml-3 align-middle font-body text-xs uppercase tracking-label text-muted">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Location + availability */}
            <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-3">Based In</p>
                <p className="font-body text-lg text-ink/80">{site.location}</p>
              </div>
              <div>
                <p className="eyebrow mb-3">Availability</p>
                <p className="font-body text-lg text-ink/80">
                  Open to senior design roles now
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <EditorialImage
              item={{
                ...manifest.collections.bridal.cover,
                alt: "Detail of hand-embroidered bridal work",
              }}
              tone="#8A6A5A"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
