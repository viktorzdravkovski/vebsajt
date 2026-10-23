# Portfolio design: the fog-light board

## Subject, audience, job

- **Subject:** a software engineer with ten years across systems, platform, and product work.
- **Audience:** engineering leads and technical recruiters who are skimming for depth.
- **Job:** make the work legible in thirty seconds and worth reading for three minutes.

The page should read like a working engineer wrote it, not like a portfolio template dressed up
as an engineering document.

## Direction

Editorial and type-led, printed on a board instead of on paper. The fixed background is a dark
PCB carrying a neon re-drawing of a hand-sketched automotive fog-light schematic — the joke being
that a page titled "Boring on purpose" runs on a board full of live current. The structure still
comes from rules, scale, and whitespace; the circuit is scenery, not content.

## Color

Design tokens live in `src/index.css`. The semantic names were kept and the values inverted for
the dark board (`bone` is now the board ground and `ink` the light silkscreen color), so class
names across components did not have to change.

| Token | Value | Use |
| --- | --- | --- |
| `bone` | `#0a1210` | Board ground; near-black green |
| `ink` | `#eaf6ee` | Light silkscreen text |
| `muted` | `#8fa89b` | Secondary text |
| `line` | `#20302a` | Hairline rules on dark |
| `wash` | `#0f1a16` | Subtle fills if needed |
| `electric` | `#32f0b4` | Neon mint: links, active nav, pulses, stars of the show |
| `electric-soft` | `#0d9e7b` | Deep accent for light grounds (the skip-link chip) |

The contact section sits on an opaque stretch of the board ground, and the footer runs dark
below it: the page closes on the board, not on an inverted block. No gradients on UI elements,
no second accent, no tinted cards.

## Type

- **Bricolage Grotesque** (`font-display`) for the hero, section headings, project names, and the
  contact email. Tight tracking, heavy optical sizes, large scale.
- **Instrument Sans** (`font-sans`) for body copy, labels, metadata, and the silkscreen text on
  the board.
- **No monospace.**

The display scale is fluid: the hero runs from roughly 3.2rem to 10.5rem, section headings from
2.8rem to 5.25rem. Body copy stays between 15px and 20px with a 62ch measure.

## Layout

- Single column, max width 1440px, generous side padding via `.shell`.
- Each section opens with a full-width hairline, then a large heading on the left and a short
  note on the right. Content sits below that rule.
- Experience and project rows are hairline-separated; no cards, no shadows, no rounded panels.
- The contact section sits on an opaque stretch of the board ground and the footer runs dark, so
  the page ends on the board rather than on an inverted block. No gradients on UI elements, no
  second accent, no tinted cards.
- Mobile collapses the two-column section header, the experience meta column, and the stack grid.
  Nothing relies on hover.

## Background

`CircuitBackground` is a fixed layer at `z-0`; the content wrapper is `relative z-10`. It holds:

- a faint perfboard dot grid across the viewport,
- an inline SVG `viewBox 900×1200` anchored top-right and cropped by it: the hand-drawn schematic
  re-drawn PCB-style — a `+12V` rail, hi-beam and fog switches with tilted blades, the 1kΩ and
  12Ω resistors as silk boxes, three MOSFET silkscreen circles with gate/channel glyphs and
  G/D/S pin letters, SB560 clamp diodes, a hatched fog-light module with Hi/Lo LED symbols,
  copper vias, junction pads, ground hatching, and a BOM column (`T1 : 2N7000`, `T2 : IRF4905`,
  `T3 : IRF1404`, `D1,2 : SB560`),
- a grain overlay on top (screen blend now that the ground is dark).

The board is anchored to the right edge; line work is faint so it reads as scenery under the
reading column. It does not scroll with the page. The contact section and footer sit on opaque
board-ground areas at the end, so the page closes on the board rather than on an inverted block.

## Motion and interaction

Circuit motion (all decorative, all CSS):

- **Boot**: the board powers on in five staggered groups — rail, traces, components, silkscreen,
  pulses — fading in over roughly a second.
- **Current pulses**: nine neon dashes travel the trace network with `pathLength` dash-offset
  animation, staggered durations and delays, each with a glow.
- **LED glow**: the Hi and Lo LED symbols breathe in opposition every 3.6s.
- **Via sparkle**: four vias blink on long offset schedules.
- **Drift**: the whole board drifts subtly over 90 seconds.

Page motion is unchanged: hero lines rise, section rules scale in, headings lift, the scroll
progress bar runs, the accordion stays accessible (`aria-expanded` / `controls` / `inert`
panels), the contact email leans toward the pointer, links draw their underlines, and the status
dot pulses. The contact links — display email and the GitHub/LinkedIn values — carry a
persistent hairline underline (`decoration-ink/30`) that shifts color on hover, so they read as
links at rest.

All motion is disabled or reduced for users who ask for less: `prefers-reduced-motion` freezes
the board into a static, faintly lit schematic with dotted live traces.

## Accessibility

- Focus rings are neon electric across the dark board; the skip-link chip (a light ground) uses
  electric-soft.
- A skip link is the first tab stop.
- Contrast holds for body and secondary text on the dark board; selection is neon with
  board-colored text.
- The accordion is keyboard operable and does not hide focusable content in closed panels.
- Tap targets are at least 24px; the skip link is intentionally hidden until focused.
- The page has no horizontal overflow at 390, 768, and 1440px.

## Content model

`src/data.ts` is the single source of truth: `profile`, `experience`, `systems`, `stack`,
`projects`, `notes`, `navigation`. Every bracketed value is a placeholder. Section copy and the
hero are written as a starting voice, not as facts.

## Build

Vite + React + TypeScript + Tailwind CSS v4. Design tokens are `@theme` variables in
`src/index.css`; there is no `tailwind.config`. GitHub Actions builds on Node 22 and publishes
`dist/` to Pages. `base: './'` keeps the build portable across repository names.
