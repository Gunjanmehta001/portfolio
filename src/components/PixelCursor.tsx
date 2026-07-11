'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { ThemeContext } from '../lib/theme-provider';

type Particle = { id: number; x: number; y: number; dx: number; dy: number; color: string; size: number };
let pid = 0;

const SLASH = ['#e8ecf0', '#aab4be', '#ffffff'];
const SPARK = ['#ffd94a', '#ff8c1a', '#ffb347'];
const HOVER_DAY = ['#6cbb45', '#ffd94a', '#ffffff'];
const HOVER_NIGHT = ['#ffd94a', '#c77dff', '#ff8c1a'];

export function PixelCursor() {
  const themeContext = useContext(ThemeContext);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overText, setOverText] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const hoverRef = useRef(false);
  const shakeRef = useRef({ lastDir: 0, turns: [] as number[], timer: 0 });

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 520, damping: 34, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 520, damping: 34, mass: 0.5 });
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  const tilt = useTransform(vx, [-1400, 1400], [-10, 10], { clamp: true });
  // Squash & stretch from horizontal acceleration
  const stretchX = useTransform(vx, (v) => 1 + Math.min(Math.abs(v) / 9000, 0.12));
  const stretchY = useTransform(vy, (v) => 1 - Math.min(Math.abs(v) / 12000, 0.08));

  const dark = themeContext?.theme === 'dark';

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add('pixel-cursor');

    const spawn = (x: number, y: number, colors: string[], count: number, spread: number) => {
      const batch: Particle[] = Array.from({ length: count }, () => ({
        id: pid++,
        x,
        y,
        dx: (Math.random() - 0.5) * spread,
        dy: -Math.random() * spread * 0.8 - 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() > 0.5 ? 4 : 3,
      }));
      setParticles((p) => [...p.slice(-20), ...batch]);
      window.setTimeout(() => {
        setParticles((p) => p.filter((q) => !batch.includes(q)));
      }, 550);
    };

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);

      // macOS-style shake-to-grow: rapid left-right direction flips
      const s = shakeRef.current;
      const dir = Math.sign(e.movementX);
      if (dir !== 0 && dir !== s.lastDir && s.lastDir !== 0 && Math.abs(e.movementX) > 6) {
        const now = performance.now();
        s.turns = [...s.turns.filter((t) => now - t < 700), now];
        if (s.turns.length >= 4) {
          setShaking(true);
          window.clearTimeout(s.timer);
          s.timer = window.setTimeout(() => {
            setShaking(false);
            s.turns = [];
          }, 700);
        }
      }
      if (dir !== 0) s.lastDir = dir;
    };
    const over = (e: MouseEvent) => {
      const el = e.target as Element | null;
      const interactive = !!el?.closest?.('a,button,[role="button"],select,summary,label');
      const text = !!el?.closest?.('input,textarea');
      setOverText(text);
      setHovering(interactive);
      if (interactive && !hoverRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        spawn(e.clientX, e.clientY, isDark ? HOVER_NIGHT : HOVER_DAY, 5, 40);
      }
      hoverRef.current = interactive;
    };
    const down = (e: MouseEvent) => {
      setSwinging(true);
      window.setTimeout(() => setSwinging(false), 340);
      const isDark = document.documentElement.classList.contains('dark');
      spawn(e.clientX + 14, e.clientY - 6, isDark ? SPARK : SLASH, 6, 56);
    };
    const leave = () => {
      mx.set(-100);
      my.set(-100);
    };

    document.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mousedown', down);
    document.documentElement.addEventListener('mouseleave', leave);

    return () => {
      document.documentElement.classList.remove('pixel-cursor');
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mousedown', down);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Click / hover particles */}
      <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden>
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
              animate={{ x: p.x + p.dx, y: p.y + p.dy, opacity: 0, scale: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute left-0 top-0"
              style={{ width: p.size, height: p.size, background: p.color }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* The explorer */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99]"
        style={{ x: sx, y: sy, rotate: tilt }}
        animate={{ scale: shaking ? 2 : hovering ? 1.12 : 1, opacity: overText ? 0 : 1 }}
        transition={
          shaking
            ? { type: 'spring', stiffness: 300, damping: 15 }
            : { duration: 0.15, ease: 'easeOut' }
        }
        aria-hidden
      >
        {/* Torch light bloom (night only) */}
        {dark && (
          <motion.div
            className="pointer-events-none absolute -left-8 -top-10 h-28 w-28 rounded-full"
            style={{
              background: 'radial-gradient(closest-side, rgba(255,170,60,0.4), rgba(255,140,26,0.15), transparent)',
            }}
            animate={{ opacity: hovering ? [0.95, 1, 0.9] : [0.6, 0.8, 0.65], scale: [1, 1.08, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <div className="-translate-x-3 -translate-y-2">
          <motion.div className="animate-bob" style={{ scaleX: stretchX, scaleY: stretchY }}>
            <Explorer swinging={swinging} hovering={hovering} torch={!!dark} />
          </motion.div>
        </div>

        {/* Embers & smoke rising from the torch (night only) */}
        {dark && (
          <div className="absolute left-[34px] top-[2px]">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute h-1 w-1"
                style={{ background: i === 2 ? 'rgba(180,180,190,0.5)' : '#ffb347' }}
                animate={{ y: [-2, -16], x: [0, i === 0 ? 4 : -3], opacity: [0.9, 0] }}
                transition={{ duration: 1.1 + i * 0.3, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}

/**
 * Original voxel explorer - brown hair, blue shirt, dark brown pants, brown
 * boots, friendly smile. Sword by day, burning torch by night.
 * Arms pivot at the SHOULDER (view-box origins) so nothing dislocates.
 *
 * Grid (viewBox units): head x8-15 y0-6 · body x8-15 y7-13 ·
 * arms x5-7 / x16-18 y7-13 · legs x8-11 / x12-15 y14-19
 */
function Explorer({ swinging, hovering, torch }: { swinging: boolean; hovering: boolean; torch: boolean }) {
  const HAIR = '#4a2f1b';
  const SKIN = '#e6b58a';
  const SHIRT = '#3b6bd6';
  const SHIRT_D = '#2f57b3';
  const PANTS = '#4a2f18';
  const BOOTS = '#8a5a33';

  return (
    <svg width="52" height="44" viewBox="0 0 26 22" shapeRendering="crispEdges">
      {/* ── Right arm + tool: pivots at shoulder (17,8) ── */}
      <motion.g
        animate={swinging ? { rotate: [0, -75, 12, 0] } : { rotate: [0, -6, 0] }}
        transition={
          swinging
            ? { duration: 0.34, ease: 'easeOut' }
            : { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
        }
        style={{ transformBox: 'view-box', transformOrigin: '17px 8px' } as React.CSSProperties}
      >
        {/* sleeve + hand */}
        <rect x="16" y="7" width="3" height="4" fill={SHIRT} />
        <rect x="16" y="7" width="3" height="1" fill={SHIRT_D} />
        <rect x="16" y="11" width="3" height="3" fill={SKIN} />

        {torch ? (
          <>
            {/* torch: stick up from the hand, chunky flame on top */}
            <rect x="18" y="8" width="2" height="4" fill="#8a5a33" />
            <rect x="18" y="8" width="1" height="4" fill="#a87e49" />
            <motion.g
              animate={{ opacity: hovering ? [1, 1, 0.95] : [0.85, 1, 0.9] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <rect x="17" y="5" width="4" height="3" fill="#ff8c1a" />
              <rect x="18" y="3" width="2" height="2" fill="#ff8c1a" />
              <rect x="18" y="5" width="2" height="2" fill="#ffd94a" />
              <rect x="19" y="4" width="1" height="1" fill="#ffd94a" />
            </motion.g>
          </>
        ) : (
          <>
            {/* sword: grip in hand → guard → 2px diagonal blade */}
            <rect x="18" y="12" width="2" height="1" fill="#6e4726" />
            <rect x="18" y="10" width="1" height="2" fill="#9aa3ac" />
            <rect x="19" y="11" width="2" height="1" fill="#9aa3ac" />
            <rect x="19" y="10" width="2" height="2" fill="#dfe4e8" />
            <rect x="20" y="9" width="2" height="2" fill="#dfe4e8" />
            <rect x="21" y="8" width="2" height="2" fill="#dfe4e8" />
            <rect x="22" y="7" width="2" height="2" fill="#dfe4e8" />
            <rect x="23" y="6" width="2" height="2" fill="#dfe4e8" />
            <rect x="24" y="5" width="1" height="1" fill="#ffffff" />
            {/* edge highlight */}
            <rect x="20" y="9" width="1" height="1" fill="#ffffff" />
            <rect x="22" y="7" width="1" height="1" fill="#ffffff" />
            <motion.g animate={{ opacity: hovering ? 1 : 0 }} transition={{ duration: 0.2 }}>
              <rect x="21" y="6" width="3" height="3" fill="rgba(255,255,255,0.45)" />
            </motion.g>
          </>
        )}
      </motion.g>

      {/* ── Left arm: pivots at shoulder (7,8), swings opposite ── */}
      <motion.g
        animate={swinging ? { rotate: 0 } : { rotate: [0, 8, 0] }}
        transition={
          swinging
            ? { duration: 0.34 }
            : { duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }
        }
        style={{ transformBox: 'view-box', transformOrigin: '7px 8px' } as React.CSSProperties}
      >
        <rect x="5" y="7" width="3" height="4" fill={SHIRT} />
        <rect x="5" y="7" width="3" height="1" fill={SHIRT_D} />
        <rect x="5" y="11" width="3" height="3" fill={SKIN} />
      </motion.g>

      {/* ── Legs: gentle alternating stride ── */}
      <motion.g
        animate={{ y: [0, -0.8, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="8" y="14" width="4" height="4" fill={PANTS} />
        <rect x="8" y="18" width="4" height="2" fill={BOOTS} />
      </motion.g>
      <motion.g
        animate={{ y: [0, 0.8, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: 0.45 }}
      >
        <rect x="12" y="14" width="4" height="4" fill={PANTS} />
        <rect x="12" y="18" width="4" height="2" fill={BOOTS} />
      </motion.g>

      {/* ── Body: blue shirt with yoke + belt (drawn over leg tops) ── */}
      <rect x="8" y="7" width="8" height="7" fill={SHIRT} />
      <rect x="8" y="7" width="8" height="1" fill={SHIRT_D} />
      <rect x="8" y="13" width="8" height="1" fill="#2a3d5c" />

      {/* ── Head: hair cap + face ── */}
      <rect x="8" y="2" width="8" height="5" fill={SKIN} />
      <rect x="8" y="0" width="8" height="2" fill={HAIR} />
      <rect x="7" y="1" width="1" height="3" fill={HAIR} />
      <rect x="16" y="1" width="1" height="3" fill={HAIR} />
      <rect x="8" y="2" width="1" height="1" fill={HAIR} />
      <rect x="15" y="2" width="1" height="1" fill={HAIR} />
      {/* eyes */}
      <rect x="10" y="4" width="1" height="1" fill="#26221f" />
      <rect x="13" y="4" width="1" height="1" fill="#26221f" />
      {/* friendly smile - widens a touch on hover */}
      <rect x={hovering ? 10 : 11} y="6" width={hovering ? 4 : 2} height="1" fill="#c98a5e" />
    </svg>
  );
}
