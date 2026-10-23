import { useState } from "react";
import { notes, projects } from "../data";

export function Work() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-line">
      {projects.map((project, index) => {
        const open = openIndex === index;
        const panelId = `project-panel-${index}`;
        const triggerId = `project-trigger-${index}`;

        return (
          <article key={index} className="border-b border-line">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-6 py-8 text-left sm:grid-cols-[6rem_minmax(0,1fr)_auto]"
              >
                <span className="hidden pt-2 text-sm tabular-nums text-muted sm:block">
                  {project.year}
                </span>
                <span className="block">
                  <span className="block text-sm tabular-nums text-muted sm:hidden">
                    {project.year}
                  </span>
                  <span
                    className={`mt-1 block font-display text-2xl font-medium tracking-[-0.025em] transition-colors duration-300 sm:mt-0 sm:text-3xl ${
                      open ? "text-electric" : "group-hover:text-electric"
                    }`}
                  >
                    {project.name}
                  </span>
                  <span className="mt-2 block max-w-[56ch] text-sm leading-relaxed text-muted">
                    {project.summary}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative mt-1.5 h-4 w-4 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-[64ch] pb-10 sm:pl-[7.5rem]">
                  <p className="text-[0.975rem] leading-relaxed text-ink/75">{project.detail}</p>

                  <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted">Role</dt>
                      <dd className="mt-1 text-[0.9375rem]">{project.role}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted">Stack</dt>
                      <dd className="mt-1 text-[0.9375rem]">{project.stack.join(", ")}</dd>
                    </div>
                  </dl>

                  {project.links.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-6 text-sm">
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="link-draw text-electric hover:text-ink"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function Notes() {
  return (
    <ul className="border-t border-line">
      {notes.map((note, index) => (
        <li
          key={index}
          className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
        >
          <span className="text-lg font-medium tracking-[-0.01em]">{note.title}</span>
          <span className="text-sm text-muted">{note.meta}</span>
        </li>
      ))}
    </ul>
  );
}
