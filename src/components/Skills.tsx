'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './Section';
import { Card } from './Card';
import { staggerContainer, fadeUp } from '../lib/motion';

// Each skill category is an ore vein in the mine
const skillCategories = [
  {
    category: 'Product',
    ore: 'var(--gold)',
    oreName: 'GOLD',
    skills: ['Product Ownership', 'PRDs/FRDs', 'Product Strategy', 'Roadmapping', 'Sprint Planning', 'Backlog Prioritization', 'Requirement Gathering', 'Stakeholder Management', 'UAT'],
  },
  {
    category: 'AI',
    ore: 'var(--diamond)',
    oreName: 'DIAMOND',
    skills: ['LLM Applications', 'Agentic AI', 'Multi-Agent Systems', 'RAG', 'AI Workflow Design', 'Prompt Engineering'],
  },
  {
    category: 'Data & Analytics',
    ore: 'var(--redstone)',
    oreName: 'REDSTONE',
    skills: ['SQL', 'Python (Pandas)', 'MS Excel', 'Product Metrics', 'KPIs'],
  },
  {
    category: 'Enterprise',
    ore: 'var(--emerald)',
    oreName: 'EMERALD',
    skills: ['Cross-functional Leadership', 'Customer Feedback Analysis', 'GDPR', 'HIPAA', 'ISO 27001', 'SOC 2', 'DPDP', 'Agile Scrum'],
  },
  {
    category: 'Technical & Tools',
    ore: 'var(--lapis)',
    oreName: 'LAPIS',
    skills: ['REST APIs', 'MERN Stack', 'Git', 'GitHub', 'GCP', 'Jira', 'Notion', 'Figma', 'Confluence', 'Claude', 'Cursor', 'Lovable'],
  },
];

const FLECKS: Array<[number, number, string]> = [
  [4, 12, 'var(--gold)'], [92, 20, 'var(--diamond)'], [8, 70, 'var(--redstone)'],
  [95, 62, 'var(--emerald)'], [2, 40, 'var(--lapis)'], [97, 88, 'var(--gold)'], [6, 92, 'var(--diamond)'],
];

export function Skills() {
  return (
    <Section
      id="skills"
      bg="bg-[var(--bg-mine)]"
      className="py-20 md:py-28"
      decor={
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {FLECKS.map(([x, y, c], i) => (
            <span
              key={i}
              className="absolute h-2 w-2 animate-twinkle opacity-70"
              style={{ left: `${x}%`, top: `${y}%`, background: c, animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </div>
      }
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.1)}
        className="text-slate-100"
      >
        <motion.p variants={fadeUp} className="mb-3 font-pixel text-[9px] text-slate-400">
          DEPTH: -58 · TORCHES LIT
        </motion.p>
        <motion.h2 variants={fadeUp} className="mb-10 flex items-center gap-3 font-pixel text-xl text-white md:text-2xl">
          <span className="inline-block h-4 w-4 bg-diamond px-bevel" aria-hidden />
          THE MINE — SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category) => (
            <motion.div key={category.category} variants={fadeUp}>
              <Card variant="deepslate" className="h-full border-black">
                <div className="mb-4 flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">{category.category}</h3>
                  <span className="font-pixel text-[8px]" style={{ color: category.ore }}>
                    {category.oreName} VEIN
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2, filter: 'brightness(1.35)' }}
                      transition={{ duration: 0.12 }}
                      className="inline-flex items-center gap-1.5 border-2 bg-black/40 px-2.5 py-1.5 text-xs font-medium"
                      style={{ borderColor: category.ore, color: category.ore }}
                    >
                      <span className="h-1.5 w-1.5 bg-current" aria-hidden />
                      {skill}
                    </motion.span>
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
