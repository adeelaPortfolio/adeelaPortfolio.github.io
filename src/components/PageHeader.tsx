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
    <header className="container-editorial pt-28 sm:pt-32 md:pt-40">
      <Reveal className="max-w-4xl">
        {eyebrow && <p className="eyebrow mb-4 sm:mb-5">{eyebrow}</p>}
        {/* Titles are collection names, so they can be a single long word
            ("Semi-Formals"). Cinzel at text-5xl runs past a 312px phone
            column, hence the smaller base step. */}
        <h1 className="display-xl break-words text-4xl text-ink sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-prose font-body text-base leading-relaxed text-ink/70 sm:mt-7 sm:text-lg">
            {intro}
          </p>
        )}
      </Reveal>
      <div className="rule mt-10 md:mt-12" />
    </header>
  );
}
