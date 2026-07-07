"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A cheap, GPU-friendly animated grain overlay. Renders a small noise
 * tile to an offscreen canvas and redraws it at ~12fps for a genuine
 * "film" flicker rather than a static texture.
 */
export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 128;
    canvas.width = size;
    canvas.height = size;

    let frame: number;
    let last = 0;

    const draw = (t: number) => {
      frame = requestAnimationFrame(draw);
      if (t - last < 80) return; // ~12fps
      last = t;
      const imageData = ctx.createImageData(size, size);
      const buffer = imageData.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.floor(Math.random() * 255);
        buffer[i] = shade;
        buffer[i + 1] = shade;
        buffer[i + 2] = shade;
        buffer[i + 3] = 22;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [reduced]);

  if (reduced) {
    return (
      <div
        className="grain-layer"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%[...]",
          opacity: 0.05,
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="grain-layer"
      style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
    />
  );
}
