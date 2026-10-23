import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { profile } from "../data";
import { Reveal } from "./ui";

function MagneticEmail() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.08;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.18;

    setOffset({
      x: Math.max(-10, Math.min(10, x)),
      y: Math.max(-6, Math.min(6, y)),
    });
  }

  function reset() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <a
      ref={ref}
      href={`mailto:${profile.email}`}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onBlur={reset}
      className="underline decoration-1 underline-offset-[0.14em] decoration-ink/30 inline-block max-w-full break-words font-display text-[clamp(1.25rem,2.75vw,1.875rem)] font-medium tracking-[-0.02em] text-ink transition-[color,text-decoration-color,transform] duration-200 ease-out hover:text-electric hover:decoration-electric focus-visible:outline-electric"
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {profile.email}
    </a>
  );
}

export function Contact() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("failed");
    }
  }

  const copyLabel =
    copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy email";

  const buttonClass =
    copyState === "copied"
      ? "border-electric text-electric"
      : copyState === "failed"
        ? "border-line text-muted"
        : "border-line text-ink/80 hover:border-electric/70 hover:text-electric";

  return (
    <section id="contact" className="scroll-mt-24 bg-bone py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="reveal-rule h-px w-full bg-line" />
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-16">
            <h2 className="reveal-heading display text-[clamp(3rem,7.5vw,6rem)]">Let&apos;s talk.</h2>
            <p className="reveal-note max-w-[34ch] text-sm leading-relaxed text-muted md:pb-2">
              If you&apos;re building something that needs to hold, say hello.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-24">
          <div className="min-w-0">
            <MagneticEmail />

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm">
              <button
                type="button"
                onClick={copyEmail}
                className={`cursor-pointer border px-3.5 py-2 transition-colors duration-200 focus-visible:outline-electric ${buttonClass}`}
              >
                {copyLabel}
              </button>
              <p className="flex items-center gap-2.5 text-muted">
                <span className="status-dot" aria-hidden="true" />
                Open to conversations
              </p>
              <span role="status" aria-live="polite" className="sr-only">
                {copyState === "copied"
                  ? "Email address copied to clipboard"
                  : copyState === "failed"
                    ? "Could not copy the address. Use the email link instead."
                    : ""}
              </span>
            </div>
          </div>

          <dl className="grid content-start gap-4 text-sm">
            {profile.socials.map((social) => (
              <div
                key={social.label}
                className="flex items-baseline justify-between gap-6 border-t border-line pt-3"
              >
                <dt className="text-muted">{social.label}</dt>
                <dd className="text-right text-ink/85">
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group -my-1 inline-flex items-baseline gap-1.5 py-1 text-ink underline decoration-1 underline-offset-4 decoration-ink/50 transition-colors duration-200 hover:text-electric hover:decoration-electric focus-visible:outline-electric"
                    >
                      {social.value}
                      <span
                        aria-hidden="true"
                        className="text-[0.85em] leading-none no-underline transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  ) : (
                    social.value
                  )}
                </dd>
              </div>
            ))}
            {profile.phone && (
              <div className="flex items-baseline justify-between gap-6 border-t border-line pt-3">
                <dt className="text-muted">Mobile</dt>
                <dd className="text-right text-ink/85">
                  <a
                    href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                    className="group -my-1 inline-flex items-baseline gap-1.5 py-1 text-ink underline decoration-1 underline-offset-4 decoration-ink/50 transition-colors duration-200 hover:text-electric hover:decoration-electric focus-visible:outline-electric"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
            )}
            <div className="flex items-baseline justify-between gap-6 border-t border-line pt-3">
              <dt className="text-muted">Based</dt>
              <dd className="text-right text-ink/85">{profile.based}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
