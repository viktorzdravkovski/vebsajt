# TODO

A working list for the portfolio. Tick items as you go.

## 1. Content

The layout is done; the page still needs your facts. Everything below lives in
`src/data.ts` unless noted.

- [ ] `profile.based` — city, country.
- [ ] `profile.email` — the address in the contact section and the `mailto:` link.
- [ ] `profile.socials` — fill in the GitHub and LinkedIn display values **and** their `href`
      fields. Empty `href` values render as plain text, not links.
- [ ] `profile.focus` — confirm "Systems, platform, reliability" is the right positioning.
- [ ] Replace all four `experience` entries with real roles:
  - [ ] Company, period, location.
  - [ ] One-sentence summary of the team and your ownership.
  - [ ] Two or three highlights with a measurable outcome where possible.
  - [ ] Delete rows you do not need. The section renders however many you keep.
- [ ] Replace the three `projects` placeholders:
  - [ ] Name, year, one-line summary.
  - [ ] Detail: problem, constraint, decision you would defend.
  - [ ] Your role and the real stack.
  - [ ] Add `links` if they are public (`{ label: "Case study", href: "https://..." }`).
- [ ] Replace the three `notes` placeholders, or delete the section if there is nothing to list.
- [ ] Read the hero copy, section notes, contact copy, and footer and rewrite them in your voice.
      They are written as a starting point, not as final copy.
- [ ] Check the `stack` groups against what you actually want to be hired for.

Search the content file for `[` to find every placeholder:

```powershell
Select-String -Path src/data.ts -Pattern "\["
```

## 2. Design and assets

- [x] Replace the old drafting-sheet concept with the editorial "Boring on purpose" direction.
- [x] Fixed neon circuit-board background (fog-light schematic, current pulses, LED glow, grain),
      scroll-reveal, accordion, magnetic email.
- [x] Replace the old blueprint favicon with the current neon mark.
- [x] Add a dark-board social preview at `public/og-image.png` (1200 × 630, with the fog-light
      schematic) and wire up `og:image` + `twitter:card` in `index.html`. After the first deploy,
      replace the relative `og:image` URLs with the absolute production URL if a crawler fails to
      resolve them.
- [ ] Check the page on a real phone, especially the fixed background and the 100svh hero.
- [ ] Decide whether to keep Google Fonts or self-host Bricolage Grotesque and Instrument Sans.
- [ ] Optional: add a print stylesheet if you want a clean PDF version of the experience section.
- [ ] Optional: adjust the background drawing position/size in `src/index.css` if it distracts on
      ultrawide screens.

## 3. Deployment

- [ ] Commit the current state. The repository exists locally but has no commits yet.
- [ ] Rename the local branch to `main` (recommended), or keep `master` — the workflow now
      triggers on both:

      ```powershell
      git branch -m master main
      ```

- [ ] Add the GitHub remote and push.
- [ ] In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- [ ] Confirm the **Deploy to GitHub Pages** workflow finishes and the site loads at
      `https://<user>.github.io/<repo>/`.
- [ ] Optional: add `public/CNAME` for a custom domain, then set the domain in Pages settings.
- [ ] Optional: protect `main` and require the build to pass before merging.

## 4. Later

- [ ] Add optional links to notes. The `Note` type only has `title` and `meta` today; add
      `href` and render an anchor in `src/components/WorkNotes.tsx`.
- [ ] Add a short "now" note if you want the page to feel current between job changes.
- [ ] Add analytics only if you want it, and pick something privacy-friendly.
- [ ] Re-run `npm run build` and `npm run lint` before each push.
- [ ] Re-check `prefers-reduced-motion` after any animation changes.
