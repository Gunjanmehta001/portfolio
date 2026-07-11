'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../lib/theme-provider';

const P = { grass: 'var(--grass)', grassD: 'var(--grass-dark)', dirt: 'var(--dirt)', dirtD: 'var(--dirt-dark)', stone: 'var(--stone)', stoneD: 'var(--stone-dark)', plank: 'var(--plank)', plankD: 'var(--plank-dark)', portal: 'var(--portal)', portal2: 'var(--portal-2)', gold: 'var(--gold)' };

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 16 16" className="h-6 w-6" shapeRendering="crispEdges" aria-hidden>
    {children}
  </svg>
);

const icons: Record<string, React.ReactNode> = {
  spawn: (
    <Icon>
      <rect x="1" y="1" width="14" height="14" fill={P.dirt} />
      <rect x="1" y="1" width="14" height="5" fill={P.grass} />
      <rect x="3" y="3" width="2" height="2" fill={P.grassD} />
      <rect x="9" y="2" width="2" height="3" fill={P.grassD} />
      <rect x="4" y="9" width="2" height="2" fill={P.dirtD} />
      <rect x="10" y="11" width="2" height="2" fill={P.dirtD} />
    </Icon>
  ),
  about: (
    <Icon>
      <rect x="2" y="5" width="12" height="2" fill={P.plankD} />
      <rect x="4" y="3" width="8" height="2" fill={P.plankD} />
      <rect x="6" y="1" width="4" height="2" fill={P.plankD} />
      <rect x="3" y="7" width="10" height="8" fill={P.plank} />
      <rect x="7" y="10" width="2" height="5" fill={P.dirtD} />
      <rect x="4" y="9" width="2" height="2" fill={P.gold} />
    </Icon>
  ),
  experience: (
    <Icon>
      <rect x="2" y="2" width="2" height="3" fill={P.stone} />
      <rect x="7" y="2" width="2" height="3" fill={P.stone} />
      <rect x="12" y="2" width="2" height="3" fill={P.stone} />
      <rect x="2" y="5" width="12" height="10" fill={P.stone} />
      <rect x="7" y="9" width="2" height="6" fill={P.stoneD} />
      <rect x="4" y="7" width="2" height="2" fill={P.stoneD} />
      <rect x="10" y="7" width="2" height="2" fill={P.stoneD} />
    </Icon>
  ),
  projects: (
    <Icon>
      <rect x="1" y="6" width="7" height="2" fill={P.dirtD} />
      <rect x="3" y="4" width="3" height="2" fill={P.dirtD} />
      <rect x="2" y="8" width="5" height="7" fill={P.plank} />
      <rect x="8" y="3" width="7" height="2" fill={P.stoneD} />
      <rect x="9" y="5" width="5" height="10" fill={P.stone} />
      <rect x="10" y="7" width="2" height="2" fill={P.gold} />
      <rect x="3" y="10" width="2" height="2" fill={P.gold} />
    </Icon>
  ),
  skills: (
    <Icon>
      <rect x="3" y="11" width="2" height="2" fill={P.dirt} />
      <rect x="5" y="9" width="2" height="2" fill={P.dirt} />
      <rect x="7" y="7" width="2" height="2" fill={P.dirt} />
      <rect x="9" y="5" width="2" height="2" fill={P.dirt} />
      <rect x="7" y="2" width="7" height="2" fill={P.stone} />
      <rect x="12" y="4" width="2" height="4" fill={P.stone} />
      <rect x="5" y="3" width="2" height="2" fill={P.stone} />
    </Icon>
  ),
  contact: (
    <Icon>
      <rect x="2" y="1" width="12" height="14" fill="#1a1123" />
      <rect x="4" y="3" width="8" height="10" fill={P.portal} />
      <rect x="5" y="5" width="2" height="2" fill={P.portal2} />
      <rect x="8" y="8" width="2" height="3" fill={P.portal2} />
      <rect x="9" y="4" width="1" height="2" fill={P.portal2} />
    </Icon>
  ),
};

