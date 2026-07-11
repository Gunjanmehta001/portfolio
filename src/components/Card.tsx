'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  variant?: 'panel' | 'plank' | 'bricks' | 'deepslate';
}

const variantClass = {
  panel: 'panel',
  plank: 'planks',
  bricks: 'bricks',
  deepslate: 'bg-[#20242c] text-slate-100',
};

/** Blocky beveled panel. Hover = lift with a hard pixel drop-shadow. */
export function Card({ children, className = '', hoverable = false, variant = 'panel' }: CardProps) {
  return (
    <motion.div
      className={`rounded-none px-frame px-bevel p-6 ${variantClass[variant]} ${className}`}
      whileHover={hoverable ? { y: -4, boxShadow: '6px 6px 0 rgba(0,0,0,0.3)' } : undefined}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
