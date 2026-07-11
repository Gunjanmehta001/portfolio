'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'portal';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  fullWidth?: boolean;
}

const variants = {
  primary: 'bg-grass text-white',
  secondary: 'bg-stone text-[#1d232b]',
  outline: 'bg-panel text-foreground',
  portal: 'bg-portal text-white',
};

const sizes = {
  sm: 'px-3 py-2 text-[9px]',
  md: 'px-5 py-3 text-[10px]',
  lg: 'px-7 py-4 text-[11px]',
};

/** Blocky, beveled button in the world's UI style. Lifts on hover, presses in on tap. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={`
        inline-flex items-center justify-center select-none
        font-pixel uppercase tracking-wide leading-none
        rounded-none px-frame px-bevel
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { y: 1, scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      {...props}
    />
  );
}
