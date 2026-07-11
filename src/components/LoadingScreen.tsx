'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CELLS = 12;

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false);
      return;
    }
    const timer = setTimeout(() => setIsVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-[#241a10]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.svg
              viewBox="0 0 16 16"
              className="h-14 w-14"
              shapeRendering="crispEdges"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: [0, 0, -4, 4, 0] }}
              transition={{ duration: 0.8 }}
              aria-hidden
            >
              <rect x="1" y="1" width="14" height="14" fill="#8a5a33" />
              <rect x="1" y="1" width="14" height="5" fill="#6cbb45" />
              <rect x="3" y="3" width="2" height="2" fill="#549934" />
              <rect x="10" y="2" width="2" height="3" fill="#549934" />
              <rect x="4" y="9" width="2" height="2" fill="#6e4726" />
              <rect x="10" y="11" width="2" height="2" fill="#6e4726" />
            </motion.svg>

            <p className="font-pixel text-[10px] text-[#7ed072]">GENERATING WORLD…</p>

            <div className="flex gap-1" role="progressbar" aria-label="Loading">
              {Array.from({ length: CELLS }).map((_, i) => (
                <motion.span
                  key={i}
                  className="h-3.5 w-3.5 px-bevel"
                  initial={{ backgroundColor: '#3a2c1c' }}
                  animate={{ backgroundColor: '#6cbb45' }}
                  transition={{ delay: 0.15 + i * 0.09, duration: 0.05 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
