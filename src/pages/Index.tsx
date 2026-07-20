import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Technologies from '@/components/Technologies';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AboutMe from '@/components/AboutMe';
import Inspiration from '@/components/Inspiration';
import WorkExperience from '@/components/WorkExperience';
import AppleHelloIntro from '@/components/AppleHelloIntro';

import GitHubChart from "../components/Git";
import Terminal from '@/components/Terminal';

const Index = () => {
  return (
    <>
      <AppleHelloIntro />
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full transition-all duration-300">
          <Navbar />
          <main>
            <Hero />
            <section aria-label="Actividad y perfil técnico" className="px-5 pb-12 md:px-6 md:pb-16">
              <div className="mx-auto max-w-[var(--container-max)] divide-y divide-border border-y border-border bg-muted">
                <Terminal />
                <GitHubChart username="samuelbonifacio015" />
              </div>
            </section>
            <AboutMe />
            <WorkExperience />
            <Technologies />
            <Projects />
            <Inspiration />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
