'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { staggerContainer, fadeUp } from '../lib/motion';

const stats = [
  { value: '30+', label: 'Features shipped at Hapticware' },
  { value: '25+', label: 'PRDs & FRDs authored' },
  { value: '59', label: 'AI sub-agents scoped' },
  { value: '9', label: 'Releases in 3 weeks' },
];

export function About() {
  return (
    <Section id="about" bg="bg-[var(--bg-plains)]" className="py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2 variants={fadeUp} className="mb-10 flex items-center gap-3 font-pixel text-xl md:text-2xl">
          <span className="inline-block h-4 w-4 bg-plank px-bevel" aria-hidden />
          THE CABIN — ABOUT ME
        </motion.h2>

        <motion.div variants={fadeUp}>
          {/* Cabin: stepped roof over plank walls over a readable panel */}
          <div
            aria-hidden
            className="mx-4 h-10 bg-plank-dark md:mx-8"
            style={{
              clipPath:
                'polygon(0 100%, 0 66%, 10% 66%, 10% 33%, 25% 33%, 25% 0, 75% 0, 75% 33%, 90% 33%, 90% 66%, 100% 66%, 100% 100%)',
            }}
          />
          <div className="planks px-frame px-bevel p-3 md:p-4">
            <div className="panel px-frame p-6 md:p-8">
              <p className="mb-6 text-lg leading-relaxed">
                I&apos;m a Product Engineer building AI-native products from 0&rarr;1, with hands-on
                experience across product ownership, PRDs/FRDs, AI agent systems, and roadmap
                execution. At Hapticware Intelligence, I own the end-to-end execution of ExoQ
                &mdash; an AI Agent OS &mdash; alongside our CRM and Admin Portal, working directly
                with founders, engineering, and customers.
              </p>
              <p className="text-lg leading-relaxed">
                Before that, at DDN Storage I partnered with enterprise customers and support teams
                to drive issue resolution, performing RCA on 20+ incidents and automating log
                analysis with Python. I care about shipping customer-centric AI products through
                data-informed decisions and rapid execution.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats as item frames on the cabin wall */}
        <motion.div variants={fadeUp} className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="panel px-frame px-bevel p-4 text-center">
              <div className="mb-2 font-pixel text-lg text-accent-dark md:text-xl">{stat.value}</div>
              <p className="text-xs leading-snug opacity-80">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
