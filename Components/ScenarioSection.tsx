"use client";

import { useEffect, useRef } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export interface ScenarioFeature {
  label: string;
  detail: string;
}

interface ScenarioSectionProps {
  index: string; // "01"
  kicker: string; // "SCENE"
  title: string;
  titleAccent?: string;
  description: string;
  features: ScenarioFeature[];
  direction: "left" | "right";
  accent?: "amber" | "tally";
}

export default function ScenarioSection({
  index,
  kicker,
  title,
  titleAccent,
  description,
  features,
  direction,
  accent = "amber",
}: ScenarioSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reduced) return;
      if (!sectionRef.current || !pinRef.current || !copyRef.current) return;
      const fromX = direction === "left" ? -140 : 140;
      const cards = cardsRef.current
        ? Array.from(cardsRef.current.children)
        : [];

      gsap.set(copyRef.current, { x: fromX, opacity: 0 });
      gsap.set(cards, { scale: 0.75, opacity: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 1,
        },
      });

      tl.to(copyRef.current, { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" })
        .to(
          cards,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.12,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        )
        .to({}, { duration: 0.35 }) // hold
        .to(copyRef.current, { opacity: 0.35, x: -fromX * 0.15, duration: 0.25 })
        .to(cards, { opacity: 0.35, y: -20, duration: 0.25 }, "<");

      return () => tl.scrollTrigger?.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, [gsap, ScrollTrigger, reduced, direction]);

  const accentText = accent === "amber" ? "text-amber-soft" : "text-tally-soft";
  const accentBorder = accent === "amber" ? "border-amber/30" : "border-tally/40";
  const accentGlow = accent === "amber" ? "shadow-glow" : "shadow-glow-red";
  const accentDot = accent === "amber" ? "bg-amber" : "bg-tally";

  return (
    <section ref={sectionRef} className={reduced ? "relative py-24" : "relative h-[240vh]"}>
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center overflow-hidden bg-void px-6 md:px-16 lg:px-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div ref={copyRef} className={reduced ? "reduced-static" : ""}>
            <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-widest2 text-muted">
              <span className={`h-1.5 w-1.5 rounded-full ${accentDot}`} />
              {kicker} {index}
            </div>
            <h2 className="text-balance font-display text-4xl font-light leading-tight text-ink sm:text-5xl lg:text-6xl">
              {title}{" "}
              {titleAccent && <span className={`italic ${accentText}`}>{titleAccent}</span>}
            </h2>
            <p className="mt-6 max-w-md text-balance font-body text-base font-light leading-relaxed text-muted">
              {description}
            </p>
          </div>

          <div ref={cardsRef} className="grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.label}
                className={`reduced-static rounded-2xl glass ${accentBorder} p-5 transition-shadow hover:${accentGlow}`}
              >
                <p className={`font-mono text-[11px] tracking-widest2 ${accentText}`}>
                  {f.label}
                </p>
                <p className="mt-2 font-body text-sm font-light text-ink/85">{f.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
