# AGENTS.md

Single-page React portfolio (Vite 6, React 19, TypeScript 5.8, Tailwind CSS v4). No backend,
router, or test suite.

## Commands

- `npm ci` — install from `package-lock.json`.
- `npm run dev` — Vite dev server.
- `npm run build` — `tsc -b && vite build`; this is the only typecheck.
- `npm run lint` — ESLint only. It does **not** typecheck and can pass while the build fails.
- `npm run preview` — serve the production build from `dist/`.
- No test script or test framework is configured; do not invent one.

## Current state: editorial content over a neon scheme board

- `npm run build` and `npm run lint` pass.
- The design keeps the editorial structure (rules, scale, whitespace, Bricolage Grotesque +
  Instrument Sans) but the ground flipped dark: a fixed neon PCB background re-draws the owner's
  hand-sketched fog-light schematic with animated current. Content copy ("Boring on purpose") is
  untouched.
- Content is still largely placeholder data in `src/data.ts`. The layout is not waiting on it.
- `README.md` and `DESIGN.md` describe the current design. `TODO.md` holds the content and
  deployment checklist.

## Architecture and content

- `src/App.tsx` assembles the page: `CircuitBackground`, skip link, `ScrollProgress`, `Header`,
  `Hero`, then `Section` wrappers for Experience, Systems, Stack, Work, and Notes, then the
  standalone `Contact` section. The footer is inside `App.tsx`, not `Contact.tsx`.
- `src/data.ts` is the content source of truth. Exports: `profile`, `experience`, `systems`,
  `stack`, `projects`, `notes`, `navigation`.
- `src/main.tsx` mounts React in `StrictMode`.
- Shared primitives live in `src/components/ui.tsx`: `Reveal`, `Section`, `ScrollProgress`,
  `CircuitBackground`.
- Relative imports only; no path aliases. TypeScript is strict with `verbatimModuleSyntax` (use
  `import type`) and `noUnusedLocals`/`noUnusedParameters`.

## Styling and layout

- Tailwind v4 via `@tailwindcss/vite`; there is no `tailwind.config` file. Design tokens are
  `@theme` variables in `src/index.css`.
- Active color utilities: `bone`, `ink`, `muted`, `line`, `wash`, `electric`, `electric-soft`.
  Tokens are theme-inverted for the dark board: `bone` is the dark ground, `ink` the light text,
  `electric` is neon mint `#32f0b4`. Fonts: `font-sans` (Instrument Sans) and `font-display`
  (Bricolage Grotesque, loaded in `index.html`). There is no monospace by design.
- Custom classes: `.shell`, `.display`, `.prose-measure`, `.link-draw`, `.nav-link`,
  `.status-dot`, plus the hero/reveal and circuit background helpers.
- Do not reintroduce the old drafting-sheet classes (`paper`, `panel`, `blueprint`, `revision`,
  `font-mono`, `text-2xs`, `sheet`, `field-label`, `data-label`, `draft-mark`). They are no longer
  defined, and Tailwind silently ignores unknown classes, so they render unstyled.

## Fixed background and motion

- `CircuitBackground` renders a `fixed inset-0 z-0` layer: a perfboard dot grid, one inline-SVG
  schematic (the fog-light circuit re-drawn PCB-style), and a grain overlay. `App.tsx` wraps all
  content in `relative z-10`. Keep that stacking order or the background will cover the page.
- The contact section and footer have opaque `bg-bone` areas over the fixed background at the
  end of the page, keeping the tail calm while the board drifts elsewhere.
- Background animations are CSS-only: `.circuit-boot` staggers the power-on, `.circuit-pulse`
  runs the dash-offset current pulses, `.circuit-led-glow` alternates Hi/Lo LEDs, blinks on
  `.circuit-via-blink`, and `.circuit-drift` on `.circuit-svg` drifts the board.
- `Reveal` sets `data-inview="true"` through an `IntersectionObserver`; the reveal CSS keys off
  that attribute. Reduced-motion users get the final state immediately.
- All animations are decorative. Keep the `prefers-reduced-motion` overrides at the end of
  `src/index.css` so they win over utility classes.
- The project accordion uses `inert` on closed panels. Keep it; otherwise hidden links stay in
  the tab order.

## Deploy

- `.github/workflows/deploy.yml` runs on pushes to `main` **or** `master`, or manual dispatch:
  Node 22, `npm ci`, `npm run build`, then publishes `dist/` to GitHub Pages. CI does not run lint.
- `vite.config.ts` sets `base: './'`, so the build works at a project URL such as
  `https://<user>.github.io/<repo>/`.
- The local repository currently has no commits and is on `master`. `README.md` recommends
  renaming to `main`, but both branches deploy.
