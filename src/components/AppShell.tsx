'use client';

import React from 'react';
import { ThemeProvider } from '../lib/theme-provider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { PixelCursor } from './PixelCursor';
import { AmbientParticles } from './AmbientParticles';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[120] focus:px-4 focus:py-2 focus:bg-panel focus:px-frame font-pixel text-xs"
      >
        Skip to content
      </a>
      <PixelCursor />
      <AmbientParticles />
      <Navbar />
      <main id="main" className="w-full">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  );
}
