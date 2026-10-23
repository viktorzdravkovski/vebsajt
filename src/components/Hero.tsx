import { profile } from "../data";

export function Hero() {
  return (
    <section id="top" className="relative pt-28 sm:pt-32">
      <div className="shell flex min-h-[calc(100svh-7rem)] flex-col pb-10 sm:min-h-[calc(100svh-8rem)]">
        <p className="hero-fade text-sm text-muted" style={{ animationDelay: "60ms" }}>
          Software engineer, {profile.years} years in
        </p>

        <h1 className="display mt-5 text-[clamp(3.2rem,12vw,10.5rem)] sm:mt-7">
          <span className="block overflow-hidden pb-[0.09em]">
            <span className="hero-line" style={{ animationDelay: "120ms" }}>
              Boring
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.09em]">
            <span className="hero-line" style={{ animationDelay: "220ms" }}>
              on purpose.
            </span>
          </span>
        </h1>

        <div className="mt-auto grid gap-10 pt-16 md:grid-cols-[minmax(0,1fr)_19rem] md:items-end md:gap-20">
          <p
            className="hero-fade max-w-[54ch] text-lg leading-[1.55] text-ink/80 sm:text-xl"
            style={{ animationDelay: "360ms" }}
          >
            I&apos;m Viktor. For {profile.years} years I&apos;ve designed and run the systems behind
            products: the data model, the failure modes, the parts nobody notices until they break.
            The interesting work is making production uneventful.
          </p>

          <dl className="hero-fade grid gap-2.5 text-sm" style={{ animationDelay: "450ms" }}>
            <div className="flex items-baseline justify-between gap-6 border-t border-line pt-2.5">
              <dt className="text-muted">Focus</dt>
              <dd className="text-right">{profile.focus}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-t border-line pt-2.5">
              <dt className="text-muted">Based</dt>
              <dd className="text-right">{profile.based}</dd>
            </div>
            <div className="flex items-center justify-between gap-6 border-t border-line pt-2.5">
              <dt className="text-muted">Status</dt>
              <dd className="flex items-center gap-2 text-right">
                <span className="status-dot" aria-hidden="true" />
                Open to conversations
              </dd>
            </div>
          </dl>
        </div>

        <div
          className="hero-fade mt-14 flex items-center justify-between border-t border-line pt-4"
          style={{ animationDelay: "540ms" }}
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-ink"
          >
            <span className="relative h-8 w-px overflow-hidden bg-line" aria-hidden="true">
              <span className="scroll-dot absolute inset-x-0 top-0 h-3 bg-electric" />
            </span>
            Scroll to experience
          </a>
        </div>
      </div>
    </section>
  );
}
