"use client";

import { useEffect, useRef, useState } from "react";
import { useGsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

function toTimecode(progress: number, totalFrames = 14400) {
  // Fake a 24fps timecode counter driven by scroll progress, HH:MM:SS:FF
  const frame = Math.floor(progress * totalFrames);
  const ff = frame % 24;
  const totalSec = Math.floor(frame / 24);
  const ss = totalSec % 60;
  const mm = Math.floor(totalSec / 60) % 60;
  const hh = Math.floor(totalSec / 3600);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export default function ScrollRail() {
  const fillRef = useRef<HTMLDivElement>(null);
  const [code, setCode] = useState("00:00:00:00");
  const reduced = useReducedMotion();
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setCode(toTimecode(self.progress));
        if (fillRef.current) {
          gsap.to(fillRef.current, {
            height: `${self.progress * 100}%`,
            duration: reduced ? 0 : 0.2,
            overwrite: true,
            ease: "none",
          });
        }
      },
    });
    return () => st.kill();
  }, [gsap, ScrollTrigger, reduced]);

  return (
    <div className="fixed right-4 top-0 z-50 hidden h-screen w-10 flex-col items-center justify-between py-10 md:flex lg:right-8">
      {/* sprocket holes */}
      <div className="flex flex-col items-center gap-2 opacity-60">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`top-${i}`} className="sprocket" />
        ))}
      </div>

      <div className="relative flex-1 w-[2px] overflow-hidden rounded-full bg-white/10">
        <div
          ref={fillRef}
          className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber to-amber-soft"
          style={{ height: "0%" }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[10px] tracking-widest text-amber/90">
          {code}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 opacity-60">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={`bot-${i}`} className="sprocket" />
        ))}
      </div>
    </div>
  );
}
