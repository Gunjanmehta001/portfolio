'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
}

const GREETING =
  "Hrmm! I'm Villager Gunjan. Ask me about my experience, skills, projects, education, or how to reach me!";

const SUGGESTIONS = ['Experience', 'Skills', 'Projects', 'Education', 'Contact'];

// Rule-based knowledge from the resume. Each entry: keywords + answer.
const KNOWLEDGE: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['hapticware', 'exoq', 'current', 'now', 'agent os'],
    answer:
      "At Hapticware Intelligence (Apr 2026 - Present, Pune) I'm a Product Engineer on AI Systems. I own end-to-end execution of ExoQ (an AI Agent OS), CRM, and Admin Portal: 30+ features shipped, 25+ PRDs/FRDs authored, workflows defined for 59 AI sub-agents, and 9 production releases in 3 weeks. I also led QA, UAT, and compliance across GDPR, HIPAA, ISO 27001, SOC 2, and DPDP.",
  },
  {
    keywords: ['ddn', 'storage', 'previous', 'before'],
    answer:
      'At DDN Storage (Apr 2025 - Mar 2026, Pune) I was a Product Engineer. I partnered with enterprise customers and support teams, performed RCA on 20+ incidents (cutting repeat escalations by 15%), automated log analysis with Python (~40% faster debugging), and wrote SOPs and technical docs.',
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'roles'],
    answer:
      'Two quests so far! Currently: Product Engineer (AI Systems) at Hapticware Intelligence, building ExoQ, an AI Agent OS. Before that: Product Engineer at DDN Storage, working with enterprise customers on issue resolution and automation. Ask me about either one!',
  },
  {
    keywords: ['ai', 'llm', 'rag', 'agent', 'prompt', 'ml'],
    answer:
      'My AI toolkit: LLM Applications, Agentic AI, Multi-Agent Systems, RAG, AI Workflow Design, and Prompt Engineering. At Hapticware I scoped workflows for 59 AI sub-agents on ExoQ, an enterprise AI Agent OS.',
  },
  {
    keywords: ['skill', 'stack', 'tool', 'tech', 'know'],
    answer:
      'My inventory: Product (PRDs/FRDs, Strategy, Roadmapping, Sprint Planning, UAT), AI (LLMs, RAG, Multi-Agent Systems, Prompt Engineering), Data (SQL, Python/Pandas, Product Metrics), Enterprise (GDPR, HIPAA, ISO 27001, SOC 2, DPDP, Agile Scrum), and Tools (REST APIs, MERN, Git, GCP, Jira, Figma, Notion, Claude, Cursor).',
  },
  {
    keywords: ['project', 'built', 'portfolio', 'crm', 'healthcare'],
    answer:
      'Two builds on display: ExoQ.ai - AI workflows with LLMs, RAG, and multi-agent orchestration for an enterprise platform. And Healthcare CRM (HV Desai) - CRM workflows translating business requirements into user-centric features. Check the Village section!',
  },
  {
    keywords: ['education', 'college', 'university', 'degree', 'study', 'cgpa', 'chitkara'],
    answer:
      'I studied at Chitkara University, Patiala (2022-2026): Bachelor of Engineering in Computer Science with a CGPA of 8.27.',
  },
  {
    keywords: ['certification', 'certificate', 'google', 'award'],
    answer:
      'Achievements unlocked: Google Project Management Certification (2026) and HP POWER LAB Semi-Finalist.',
  },
  {
    keywords: ['open source', 'extracurricular', 'community', 'volunteer'],
    answer:
      'I was on the Content Team at Open Source Chandigarh (Sep 2023 - Mar 2024): planning community initiatives, creating technical content, and using AI tools to optimize content strategy.',
  },
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'linkedin', 'phone', 'touch'],
    answer:
      'Open a portal to me! Email: gunjanmehta.contact@gmail.com, or find me on LinkedIn (link in the footer). You can also use the contact form in the Portal section.',
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer:
      'You can grab my resume from the "Resume" button in the spawn area at the top, or download it directly at /GunjanMehta_Resume.pdf.',
  },
  {
    keywords: ['who', 'about', 'yourself', 'intro', 'gunjan'],
    answer:
      "I'm Gunjan Mehta, a Product Engineer building AI-native products from 0 to 1. I work across product ownership, PRDs/FRDs, AI agent systems, and roadmap execution, and I love shipping customer-centric AI products fast.",
  },
  {
    keywords: ['hi', 'hello', 'hey', 'yo', 'sup', 'hrmm'],
    answer: 'Hrmm hrmm! Hello, traveler. Ask me about my experience, skills, projects, or education!',
  },
];

