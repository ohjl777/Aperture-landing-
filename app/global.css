@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #3a372f transparent;
}

html {
  background: #0a0a0c;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  @apply bg-void text-ink font-body antialiased;
  overflow-x: hidden;
}

/* ---------- Film grain overlay ---------- */
.grain-layer {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.06;
  mix-blend-mode: overlay;
}

/* ---------- Glassmorphism ---------- */
.glass {
  background: rgba(244, 241, 234, 0.045);
  border: 1px solid rgba(244, 241, 234, 0.09);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
}

.glass-strong {
  background: rgba(244, 241, 234, 0.07);
  border: 1px solid rgba(244, 241, 234, 0.14);
  backdrop-filter: blur(24px) saturate(160%);
  -webkit-backdrop-filter: blur(24px) saturate(160%);
}

/* ---------- Vignette ---------- */
.vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    120% 120% at 50% 45%,
    transparent 40%,
    rgba(0, 0, 0, 0.55) 100%
  );
}

/* ---------- Sprocket rail (film strip scroll indicator) ---------- */
.sprocket {
  width: 6px;
  height: 10px;
  border-radius: 1.5px;
  background: rgba(244, 241, 234, 0.14);
}

.text-balance {
  text-wrap: balance;
}

/* Utility: hide on reduced motion targets we render as static */
.reduced-static {
  opacity: 1 !important;
  transform: none !important;
}
