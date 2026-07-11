'use client';

import { LoadingScreen } from '../components/LoadingScreen';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Experience } from '../components/Experience';
import { Projects } from '../components/Projects';
import { Skills } from '../components/Skills';
import { Contact } from '../components/Contact';
import { TerrainDivider } from '../components/TerrainDivider';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      {/* Spawn ground gives way to the plains */}
      <TerrainDivider className="bg-[var(--dirt-dark)]" fill="var(--bg-plains)" height={32} />
      <About />
      {/* Plains rise into castle stone */}
      <TerrainDivider className="bg-[var(--bg-plains)]" fill="var(--bg-stone)" cap="var(--stone)" height={40} />
      <Experience />
      {/* Back out to the village green */}
      <TerrainDivider className="bg-[var(--bg-stone)]" fill="var(--bg-village)" cap="var(--grass)" height={40} />
      <Projects />
      {/* Descend into the mine */}
      <TerrainDivider className="bg-[var(--bg-village)]" fill="var(--bg-mine)" cap="var(--deepslate)" height={48} />
      <Skills />
      {/* Emerge at dusk near the portal */}
      <TerrainDivider className="bg-[var(--bg-mine)]" fill="var(--bg-dusk)" height={40} />
      <Contact />
      {/* Nightfall at the campfire */}
      <TerrainDivider className="bg-[var(--bg-dusk)]" fill="var(--bg-ground)" height={36} />
    </>
  );
}
