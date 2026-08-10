
import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion, useScroll, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Certificates } from './components/Certificates';
import { Footer } from './components/Footer';
import { BackgroundEffect } from './components/BackgroundEffect';
import { LogoMotion } from './components/LogoMotion';
import { ResumeViewer } from './components/ResumeViewer';
import { ScrollNavigator } from './components/ScrollNavigator';
import { ScrollSection } from './components/ScrollSection';
import { ArrowUp, Moon, Sun, FileText } from 'lucide-react';
import { Blog } from './components/Blog';

interface ViewTransitionHandle {
  ready: Promise<void>;
  finished: Promise<void>;
}

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransitionHandle;
};

const App: React.FC = () => {
  /* Removed mounted state to fix lint error and simplified theme init */
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const storedTheme = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const footerRef = useRef<HTMLDivElement>(null);
  const themeTransitionRef = useRef(false);
  const lastScrollY = useRef(0);
  const reducedMotion = useReducedMotion();

  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.35,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setShowBackToTop(latest > 500);

      if (latest < 80) {
        setIsNavVisible(true);
        lastScrollY.current = latest;
        return;
      }

      if (latest > lastScrollY.current + 12) {
        setIsNavVisible(false);
        lastScrollY.current = latest;
      } else if (latest < lastScrollY.current - 12) {
        setIsNavVisible(true);
        lastScrollY.current = latest;
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  /* Theme initialization handled in useState now */

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (themeTransitionRef.current) return;

    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const updateTheme = () => {
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      flushSync(() => setTheme(nextTheme));
    };
    const viewTransitionDocument = document as ViewTransitionDocument;

    if (reducedMotion) {
      updateTheme();
      return;
    }

    const icon = event.currentTarget.querySelector('svg');
    const bounds = icon?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const radius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    );
    const normalizedDiagonal = Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2;
    const originX = `${(x / viewportWidth) * 100}%`;
    const originY = `${(y / viewportHeight) * 100}%`;
    const revealRadius = `${(radius / normalizedDiagonal) * 100}%`;
    const collapsedClipPath = `circle(0% at ${originX} ${originY})`;
    const expandedClipPath = `circle(${revealRadius} at ${originX} ${originY})`;

    themeTransitionRef.current = true;

    if (!viewTransitionDocument.startViewTransition) {
      document.documentElement.classList.add('theme-fallback');
      const overlay = document.createElement('span');
      overlay.className = 'theme-reveal-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      Object.assign(overlay.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '2147483646',
        pointerEvents: 'none',
        background: nextTheme === 'dark' ? '#09090b' : '#fafafa',
        clipPath: collapsedClipPath,
      });
      document.body.appendChild(overlay);

      const reveal = overlay.animate(
        {
          clipPath: [
            collapsedClipPath,
            expandedClipPath,
          ],
        },
        {
          duration: 900,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );

      void reveal.finished
        .then(updateTheme)
        .catch(updateTheme)
        .finally(() => {
          overlay.remove();
          themeTransitionRef.current = false;
          document.documentElement.classList.remove('theme-fallback');
        });
      return;
    }

    document.documentElement.classList.add('theme-switching');
    const transition = viewTransitionDocument.startViewTransition(updateTheme);

    void transition.ready
      .then(() => {
        document.documentElement.classList.remove('theme-switching');
        document.documentElement.animate(
          {
            clipPath: [
              collapsedClipPath,
              expandedClipPath,
            ],
          },
          {
            duration: 900,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          } as KeyframeAnimationOptions & { pseudoElement: string },
        );
      })
      .catch(() => document.documentElement.classList.remove('theme-switching'));

    void transition.finished
      .finally(() => {
        themeTransitionRef.current = false;
        document.documentElement.classList.remove('theme-switching');
      })
      .catch(() => undefined);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleGetInTouch = () => {
    setIsContactOpen(true);
    // Small delay to allow state to propagate if needed, though mostly visual
    setTimeout(() => {
      footerRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }, 100);
  };

  /* Removed mounted check */

  return (
    <main className="min-h-screen selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-100 relative">

      <BackgroundEffect />
      <LogoMotion />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[100] h-0.5 origin-left bg-cyan-700/70 dark:bg-cyan-300/70"
        style={{ scaleX }}
      />

      <motion.nav
        animate={{
          y: reducedMotion || isNavVisible ? 0 : -96,
          opacity: reducedMotion || isNavVisible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-6 text-zinc-900 dark:text-zinc-100"
      >
        <span className="font-bold text-xl tracking-tighter font-mono">WYS.</span>

        <div className="flex items-center gap-3 md:gap-4 pointer-events-auto">
          <button
            type="button"
            onClick={() => setIsResumeOpen(true)}
            className="group flex items-center gap-2 px-3 py-2 text-sm font-mono font-bold bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-full hover:bg-cyan-500 hover:border-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:border-cyan-500 transition-all shadow-sm"
            aria-label="View resume"
          >
            <FileText size={16} />
            <span className="hidden md:inline">RESUME</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-pressed={theme === 'dark'}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="ui-control relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-white/50 text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200"
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -70, scale: 0.65 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 70, scale: 0.65 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className={`pointer-events-none absolute flex h-8 w-8 items-center justify-center rounded-full ${
                  theme === 'light'
                    ? 'text-amber-500'
                    : 'text-cyan-300'
                }`}
                aria-hidden="true"
              >
                {theme === 'light' ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <button
            onClick={handleGetInTouch}
            className="ui-control px-3 md:px-4 py-2 text-xs md:text-sm font-mono font-bold bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-full"
          >
            <span className="md:hidden">CONTACT</span>
            <span className="hidden md:inline">GET IN TOUCH</span>
          </button>
        </div>
      </motion.nav>

      {/* Sections */}
      <div className="relative z-10">
        <ScrollSection id="intro" index={0}>
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
        </ScrollSection>
        <ScrollSection id="experience" index={1}>
          <Experience />
        </ScrollSection>
        <ScrollSection id="certificates" index={2}>
          <Certificates />
        </ScrollSection>
        <ScrollSection id="achievements" index={3}>
          <Achievements />
        </ScrollSection>
        <ScrollSection id="skills" index={4}>
          <Skills />
        </ScrollSection>
        <ScrollSection id="articles" index={5}>
          <Blog />
        </ScrollSection>
      </div>

      <ScrollNavigator />

      {/* Footer with Contact Form */}
      <ScrollSection id="contact" index={6} ref={footerRef} className="z-10">
        <Footer isOpen={isContactOpen} setIsOpen={setIsContactOpen} />
      </ScrollSection>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && !isContactOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="fixed bottom-8 right-8 z-40 hidden rounded-full bg-zinc-900 p-3 text-white shadow-lg transition-colors hover:bg-cyan-600 dark:bg-white dark:text-black dark:hover:bg-cyan-400 md:block"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isResumeOpen && (
          <ResumeViewer isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
        )}
      </AnimatePresence>

    </main>
  );
};

export default App;
