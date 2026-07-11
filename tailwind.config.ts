import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        accent: 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'accent-dark': 'var(--color-accent-dark)',
        border: 'var(--color-border)',
        'muted-bg': 'var(--color-muted-bg)',
        panel: 'var(--panel)',
        grass: 'var(--grass)',
        'grass-dark': 'var(--grass-dark)',
        dirt: 'var(--dirt)',
        'dirt-dark': 'var(--dirt-dark)',
        stone: 'var(--stone)',
        'stone-dark': 'var(--stone-dark)',
        plank: 'var(--plank)',
        'plank-dark': 'var(--plank-dark)',
        deepslate: 'var(--deepslate)',
        portal: 'var(--portal)',
        'portal-2': 'var(--portal-2)',
        gold: 'var(--gold)',
        diamond: 'var(--diamond)',
        redstone: 'var(--redstone)',
        emerald: 'var(--emerald)',
        lapis: 'var(--lapis)',
      },
      fontFamily: {
        pixel: ['var(--font-pixel)', 'monospace'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        bob: 'bob 1.6s ease-in-out infinite',
        'cloud-drift': 'cloudDrift 90s linear infinite',
        twinkle: 'twinkle 2.4s ease-in-out infinite',
        flicker: 'flicker 0.5s steps(2, end) infinite',
        'glow-pulse': 'glowPulse 2.8s ease-in-out infinite',
        shimmer: 'shimmer 2.2s ease-in-out infinite',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
        cloudDrift: {
          from: { transform: 'translateX(-16rem)' },
          to: { transform: 'translateX(110vw)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        flicker: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.12) translateY(-1px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
