import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import RadioSidebar from '@/components/RadioSidebar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Knowledge from '@/components/Knowledge';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AboutMe from '@/components/AboutMe';
import Currently from '@/components/Currently';
import Inspiration from '@/components/Inspiration';

import GitHubChart from "../components/Git";

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
      <div className={cn(
        'mx-auto transition-all duration-300',
        'max-w-[75%] px-4 py-20 md:px-6 md: max-w-[100%] md:py-20 lg:px-8 lg:py-24'
      )}>
      <Navbar isMobile={isMobile} />
      <RadioSidebar isMobile={isMobile} />
      <Hero />
      <Currently />
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