'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Button } from './Button';
import { TerrainDivider } from './TerrainDivider';
import { staggerContainer, fadeUp } from '../lib/motion';

const CLOUDS = [
  { top: '10%', scale: 1, dur: 95, delay: -20, op: 0.95 },
  { top: '22%', scale: 0.65, dur: 70, delay: -45, op: 0.8 },
  { top: '6%', scale: 1.35, dur: 125, delay: -75, op: 0.85 },
  { top: '32%', scale: 0.5, dur: 60, delay: -10, op: 0.6 },
];

const STARS = [
  [8, 12], [16, 30], [24, 8], [33, 22], [41, 14], [50, 6], [58, 26], [66, 10],
  [74, 20], [82, 8], [90, 16], [12, 44], [28, 38], [46, 40], [62, 36], [78, 42], [88, 32], [5, 28],
];

function Cloud() {
  return (
    <div className="relative">
      <div className="h-7 w-24 bg-white/95 dark:bg-slate-400/25" />
      <div className="absolute -top-4 left-6 h-4 w-12 bg-white/95 dark:bg-slate-400/25" />
    </div>
  );
}

function Tree({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 30" className={className} shapeRendering="crispEdges" aria-hidden>
      <rect x="10" y="18" width="4" height="12" fill="var(--dirt)" />
      <rect x="4" y="6" width="16" height="12" fill="var(--grass-dark)" />
      <rect x="7" y="2" width="10" height="6" fill="var(--grass)" />
      <rect x="6" y="8" width="3" height="3" fill="var(--grass)" />
      <rect x="15" y="12" width="3" height="3" fill="var(--grass)" />
    </svg>
  );
}

export function Hero() {
  return (
    <Section
      id="spawn"
      bg="overflow-hidden bg-[linear-gradient(to_bottom,var(--sky-top),var(--sky-bottom))]"
      className="flex min-h-[100svh] flex-col items-center justify-center pt-16 pb-40"
      decor={
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Sun / Moon */}
          <div className="absolute right-[9%] top-[9%] h-12 w-12 bg-[#ffd94a] px-bevel dark:hidden" />
          <div className="absolute right-[10%] top-[8%] hidden h-11 w-11 bg-[#dfe6f2] px-bevel dark:block">
            <div className="absolute left-2 top-2 h-2 w-2 bg-[#aab6cc]" />
            <div className="absolute bottom-2 right-2 h-2 w-2 bg-[#aab6cc]" />
          </div>

          {/* Stars (night only) */}
          <div className="absolute inset-0 hidden dark:block">
            {STARS.map(([x, y], i) => (
              <span
                key={i}
                className="absolute h-[3px] w-[3px] bg-white animate-twinkle"
                style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 6) * 0.4}s` }}
              />
            ))}
          </div>

          {/* Drifting clouds */}
          {CLOUDS.map((c, i) => (
            <div
              key={i}
              className="absolute animate-cloud-drift"
              style={{ top: c.top, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`, opacity: c.op }}
            >
              <div style={{ transform: `scale(${c.scale})` }}>
                <Cloud />
              </div>
            </div>
          ))}

          {/* Trees on the spawn terrain */}
          <Tree className="absolute bottom-24 left-[4%] hidden w-24 md:block" />
          <Tree className="absolute bottom-24 left-[13%] hidden w-16 lg:block" />
          <Tree className="absolute bottom-24 right-[6%] hidden w-20 md:block" />

          {/* Pond with shimmering water */}
          <svg viewBox="0 0 48 12" className="absolute bottom-[88px] right-[16%] hidden w-36 lg:block" shapeRendering="crispEdges">
            <rect x="4" y="2" width="40" height="8" fill="#3f76c9" />
            <rect x="0" y="4" width="48" height="6" fill="#3f76c9" />
            <rect x="8" y="4" width="6" height="2" fill="#6ea3e8" className="animate-shimmer" />
            <rect x="26" y="6" width="8" height="2" fill="#6ea3e8" className="animate-shimmer" style={{ animationDelay: '0.8s' }} />
          </svg>

          {/* Ground: jagged grass terrain */}
          <div className="absolute inset-x-0 bottom-0">
            <TerrainDivider cap="var(--grass)" fill="var(--dirt)" height={56} />
            <div className="h-8 w-full" style={{ background: 'var(--dirt-dark)' }} />
          </div>
        </div>
      }
    >
      <motion.div
        className="w-full max-w-3xl text-center"
        variants={staggerContainer(0.12, 0.2)}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <span className="mc-tooltip inline-block px-4 py-2.5 font-pixel text-[9px] md:text-[10px]">
            ⛏ PRODUCT ENGINEER · PUNE, INDIA
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mb-6 font-pixel text-[clamp(1.5rem,5.5vw,3rem)] leading-[1.35] text-white [text-shadow:3px_3px_0_rgba(0,0,0,0.35)]"
        >
          GUNJAN MEHTA
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/95 [text-shadow:1px_1px_0_rgba(0,0,0,0.3)] md:text-xl"
        >
          I build AI-native products from 0&rarr;1 - owning PRDs, agent systems, and roadmap
          execution end to end, from ideation to production.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Work
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get in Touch
          </Button>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-14 hidden font-pixel text-[8px] text-white/70 md:block"
        >
          PRESS 1–6 TO FAST-TRAVEL · SCROLL TO EXPLORE ▼
        </motion.p>
      </motion.div>
    </Section>
  );
}
