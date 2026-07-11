import type { Metadata } from 'next';
import { Press_Start_2P, Inter } from 'next/font/google';
import { AppShell } from '../components/AppShell';
import './globals.css';

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gunjan Mehta - Product Engineer',
  description:
    'Product Engineer building AI-native products from 0→1 — PRDs/FRDs, AI agent systems, and roadmap execution.',
  keywords: ['product engineer', 'AI agents', 'PRD', 'FRD', 'product management', 'portfolio'],
  authors: [{ name: 'Gunjan Mehta' }],
  openGraph: {
    type: 'website',
    title: 'Gunjan Mehta - Product Engineer',
    description: 'Product Engineer building AI-native products from 0→1.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${pixelFont.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#68b7e8" />
        {/* Set theme class before paint to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-background text-foreground font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
