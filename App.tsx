
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Certificates } from './components/Certificates';
import { Footer } from './components/Footer';
import { BackgroundEffect } from './components/BackgroundEffect';
import { ArrowUp, Moon, Sun, FileDown } from 'lucide-react';
import { Blog } from './components/Blog';

const App: React.FC = () => {
  /* Removed mounted state to fix lint error and simplified theme init */
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Scroll for Back to Top
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowBackToTop(latest > 500);
    });
    return () => unsubscribe();
  }, [scrollY]);

  /* Theme initialization handled in useState now */

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetInTouch = () => {
    setIsContactOpen(true);
    // Small delay to allow state to propagate if needed, though mostly visual
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  /* Removed mounted check */

  return (
    <main className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-100 relative">

      {/* Interactive Background Effect */}
      <BackgroundEffect />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-cyan-600 dark:bg-cyan-500 origin-left z-[100] shadow-[0_0_10px_#06b6d4]"
        style={{ scaleX }}
      />

      {/* Navigation / Header - Absolute positioned */}
      {/* Removed mix-blend-difference which was causing visibility issues in light mode */}
      <nav className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none text-zinc-900 dark:text-zinc-100">
        <span className="font-bold text-xl tracking-tighter font-mono">WYS.</span>

        <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
          {/* Resume Download Button */}
          <a
            href="/assets/resume.pdf"
            download="Wai_Yan_Soe_DevOps_Resume.pdf"
            className="group flex items-center gap-2 px-3 py-2 text-sm font-mono font-bold bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-full hover:bg-cyan-500 hover:border-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:border-cyan-500 transition-all shadow-sm"
            aria-label="Download Resume"
          >
            <FileDown size={16} className="group-hover:animate-bounce" />
            <span className="hidden md:inline">RESUME</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={handleGetInTouch}
            className="px-4 py-2 text-sm font-mono font-bold bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all hover:scale-105"
          >
            GET IN TOUCH
          </button>
        </div>
      </nav>

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <Experience />
        <Achievements />
        <Skills />
        <Certificates />
        <Blog />
      </div>

      {/* Footer with Contact Form */}
      <div ref={footerRef} className="relative z-10">
        <Footer isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full shadow-lg z-40 hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;
