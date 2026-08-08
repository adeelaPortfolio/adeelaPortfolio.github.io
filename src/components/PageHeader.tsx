import Reveal from "./Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// PageHeader — the top block for interior pages. Includes the padding needed to
// clear the fixed nav bar.
// ─────────────────────────────────────────────────────────────────────────────

interface Props {
  eyebrow?: string;
  title: string;
  intro?: string;
}

export default function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <header className="container-editorial pt-32 md:pt-40">
      <Reveal className="max-w-4xl">
        {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
        <h1 className="display-xl text-5xl text-ink sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-prose font-body text-lg leading-relaxed text-ink/70">
            {intro}
          </p>
        )}
      </Reveal>
      <div className="rule mt-12" />
    </header>
  );
}
