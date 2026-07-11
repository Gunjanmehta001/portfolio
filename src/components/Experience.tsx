'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Card } from './Card';
import { staggerContainer } from '../lib/motion';

const experiences = [
  {
    id: 1,
    title: 'Product Engineer (AI Systems)',
    company: 'Hapticware Intelligence Pvt. Ltd.',
    location: 'Pune, India',
    period: 'Apr 2026 – Present',
    bullets: [
      'Owned end-to-end execution of ExoQ (AI Agent OS), CRM, and Admin Portal, delivering 30+ features from ideation to production while collaborating with founders, engineering, and customers.',
      'Authored 25+ PRDs and FRDs for AI agents, enterprise workflows, pricing, licensing, and compliance initiatives, enabling faster engineering execution and cross-functional alignment.',
      'Defined product scope, feature prioritization, and workflows for 59 AI sub-agents while leading sprint planning, roadmap execution, and 9 production releases in 3 weeks.',
      'Led QA, UAT, and enterprise compliance across GDPR, HIPAA, ISO 27001, SOC 2, and DPDP, coordinating audit readiness and validating product controls.',
    ],
    tech: ['Product Strategy', 'AI Agent Systems', 'PRDs/FRDs', 'Compliance'],
  },
  {
    id: 2,
    title: 'Product Engineer',
    company: 'DDN Storage (DataDirect Networks)',
    location: 'Pune, India',
    period: 'Apr 2025 – Mar 2026',
    bullets: [
      'Partnered with enterprise customers, support, and engineering teams to drive issue resolution and product improvements.',
      'Performed RCA on 20+ enterprise incidents, reducing repeat escalations by 15%.',
      'Automated log analysis using Python, improving debugging efficiency by approximately 40%.',
      'Created SOPs and technical documentation to streamline onboarding and operational workflows.',
    ],
    tech: ['Python', 'RCA', 'SOPs', 'Enterprise Support'],
  },
];

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

function Crenellation() {
  return (
    <div aria-hidden className="flex gap-2 px-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <span key={i} className="h-3 w-7 bg-stone-dark px-bevel" />
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience" bg="bg-[var(--bg-stone)]" className="py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.15)}
      >
        <motion.h2 variants={slideIn} className="mb-10 flex items-center gap-3 font-pixel text-xl md:text-2xl">
          <span className="inline-block h-4 w-4 bg-stone px-bevel" aria-hidden />
          THE CASTLE - EXPERIENCE
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div key={exp.id} variants={slideIn}>
              <Crenellation />
              <Card hoverable variant="bricks">
                <div className="mb-4 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold md:text-2xl">{exp.title}</h3>
                    <p className="font-medium">
                      {exp.company}{' '}
                      <span className="font-normal opacity-70">&middot; {exp.location}</span>
                    </p>
                  </div>
                  <span className="planks px-frame whitespace-nowrap px-3 py-1.5 font-pixel text-[8px]">
                    {exp.period}
                  </span>
                </div>

                <ul className="mb-4 space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="relative pl-4 text-sm leading-relaxed opacity-90 before:absolute before:left-0 before:content-['▪']"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech) => (
                    <span key={tech} className="border border-black/30 bg-black/20 px-2.5 py-1 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
