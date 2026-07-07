# Aperture — cinematic scroll landing page

A single-page Next.js (App Router) + Tailwind + GSAP ScrollTrigger landing
page for a fictional AI cinematography tool, built to spec: pinned hero,
scenario blocks that slide in / pin / release, pop-up glass cards, film
grain, and a `prefers-reduced-motion` fallback throughout.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's in here

- `app/page.tsx` — composes the page: Hero → three ScenarioSections →
  PopupGrid → ClosingCTA.
- `components/Hero.tsx` — pinned hero. Foreground text fades/rises and the
  background scales up as you scroll through it (ScrollTrigger `pin` +
  `scrub`).
- `components/ScenarioSection.tsx` — reusable "scene" block. Content slides
  in from the left or right, pins for a beat while feature cards pop in
  with a staggered `back.out` ease, then fades as the next scene takes over.
- `components/PopupGrid.tsx` — glassmorphism cards that scale/glow in as
  they cross into view (per-card `ScrollTrigger`, not scrubbed — a clean
  one-shot pop instead of a scrub, since these aren't pinned moments).
- `components/ParticleField.tsx` — canvas-based ambient dust/ember field
  used as the hero's looping "3D" backdrop.
- `components/FilmGrain.tsx` — animated 12fps noise overlay for the
  cinematic grain look.
- `components/ScrollRail.tsx` — the film-strip scroll progress rail with a
  live fake timecode readout (the page's signature detail).
- `lib/useReducedMotion.ts` / `lib/gsap.ts` — the reduced-motion hook and a
  single place that registers the ScrollTrigger plugin.

## About the hero "video"

The brief asks for a looping 3D video background. I don't have a licensed
video asset to ship in a code deliverable, so `ParticleField.tsx` is a
canvas-based substitute: three depth layers of drifting embers with a soft
parallax wash, tuned to the same amber/tally palette as the rest of the
page. If you have an actual clip, swap the `<ParticleField />` in
`Hero.tsx` for a `<video autoPlay loop muted playsInline>` — the pin/scale
scroll animation around it will keep working unchanged.

## Reduced motion

Every GSAP-driven component checks `useReducedMotion()` first:

- Pinned sections (`Hero`, `ScenarioSection`) skip the `pin`/`scrub`
  entirely and render as normal static, stacked sections instead of tall
  scroll-jacked blocks.
- Card entrances (`PopupGrid`) skip the scale/opacity tween and render
  fully visible immediately (`reduced-static` utility class in
  `globals.css` forces `opacity: 1; transform: none`).
- The grain overlay swaps its animated canvas for a single static SVG
  noise texture.
- The scroll rail keeps working (it's a progress indicator, not a
  scroll-jack) but its fill tween duration drops to `0`.

## Notes / things to adapt

- Copy, product name ("Aperture"), and feature claims are placeholder —
  written to make the animation choices legible, not as real marketing
  copy.
- `next/font/google` pulls Fraunces, Inter, and JetBrains Mono at build
  time, so the first build needs network access to Google Fonts (normal
  for any Next.js project using `next/font/google`).
- Mobile: the scroll rail hides below `md`, pinned sections still pin
  (GSAP handles touch scroll natively), and card grids collapse to one
  column.
