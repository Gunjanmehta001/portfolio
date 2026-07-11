'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { staggerContainer, fadeUp } from '../lib/motion';

const projects = [
  {
    id: 1,
    title: 'ExoQ.ai',
    tag: 'THE AI LAB',
    roof: 'var(--lapis)',
    description:
      'Built AI workflows using LLMs, RAG, and multi-agent orchestration for an enterprise AI platform. Defined product requirements and supported feature releases through UAT and stakeholder feedback.',
    tech: ['LLM Applications', 'RAG', 'Multi-Agent Systems', 'Prompt Engineering'],
  },
  {
    id: 2,
    title: 'Healthcare CRM',
    tag: 'THE CLINIC · HV DESAI',
    roof: 'var(--redstone)',
    description:
      'Delivered CRM workflows by translating business requirements into user-centric product features. Improved user experience through stakeholder collaboration and iterative feature enhancements.',
    tech: ['Requirement Gathering', 'Stakeholder Management', 'Product Design'],
  },
];

const roofClip =
  'polygon(0 100%, 0 60%, 12% 60%, 12% 25%, 30% 25%, 30% 0, 70% 0, 70% 25%, 88% 25%, 88% 60%, 100% 60%, 100% 100%)';

export function Projects() {
  return (
    <Section id="projects" bg="bg-[var(--bg-village)]" className="py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.15)}
      >
        <motion.h2 variants={fadeUp} className="mb-10 flex items-center gap-3 font-pixel text-xl md:text-2xl">
          <span className="inline-block h-4 w-4 bg-gold px-bevel" aria-hidden />
          THE VILLAGE — PROJECTS
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <motion.article
                whileHover={{ y: -6, boxShadow: '8px 8px 0 rgba(0,0,0,0.28)' }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="h-full"
              >
                {/* Roof */}
                <div
                  aria-hidden
                  className="mx-5 h-9"
                  style={{ background: project.roof, clipPath: roofClip }}
                />
                {/* Facade */}
                <div className="flex h-[calc(100%-2.25rem)] flex-col bg-[#f3f0e8] p-6 px-frame px-bevel text-[#1d232b]">
                  {/* Windows: glow at night */}
                  <div aria-hidden className="mb-4 flex gap-2">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="h-3.5 w-3.5 border-2 border-black/40 bg-gold dark:[box-shadow:0_0_10px_2px_rgba(242,185,60,0.7)]"
                      />
                    ))}
                  </div>

                  <span className="mb-2 font-pixel text-[9px]" style={{ color: project.roof }}>
                    {project.tag}
                  </span>
                  <h3 className="mb-3 text-xl font-bold">{project.title}</h3>
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-[#3a3f46]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-black/10 px-2.5 py-1 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
