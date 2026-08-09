import Link from "next/link";
import { site } from "@/content/site";

// ─────────────────────────────────────────────────────────────────────────────
// Footer — contact CTA, quick links, and socials.
//
// There is no /contact page. The mailto below is the site's only contact
// route, so it stays on every page — don't fold it into the quick links.
// ─────────────────────────────────────────────────────────────────────────────

const quickLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards & CV" },
];

export default function Footer() {
  const year = "2026"; // static build; update as needed

  return (
    <footer className="mt-24 border-t border-ink/10 bg-cream/40">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand + CTA */}
          <div>
            <p className="font-display text-2xl text-ink">
              {site.name}
              <span className="text-sepia">.</span>
            </p>
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink/60">
              {site.role} — currently open to studio roles, collaborations, and commissions.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-6 inline-block font-body text-sm text-sepia"
            >
              {site.email}
            </a>
          </div>

          {/* Quick links */}
          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline font-body text-sm text-ink/70 hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials — hidden entirely until real profile links exist. */}
          <div className={site.socials.length ? "" : "hidden"}>
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="space-y-3">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline font-body text-sm text-ink/70 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule mt-14" />
        <div className="mt-6 flex flex-col justify-between gap-2 sm:flex-row">
          <p className="font-body text-xs uppercase tracking-[0.14em] text-muted">
            © {year} {site.fullName}
          </p>
          <p className="font-body text-xs uppercase tracking-[0.14em] text-muted">
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
