import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Knowledge from '@/components/Knowledge';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AboutMe from '@/components/AboutMe';

import GitHubChart from "../components/Git";
const currentProjectIds = [
  "voxed",
  "illini-plan",
  "manim-video-agent",
  "illini-spots",
];

const Index = () => {
  useEffect(() => {
    // Set de Modo Oscuro
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#121212] text-white">
      <Navbar />
      <Hero />
      <GitHubChart username="samuelbonifacio015" />
      <AboutMe />
      <Projects />
      <Technologies />
      <Knowledge />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
