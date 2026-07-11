'use client';

import React, { useEffect, useRef } from 'react';

type Mote = { x: number; y: number; s: number; vy: number; sway: number; phase: number; c: number };

/** Ambient drifting motes: pollen by day, fireflies by night. One tiny canvas. */
export function AmbientParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let motes: Mote[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const DAY = ['rgba(255,255,255,0.55)', 'rgba(165,214,127,0.45)', 'rgba(255,224,130,0.4)'];
    const NIGHT = ['rgba(255,217,74,0.6)', 'rgba(199,125,255,0.35)', 'rgba(255,255,255,0.3)'];

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const n = window.innerWidth < 768 ? 12 : 24;
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: (Math.random() > 0.6 ? 3 : 2) * dpr,
        vy: (0.1 + Math.random() * 0.25) * dpr,
        sway: (0.3 + Math.random() * 0.5) * dpr,
        phase: Math.random() * Math.PI * 2,
        c: Math.floor(Math.random() * 3),
      }));
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      const dark = document.documentElement.classList.contains('dark');
      const colors = dark ? NIGHT : DAY;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() / 1000;
      for (const m of motes) {
        m.y -= m.vy;
        if (m.y < -8) {
          m.y = canvas.height + 8;
          m.x = Math.random() * canvas.width;
        }
        const x = m.x + Math.sin(t * 0.8 + m.phase) * m.sway * 6;
        // fireflies pulse at night
        ctx.globalAlpha = dark ? 0.4 + 0.6 * Math.abs(Math.sin(t * 1.5 + m.phase)) : 1;
        ctx.fillStyle = colors[m.c];
        ctx.fillRect(Math.round(x), Math.round(m.y), m.s, m.s);
      }
      ctx.globalAlpha = 1;
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-[5] h-full w-full" aria-hidden />;
}
