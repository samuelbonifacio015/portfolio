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
