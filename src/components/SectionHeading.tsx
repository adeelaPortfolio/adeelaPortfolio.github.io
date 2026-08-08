import Reveal from "./Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// SectionHeading — an editorial heading with an eyebrow kicker and hairline rule.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: Props) {
  const centered = align === "center";
  return (
    <Reveal
      className={`${centered ? "mx-auto text-center" : ""} max-w-prose ${className}`}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {intro && (
        <p className="mt-5 font-body text-lg leading-relaxed text-ink/70">{intro}</p>
      )}
      <div className={`rule mt-8 ${centered ? "mx-auto max-w-[120px]" : "max-w-[120px]"}`} />
    </Reveal>
  );
}
