'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RESUME_PATH = '/GunjanMehta_Resume.pdf';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

/** Book-and-quill style modal that previews the resume PDF with a download option. */
export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-3 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
        >
          <motion.div
            initial={{ y: 24, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 24, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex h-[88svh] w-full max-w-3xl flex-col border-[4px] border-[#1b1d22] bg-[#101216]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between gap-2 border-b-2 border-black/60 bg-[#33363d] px-3 py-2">
              <p className="font-pixel text-[9px] text-white md:text-[10px]">
                📜 RESUME · GUNJAN MEHTA
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PATH}
                  download="GunjanMehta_Resume.pdf"
                  className="border-2 border-black/60 bg-grass px-3 py-1.5 font-pixel text-[8px] text-white transition-transform hover:-translate-y-0.5"
                >
                  DOWNLOAD
                </a>
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden border-2 border-black/60 bg-stone px-3 py-1.5 font-pixel text-[8px] text-[#1d232b] transition-transform hover:-translate-y-0.5 md:inline-block"
                >
                  NEW TAB
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="border-2 border-black/60 bg-redstone px-2.5 py-1.5 font-pixel text-[8px] text-white transition-transform hover:-translate-y-0.5"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* PDF preview */}
            <iframe
              src={`${RESUME_PATH}#toolbar=0&view=FitH`}
              title="Gunjan Mehta resume preview"
              className="w-full flex-1 bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