const FALLBACK =
  "Hrmm? That one's not in my trade menu. Try asking about my experience, skills, projects, education, certifications, or how to contact me!";

function getAnswer(input: string): string {
  const q = input.toLowerCase();
  let best: { score: number; answer: string } | null = null;
  for (const entry of KNOWLEDGE) {
    const score = entry.keywords.filter((k) => q.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: entry.answer };
    }
  }
  return best ? best.answer : FALLBACK;
}

/** Villager face icon, drawn in pixels. */
function VillagerFace({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges" aria-hidden>
      <rect x="2" y="1" width="12" height="4" fill="#8f5f3f" />
      <rect x="2" y="5" width="12" height="10" fill="#bd8b72" />
      <rect x="4" y="7" width="2" height="2" fill="#2e5d3b" />
      <rect x="10" y="7" width="2" height="2" fill="#2e5d3b" />
      <rect x="7" y="8" width="2" height="5" fill="#a3765d" />
      <rect x="6" y="13" width="4" height="1" fill="#8a6248" />
    </svg>
  );
}

/** Minecraft-chat-styled bot that answers questions about Gunjan's career. */
export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([{ from: 'bot', text: GREETING }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, open]);

  const send = (raw?: string) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: 'bot', text: getAnswer(text) }]);
      setTyping(false);
    }, 550);
  };

  return (
    <>
      {/* Floating toggle */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Chat with Villager Gunjan'}
        className="fixed bottom-20 right-3 z-40 flex h-12 w-12 items-center justify-center border-[3px] border-[#1b1d22] bg-[#33363d] px-bevel md:bottom-4 md:right-4"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
      >
        {open ? (
          <span className="font-pixel text-sm text-white">✕</span>
        ) : (
          <VillagerFace className="h-8 w-8" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed bottom-[8.5rem] right-3 z-40 flex w-[calc(100vw-1.5rem)] max-w-sm flex-col border-[3px] border-[#1b1d22] bg-[#101216]/95 backdrop-blur-sm md:bottom-[4.75rem] md:right-4"
            role="dialog"
            aria-label="Chat with Villager Gunjan"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b-2 border-black/60 bg-[#33363d] px-3 py-2">
              <VillagerFace className="h-6 w-6" />
              <div className="flex-1">
                <p className="font-pixel text-[9px] text-white">VILLAGER GUNJAN</p>
                <p className="font-pixel text-[7px] text-emerald">● ONLINE · TRADES KNOWLEDGE</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex h-72 flex-col gap-2 overflow-y-auto p-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[88%] border-2 px-2.5 py-2 text-xs leading-relaxed ${
                    m.from === 'bot'
                      ? 'self-start border-black/60 bg-black/50 text-slate-100'
                      : 'self-end border-emerald/50 bg-emerald/15 text-emerald-100 text-slate-100'
                  }`}
                >
                  <span className="font-pixel text-[7px] opacity-60">
                    {m.from === 'bot' ? '<Gunjan> ' : '<You> '}
                  </span>
                  {m.text}
                </div>
              ))}
              {typing && (
                <div className="self-start border-2 border-black/60 bg-black/50 px-2.5 py-2 font-pixel text-[8px] text-slate-300">
                  Hrmm<span className="animate-pulse">...</span>
                </div>
              )}
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap gap-1.5 px-3 pb-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="border border-white/20 bg-white/5 px-2 py-1 font-pixel text-[7px] text-slate-300 transition-colors hover:bg-white/15"
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-1.5 border-t-2 border-black/60 p-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my career..."
                aria-label="Your question"
                className="min-w-0 flex-1 border-2 border-black/60 bg-black/40 px-2.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald"
              />
              <button
                type="submit"
                className="border-2 border-black/60 bg-emerald px-3 font-pixel text-[8px] text-white transition-transform hover:-translate-y-0.5"
              >
                SEND
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
