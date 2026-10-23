import { useEffect, useState } from "react";
import { navigation, profile } from "../data";

function useActiveSection() {
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;

      if (atBottom) {
        setActive(navigation[navigation.length - 1].href.slice(1));
        return;
      }

      const marker = window.innerHeight * 0.35;
      let current = "";

      for (const item of navigation) {
        const el = document.getElementById(item.href.slice(1));
        if (el && el.getBoundingClientRect().top <= marker) {
          current = item.href.slice(1);
        }
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return active;
}

export function Header() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled ? "border-line bg-bone/85 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 sm:h-20">
        <a
          href="#top"
          className="font-display text-[0.95rem] font-semibold tracking-[-0.02em] sm:text-base"
        >
          {profile.name}
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 text-[0.8125rem] md:flex">
          {navigation.map((item) => {
            const id = item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={active === id ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a href="#contact" className="nav-link text-[0.8125rem] md:hidden">
          Contact
        </a>
      </div>
    </header>
  );
}
