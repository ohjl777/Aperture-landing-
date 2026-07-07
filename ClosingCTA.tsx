"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced || !ref.current) return;
      gsap.set(ref.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }),
      });
    }, ref);
    return () => ctx.revert();
  }, [gsap, ScrollTrigger, reduced]);

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div className="pointer-events-none absolute inset-0 bg-grain-gradient" />
      <div ref={ref} className={`relative z-10 ${reduced ? "reduced-static" : ""}`}>
        <p className="mb-6 font-mono text-xs tracking-widest2 text-amber/80">FADE IN</p>
        <h2 className="text-balance font-display text-5xl font-light leading-[1.05] text-ink sm:text-6xl lg:text-7xl">
          Your next film starts
          <br />
          on an <span className="italic text-amber-soft">empty page.</span>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-balance font-body text-base font-light text-muted">
          No crew call, no soundstage booking. Just a scene, written the way
          you'd pitch it in a room.
        </p>
        <button className="mt-10 rounded-full bg-amber px-10 py-4 font-body text-sm font-medium text-void shadow-glow transition-transform hover:scale-105 active:scale-95">
          Open Aperture — it's free to start
        </button>
      </div>
    </section>
  );
}
