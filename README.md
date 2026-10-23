# Viktor Zdravkovski — portfolio

A single-page portfolio with an editorial, type-led design over a dark neon PCB: the fixed
background re-draws a hand-sketched automotive fog-light schematic, with current pulses running
the traces, Bricolage Grotesque headlines, and one neon accent. Built with React, TypeScript,
Vite, and Tailwind CSS v4.

The copy is deliberately quiet. The board hums underneath.

## Run locally

```bash
npm ci
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

`npm run build` runs `tsc -b && vite build`; it is the only typecheck. `npm run lint` runs ESLint
and does not typecheck. There is no test suite.

## Edit the content

All copy and placeholder data live in **`src/data.ts`**. You should not need to touch layout
files to fill the page in.

| What | Export |
| --- | --- |
| Name, role, focus, years, location, email, socials | `profile` |
| Work history | `experience` |
| The systems statement and capability notes | `systems` |
| Technology groups | `stack` |
| Projects and their detail panels | `projects` |
| Talks and writing | `notes` |
| Header navigation | `navigation` |

Every value in square brackets is a placeholder. Search for `[` in the file to find them all.
Delete rows you do not need — the sections render whatever is in the arrays.

Hero copy, section notes, and contact copy are real sentences written as a starting voice.
Rewrite them so they sound like you.

## Structure

```text
src/
  App.tsx                 page assembly, skip link, footer
  data.ts                 all content
  index.css               tokens, fixed background, motion helpers
  components/
    Header.tsx            fixed header + active-section nav
    Hero.tsx              headline, intro, meta rows
    Experience.tsx        work history
    SystemsStack.tsx      systems notes + stack groups
    WorkNotes.tsx         project accordion + notes list
    Contact.tsx           contact block, copy email, socials
    ui.tsx                Reveal, Section, ScrollProgress, CircuitBackground
public/
  favicon.svg
  og-image.png            social preview card
```

## Design and behaviour

- The background is a fixed circuit-board layer behind the content: a perfboard dot grid plus an
  inline SVG re-drawing of the hand-sketched fog-light schematic (a +12V rail, hi-beam and fog
  switches, three MOSFETs, gate resistors, SB560 clamp diodes, a hatched fog-light module with
  Hi/Lo LEDs, vias, and a silkscreen BOM column).
  It stays put while the page scrolls. The contact section and footer sit on an opaque stretch of
  the board ground at the end.
- Motion is limited to the hero entrance, section reveals, the board's boot sequence, current
  pulses and LED glow in the background, the scrolling progress bar, the active nav underline,
  hover/focus underlines, the project accordion, and the magnetic contact email.
  `prefers-reduced-motion` disables it.
- Projects use a real accordion: `aria-expanded` / `aria-controls`, one panel open at a time,
  and `inert` on closed panels.
- The copy-email button reports success or failure through an `aria-live` status.
- The fixed background and the content layers are separated (`z-0` / `z-10`); keep the content
  wrapper above the background when editing `App.tsx`.

The longer rationale is in `DESIGN.md`. Outstanding content and deployment tasks are in
`TODO.md`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds with Node 22 and publishes `dist/` on every
push to `main` or `master`, or on manual dispatch.

1. Push this repository to GitHub.
2. Open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or `master`), or run the workflow manually from the Actions tab.

The local branch is currently `master`; `main` is the better long-term default:

```bash
git branch -m master main
```

`vite.config.ts` sets `base: './'`, so the build works at a project URL such as
`https://<user>.github.io/<repo>/` without further configuration. It also works at a user or
organization site root.

For a custom domain, add a `public/CNAME` file containing the domain and configure it under
**Settings → Pages → Custom domain**.

## Notes

- Fonts load from Google Fonts: Bricolage Grotesque and Instrument Sans, linked in `index.html`.
  To self-host, change the `<link>` tags and the `--font-sans` / `--font-display` tokens in
  `src/index.css`.
- The design tokens are `@theme` variables in `src/index.css`; there is no `tailwind.config`.
- The accent is `electric` (`#32f0b4`, neon mint) and is used for interactive or status elements
  plus the background current pulses. Tokens are theme-inverted for the dark board: `bone` is the
  dark ground and `ink` the light text, so class names read the same as ever.
- `public/og-image.png` is the social preview card. The meta tags in `index.html` use relative
  URLs so the build keeps working at any GitHub Pages path; switch them to absolute URLs if a
  crawler does not resolve them.
- The footer year is computed at build/runtime, so it does not need updating.
