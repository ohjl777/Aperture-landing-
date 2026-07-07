"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const CARDS = [
  {
    tc: "00:00:04:12",
    title: "Continuity lock",
    body: "Characters, wardrobe, and set dressing stay identical shot to shot, take to take.",
  },
  {
    tc: "00:00:09:03",
    title: "Live grading",
    body: "Push a LUT across an entire sequence and watch every frame re-time in seconds.",
  },
  {
    tc: "00:00:14:20",
    title: "Coverage generator",
    body: "One scene description yields wide, medium, and close coverage automatically.",
  },
  {
    tc: "00:00:21:07",
    title: "Foley-aware audio",
    body: "Ambient and foley beds are inferred from the action on screen, then layered in.",
  },
  {
    tc: "00:00:28:15",
    title: "Version reels",
    body: "Every cut is kept as a labeled reel so a director can scrub prior versions instantly.",
  },
  {
    tc: "00:00:33:02",
    title: "Studio handoff",
    body: "Export straight to editorial-ready ProRes, or hand the timeline to your NLE of choice.",
  },
];

export default function PopupGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced || !gridRef.current) return;
      const cards = Array.from(gridRef.current.children);

      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, scale: 0.82, y: 50 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 88%",
          onEnter: () =>
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: (i % 3) * 0.08,
              ease: "back.out(1.8)",
            }),
          onLeaveBack: () =>
            gsap.to(card, { opacity: 0, scale: 0.82, y: 50, duration: 0.3 }),
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, reduced]);

  return (
    <section className="relative px-6 py-28 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-mono text-xs tracking-widest2 text-amber/80">DAILIES</p>
          <h2 className="text-balance font-display text-4xl font-light text-ink sm:text-5xl">
            Every tool a real <span className="italic text-amber-soft">production</span> needs.
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className={`group relative overflow-hidden rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow ${
                reduced ? "reduced-static" : ""
              }`}
            >
              <p className="font-mono text-[10px] tracking-widest2 text-muted/70">{c.tc}</p>
              <h3 className="mt-3 font-display text-xl font-normal text-ink">{c.title}</h3>
              <p className="mt-2 font-body text-sm font-light leading-relaxed text-muted">
                {c.body}
              </p>
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber/0 blur-2xl transition-all duration-500 group-hover:bg-amber/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
