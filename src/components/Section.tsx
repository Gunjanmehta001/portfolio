import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Full-bleed background classes applied to the outer <section> */
  bg?: string;
  /** Decorative full-bleed layer rendered behind the content */
  decor?: React.ReactNode;
}

export function Section({ children, id, className = '', bg = '', decor }: SectionProps) {
  return (
    <section id={id} className={`relative w-full ${bg}`}>
      {decor}
      <div className={`relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </section>
  );
}
