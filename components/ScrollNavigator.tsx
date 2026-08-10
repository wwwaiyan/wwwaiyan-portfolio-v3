import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'skills', label: 'Skills' },
  { id: 'articles', label: 'Articles' },
  { id: 'contact', label: 'Contact' },
];

export const ScrollNavigator: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.35,
    restDelta: 0.001,
  });
  const isHidden = activeSection === 'intro' || activeSection === 'contact';

  useEffect(() => {
    let frameId = 0;

    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.4;
      let currentSection = sections[0].id;

      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) {
          currentSection = id;
        }
      });

      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        currentSection = 'contact';
      }

      setActiveSection((current) => current === currentSection ? current : currentSection);
    };

    const handleViewportChange = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  const navigateTo = (id: string) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <motion.nav
      aria-label="Page sections"
      animate={{ opacity: isHidden ? 0 : 1, x: isHidden ? 8 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block ${isHidden ? 'pointer-events-none' : ''}`}
    >
      <div className="relative flex h-56 w-10 items-center justify-center">
        <div className="absolute h-full w-px bg-zinc-300 dark:bg-zinc-700" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute h-full w-px origin-top bg-zinc-500/70 dark:bg-zinc-400/70"
        />

        <ul className="relative flex h-full flex-col justify-between py-1">
          {sections.map(({ id, label }) => {
            const isActive = activeSection === id;

            return (
              <li key={id} className="group relative flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => navigateTo(id)}
                  aria-label={`Go to ${label}`}
                  aria-current={isActive ? 'location' : undefined}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-zinc-950"
                >
                  <span
                    className={`h-2 w-2 rounded-full border transition-all duration-200 ${
                      isActive
                        ? 'scale-125 border-cyan-600 bg-cyan-600 dark:border-cyan-400 dark:bg-cyan-400'
                        : 'border-zinc-400 bg-zinc-50 group-hover:border-cyan-600 dark:border-zinc-600 dark:bg-zinc-950 dark:group-hover:border-cyan-400'
                    }`}
                  />
                </button>

                <span className="pointer-events-none absolute right-7 whitespace-nowrap rounded bg-zinc-950 px-2 py-1 font-mono text-[11px] text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-white dark:text-zinc-950">
                  {label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};
