import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Systems, Stack } from "./components/SystemsStack";
import { Work, Notes } from "./components/WorkNotes";
import { CircuitBackground, ScrollProgress, Section } from "./components/ui";
import { profile } from "./data";

function App() {
  return (
    <div className="relative">
      <CircuitBackground />

      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bone focus:outline-electric-soft"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <Header />

        <main id="main" tabIndex={-1} className="focus:outline-none">
          <Hero />

          <Section
            id="experience"
            title="Experience"
            note="Nine years, three companies, and what actually changed because of the work."
          >
            <Experience />
          </Section>

          <Section
            id="systems"
            title="Systems"
            note="The things I make sure to own on every team I join."
          >
            <Systems />
          </Section>

          <Section
            id="stack"
            title="Stack"
            note="The tools I reach for, grouped by the job they do."
          >
            <Stack />
          </Section>

          <Section
            id="work"
            title="Work"
            note="A few projects and the decisions behind them. Open a row for the detail."
          >
            <Work />
          </Section>

          <Section
            id="beyond-work"
            title="Beyond work"
            note="Education, hackathons, and the interests that keep the engine tuned."
          >
            <Notes />
          </Section>

          <Contact />
        </main>

        <footer className="bg-bone">
          <div className="shell flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <a
              href="#top"
              className="link-draw -my-1 inline-block w-fit py-1 transition-colors hover:text-electric focus-visible:outline-electric"
            >
              Back to top
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
