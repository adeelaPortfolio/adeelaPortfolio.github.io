import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-editorial flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow mb-6">Off the Bolt</p>
      <h1 className="font-display text-7xl text-ink sm:text-8xl">404</h1>
      <p className="mt-6 max-w-md font-body text-lg text-ink/70">
        This thread doesn&rsquo;t lead anywhere. The page may have been moved, or the
        link unravelled.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="solid">
          Return Home
        </Button>
        <Button href="/work" variant="outline">
          View Collections
        </Button>
      </div>
    </section>
  );
}
