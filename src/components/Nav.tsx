"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

// ─────────────────────────────────────────────────────────────────────────────
// Nav — sticky editorial top bar with a wordmark, desktop links, and a mobile
// drawer. Turns from transparent to solid ivory once the page is scrolled.
// ─────────────────────────────────────────────────────────────────────────────

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards & CV" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Only the home page opens on a full-bleed dark hero. Everywhere else the
  // top of the page is ivory, so the default ink text is correct there.
  const onDark = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-ink/10 bg-ivory/90 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-editorial flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className={`font-display text-xl tracking-wide sm:text-2xl ${
            onDark ? "text-white" : "text-ink"
          }`}
          aria-label={`${site.name} — home`}
        >
          {site.name}
          <span className={onDark ? "text-gilt" : "text-sepia"}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`link-underline font-body text-sm uppercase tracking-[0.14em] transition-colors ${
                    onDark
                      ? "text-white/85 hover:text-white"
                      : active
                        ? "text-sepia"
                        : "text-ink/75 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-6">
            <span
              className={`absolute left-0 top-0 h-px w-6 transition-transform duration-300 ${
                onDark ? "bg-white" : "bg-ink"
              } ${open ? "translate-y-[6px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-px w-6 transition-transform duration-300 ${
                onDark ? "bg-white" : "bg-ink"
              } ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-ink/10 bg-ivory md:hidden ${
          open ? "max-h-96" : "max-h-0"
        } transition-[max-height] duration-500 ease-in-out`}
      >
        <ul className="container-editorial flex flex-col gap-1 py-4">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block py-3 font-body text-sm uppercase tracking-[0.14em] ${
                    active ? "text-sepia" : "text-ink/80"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