const slots = [
  { id: 'spawn', label: 'Spawn' },
  { id: 'about', label: 'The Cabin — About' },
  { id: 'experience', label: 'The Castle — Experience' },
  { id: 'projects', label: 'The Village — Projects' },
  { id: 'skills', label: 'The Mine — Skills' },
  { id: 'contact', label: 'The Portal — Contact' },
];

/** Player nametag (top-left) + Minecraft-style hotbar navigation (bottom). Keys 1–7 work too. */
export function Navbar() {
  const [active, setActive] = useState('spawn');
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const els = slots.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const idx = Number(e.key) - 1;
      if (idx >= 0 && idx < slots.length) {
        document.getElementById(slots[idx].id)?.scrollIntoView({ behavior: 'smooth' });
      } else if (e.key === '7') {
        themeContext?.toggleTheme();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [themeContext]);

  if (!themeContext) return null;
  const { theme, toggleTheme } = themeContext;

  const slotBase =
    'group relative flex h-11 w-11 md:h-12 md:w-12 items-center justify-center border-2 px-bevel transition-transform duration-150';

  return (
    <>
      {/* Player nametag */}
      <div className="fixed left-3 top-3 z-40 mc-tooltip px-3 py-2 font-pixel text-[9px] leading-relaxed">
        GUNJAN MEHTA
        <span className="hidden sm:block text-[7px] text-white/60">PRODUCT ENGINEER · LVL 2026</span>
      </div>

      {/* Hotbar */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-3 left-1/2 z-40 -translate-x-1/2"
      >
        <div className="flex items-end gap-1 border-[3px] border-[#1b1d22] bg-[#101216]/85 p-1 backdrop-blur-sm">
          {slots.map((s, i) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={isActive ? 'true' : undefined}
                className={`${slotBase} ${
                  isActive
                    ? 'bg-[#4a4e57] border-white ring-2 ring-white/70 -translate-y-1'
                    : 'bg-[#33363d] border-black/80 hover:-translate-y-0.5 hover:bg-[#3d4048]'
                }`}
              >
                {icons[s.id]}
                <span className="pointer-events-none absolute bottom-0 right-0.5 hidden font-pixel text-[7px] text-white/50 md:block">
                  {i + 1}
                </span>
                <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap mc-tooltip px-2 py-1.5 font-pixel text-[8px] group-hover:block group-focus-visible:block">
                  {s.label}
                </span>
              </a>
            );
          })}

          {/* Theme slot: day/night cycle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to night mode' : 'Switch to day mode'}
            className={`${slotBase} bg-[#33363d] border-black/80 hover:-translate-y-0.5 hover:bg-[#3d4048]`}
          >
            {theme === 'light' ? (
              <Icon>
                <rect x="4" y="4" width="8" height="8" fill="#ffd94a" />
                <rect x="2" y="7" width="2" height="2" fill="#ffd94a" />
                <rect x="12" y="7" width="2" height="2" fill="#ffd94a" />
                <rect x="7" y="2" width="2" height="2" fill="#ffd94a" />
                <rect x="7" y="12" width="2" height="2" fill="#ffd94a" />
              </Icon>
            ) : (
              <Icon>
                <rect x="4" y="3" width="9" height="10" fill="#dfe6f2" />
                <rect x="6" y="5" width="2" height="2" fill="#aab6cc" />
                <rect x="10" y="9" width="2" height="2" fill="#aab6cc" />
                <rect x="1" y="1" width="1" height="1" fill="#fff" />
                <rect x="14" y="14" width="1" height="1" fill="#fff" />
              </Icon>
            )}
            <span className="pointer-events-none absolute bottom-0 right-0.5 hidden font-pixel text-[7px] text-white/50 md:block">
              7
            </span>
            <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap mc-tooltip px-2 py-1.5 font-pixel text-[8px] group-hover:block group-focus-visible:block">
              {theme === 'light' ? 'Set Night' : 'Set Day'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
