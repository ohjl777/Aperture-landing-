"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import ParticleField from "./ParticleField";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      if (!sectionRef.current || !pinRef.current || !textRef.current || !bgRef.current) return;

      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: pinRef.current,
        pinSpacing: true,
        scrub: 1,
        animation: gsap
          .timeline()
          .to(textRef.current, {
            opacity: 0,
            y: -80,
            scale: 0.92,
            ease: "none",
          })
          .to(bgRef.current, { scale: 1.18, opacity: 0.55, ease: "none" }, 0),
      });

      return () => st.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, reduced]);

  return (
    <section ref={sectionRef} className={reduced ? "relative" : "relative h-[220vh]"}>
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-void vignette">
        <div ref={bgRef} className="absolute inset-0">
          <ParticleField className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-void/40 to-void" />
        </div>

        <div
          ref={textRef}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-6 flex items-center gap-2 font-mono text-xs tracking-widest2 text-amber/80">
            <span className="h-1.5 w-1.5 rounded-full bg-tally animate-blink" />
            REC · APERTURE OS
          </span>
          <h1 className="text-balance font-display text-[13vw] font-light leading-[0.95] tracking-tightest text-ink sm:text-[9vw] lg:text-[7.2vw]">
            Direct the
            <br />
            <span className="italic text-amber-soft">impossible.</span>
          </h1>
          <p className="mt-8 max-w-xl text-balance font-body text-base font-light text-muted sm:text-lg">
            Aperture turns a written scene into graded, continuity-locked
            footage — so the only thing you have to imagine is the story.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button className="rounded-full bg-amber px-8 py-3 font-body text-sm font-medium text-void shadow-glow transition-transform hover:scale-105 active:scale-95">
              Start a scene
            </button>
            <button className="rounded-full border border-white/15 px-8 py-3 font-body text-sm font-medium text-ink/90 transition-colors hover:border-amber/60 hover:text-amber-soft">
              Watch the reel
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted">
          <span className="font-mono text-[10px] tracking-widest2">SCROLL</span>
          <span className="h-8 w-px bg-gradient-to-b from-amber/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
