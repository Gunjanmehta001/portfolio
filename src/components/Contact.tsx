'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from './Section';
import { Button } from './Button';
import { staggerContainer, fadeUp } from '../lib/motion';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const inputClass =
  'w-full rounded-none border-2 border-[color:var(--panel-border)] bg-[var(--color-muted-bg)] px-4 py-2.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-portal focus:border-transparent';

export function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" bg="bg-[var(--bg-dusk)]" className="py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-3xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.15)}
      >
        <motion.h2
          variants={fadeUp}
          className="mb-4 flex items-center justify-center gap-3 text-center font-pixel text-xl md:text-2xl"
        >
          <span className="inline-block h-4 w-4 bg-portal px-bevel" aria-hidden />
          THE PORTAL - CONTACT
        </motion.h2>

        <motion.p variants={fadeUp} className="mb-12 text-center text-lg opacity-90">
          Have a product problem worth solving? Step through - I'd love to hear about it.
        </motion.p>

        {/* Obsidian portal frame with purple glow */}
        <motion.div variants={fadeUp} className="relative">
          <div
            aria-hidden
            className="absolute -inset-4 animate-glow-pulse md:-inset-6"
            style={{ background: 'radial-gradient(closest-side, rgba(157,78,221,0.5), transparent 72%)' }}
          />
          <div className="relative border-[6px] border-[#191225] bg-[#191225] p-1 px-bevel">
            <div className="panel p-6 md:p-8" style={{ boxShadow: 'inset 0 0 28px rgba(157,78,221,0.3)' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block font-pixel text-[9px]">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block font-pixel text-[9px]">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block font-pixel text-[9px]">
                    MESSAGE
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me what you're building..."
                  />
                </div>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border-2 border-emerald bg-emerald/10 p-4 text-sm"
                    >
                      Message sent through the portal! I&apos;ll get back to you soon.
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden border-2 border-redstone bg-redstone/10 p-4 text-sm"
                    >
                      The portal fizzled. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button type="submit" variant="portal" fullWidth size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Opening portal…' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="text-center">
            <p className="mb-1 font-pixel text-[9px] opacity-70">EMAIL</p>
            <a
              href="mailto:gunjanmehta.contact@gmail.com"
              className="font-medium text-portal transition-colors hover:text-portal-2"
            >
              gunjanmehta.contact@gmail.com
            </a>
          </div>
          <div className="text-center">
            <p className="mb-1 font-pixel text-[9px] opacity-70">LINKEDIN</p>
            <a
              href="https://www.linkedin.com/in/gunjan-mehta-0b466026a/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-portal transition-colors hover:text-portal-2"
            >
              Gunjan Mehta
            </a>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
