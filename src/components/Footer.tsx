import React from 'react';
import Link from 'next/link';

const sectionLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function Campfire() {
  return (
    <div className="relative mx-auto h-24 w-24">
      <div
        aria-hidden
        className="absolute -inset-10 animate-glow-pulse"
        style={{ background: 'radial-gradient(closest-side, rgba(255,140,26,0.35), transparent 70%)' }}
      />
      <svg viewBox="0 0 24 24" className="relative h-full w-full" shapeRendering="crispEdges" aria-hidden>
        {/* flame */}
        <g className="animate-flicker origin-bottom [transform-box:fill-box]">
          <rect x="10" y="5" width="4" height="3" fill="#ff8c1a" />
          <rect x="8" y="8" width="8" height="4" fill="#ff8c1a" />
          <rect x="7" y="12" width="10" height="5" fill="#ff8c1a" />
          <rect x="10" y="9" width="4" height="6" fill="#ffd94a" />
          <rect x="11" y="7" width="2" height="2" fill="#ffd94a" />
        </g>
        {/* logs */}
        <rect x="4" y="17" width="16" height="2" fill="#5b3a1e" />
        <rect x="6" y="19" width="12" height="2" fill="#4a2f18" />
        {/* stones */}
        <rect x="2" y="19" width="3" height="2" fill="#6f7377" />
        <rect x="19" y="19" width="3" height="2" fill="#6f7377" />
      </svg>
    </div>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full text-slate-200" style={{ background: 'var(--bg-ground)' }}>
      <div className="mx-auto max-w-7xl px-4 py-16 pb-32 text-center sm:px-6 lg:px-8">
        <Campfire />

        <p className="mt-6 font-pixel text-[10px] text-amber-200/90">REST HERE, TRAVELER</p>
        <p className="mt-3 text-sm text-slate-400">
          Product Engineer building AI-native products from 0&rarr;1.
        </p>

        <nav aria-label="Footer" className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {sectionLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-amber-200"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://linkedin.com/in/gunjan-mehta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-300 transition-colors hover:text-amber-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:gunjanmehta.contact@gmail.com"
            className="text-sm text-slate-300 transition-colors hover:text-amber-200"
          >
            Email
          </a>
        </nav>

        <p className="mt-10 text-xs text-slate-500">
          © {currentYear} Gunjan Mehta · Crafted block by block
        </p>
      </div>
    </footer>
  );
}
