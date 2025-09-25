import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Knowledge from '@/components/Knowledge';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AboutMe from '@/components/AboutMe';
import Currently from '@/components/Currently';

import GitHubChart from "../components/Git";
const _currentProjectIds = [
  "voxed",
  "illini-plan",
  "manim-video-agent",
  "illini-spots",
];

const Index = () => {
  useEffect(() => {
    // No forzar tema aquí; el tema se controla vía ThemeToggle y script inicial
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-[75%] mx-auto">
      <Navbar />
      <Hero />
      <Currently />
      <GitHubChart username="samuelbonifacio015" />
      <AboutMe />
      <Projects />
      <Technologies />
      <Knowledge />
      <Contact />
      <Footer />
      </div>
    </div>
  );
};

export default Index;
