// Shared motion tokens so every component eases and times the same way.
export const easeOut = [0.16, 1, 0.3, 1] as const; // decisive deceleration, no bounce
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const durations = {
  fast: 0.2,
  base: 0.4,
  slow: 0.6,
  deliberate: 0.8,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.slow, ease: easeOut },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});
