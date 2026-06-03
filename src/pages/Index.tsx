import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Knowledge from '@/components/Knowledge';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AboutMe from '@/components/AboutMe';
import Inspiration from '@/components/Inspiration';

import GitHubChart from "../components/Git";
import Terminal from '@/components/Terminal';

const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full transition-all duration-300">
        <Navbar isMobile={isMobile} />
        <Sidebar isMobile={isMobile} />
        <Hero />
        <Terminal />
        <GitHubChart username="samuelbonifacio015" />
        <AboutMe />
        <Technologies />
        <Projects />
        <Knowledge />
        <Inspiration />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
