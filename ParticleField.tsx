"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  z: number; // depth: 0 (far) -> 1 (near)
  r: number;
  vy: number;
  vx: number;
  hue: "amber" | "tally" | "ink";
}

/**
 * Ambient drifting dust / lens-flare particle field with parallax depth,
 * used as the looping hero backdrop. Substitutes for a licensed video
 * asset: three depth layers drift at different speeds to fake a subtle
 * 3D dolly move, with soft amber/tally embers echoing a tungsten set light.
 */
export default function ParticleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const colors: Record<Particle["hue"], string> = {
      amber: "217,162,92",
      tally: "178,58,58",
      ink: "242,238,230",
    };

    const count = reduced ? 0 : Math.floor((width * height) / 9000);
    const particles: Particle[] = Array.from({ length: count }).map(() => {
      const z = Math.random();
      const palette: Particle["hue"][] = ["amber", "amber", "ink", "tally"];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        r: 0.6 + z * 2.2,
        vy: -(0.06 + z * 0.18),
        vx: (Math.random() - 0.5) * 0.05,
        hue: palette[Math.floor(Math.random() * palette.length)],
      };
    });

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // soft depth gradient wash
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.75
      );
      grad.addColorStop(0, "rgba(217,162,92,0.05)");
      grad.addColorStop(1, "rgba(10,10,12,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alpha = 0.15 + p.z * 0.5;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${colors[p.hue]},${alpha})`;
        ctx.shadowColor = `rgba(${colors[p.hue]},${alpha})`;
        ctx.shadowBlur = 6 + p.z * 10;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (!reduced) {
      raf = requestAnimationFrame(render);
    } else {
      // Static single paint for reduced-motion users
      ctx.clearRect(0, 0, width, height);
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.5,
        width * 0.75
      );
      grad.addColorStop(0, "rgba(217,162,92,0.08)");
      grad.addColorStop(1, "rgba(10,10,12,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} />;
}
