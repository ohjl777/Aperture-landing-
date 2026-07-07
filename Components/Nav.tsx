"use client";

export default function Nav() {
  return (
    <header className="fixed left-0 top-0 z-40 flex w-full items-center justify-between px-6 py-6 md:px-16">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-amber" />
        <span className="font-display text-lg tracking-tight text-ink">Aperture</span>
      </div>
      <nav className="hidden items-center gap-8 font-mono text-xs tracking-widest2 text-muted md:flex">
        <a href="#scenes" className="transition-colors hover:text-amber-soft">SCENES</a>
        <a href="#dailies" className="transition-colors hover:text-amber-soft">DAILIES</a>
        <a href="#start" className="rounded-full border border-white/15 px-4 py-2 text-ink transition-colors hover:border-amber/60 hover:text-amber-soft">
          SIGN IN
        </a>
      </nav>
    </header>
  );
}
