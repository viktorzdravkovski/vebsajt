import { experience } from "../data";

export function Experience() {
  return (
    <ol className="border-t border-line">
      {experience.map((entry, index) => (
        <li
          key={index}
          className="grid gap-6 border-b border-line py-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16"
        >
          <div className="text-sm leading-relaxed text-muted tabular-nums">
            <p>{entry.period}</p>
            <p className="mt-1">{entry.location}</p>
          </div>

          <div className="max-w-[64ch]">
            <h3 className="font-display text-2xl font-medium tracking-[-0.025em] sm:text-3xl">
              {entry.role}
            </h3>
            <p className="mt-1 text-base text-muted">
              {entry.companyHref ? (
                <a
                  href={entry.companyHref}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-baseline gap-1 text-ink/85 underline decoration-1 underline-offset-4 decoration-ink/50 transition-colors duration-200 hover:text-electric hover:decoration-electric focus-visible:outline-electric"
                >
                  {entry.company}
                  <span
                    aria-hidden="true"
                    className="text-[0.8em] leading-none no-underline transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </a>
              ) : (
                entry.company
              )}
            </p>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-ink/75">{entry.summary}</p>
            <ul className="mt-5 space-y-2">
              {entry.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                >
                  <span
                    className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-electric"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
