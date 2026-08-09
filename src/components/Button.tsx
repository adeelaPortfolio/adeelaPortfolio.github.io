import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// Button — editorial link-button in two variants (solid ink / outline).
// Renders an <a> for external and mailto hrefs, a Next <Link> for routes.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
}

const base =
  "inline-flex items-center justify-center px-8 py-3 font-body text-xs uppercase tracking-label transition-colors duration-300";

const variants = {
  solid: "bg-ink text-ivory hover:bg-sepia",
  outline: "border border-ink/30 text-ink hover:border-sepia hover:text-sepia",
};

export default function Button({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  // A mailto is neither a route nor a new tab: target="_blank" on one leaves an
  // empty tab behind once the mail client takes over.
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
