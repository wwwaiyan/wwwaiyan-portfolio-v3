import React, { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react';
import { AVAILABLE_ROLES, RESUME_DATA } from '../constants';

interface HeroProps {
  onOpenResume: () => void;
}

interface InteractiveNameProps {
  name: string;
  reducedMotion: boolean;
  onActiveChange: (active: boolean) => void;
}

const PRIMARY_ROLE = 'DevOps & Platform Engineer';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const InteractiveName: React.FC<InteractiveNameProps> = ({ name, reducedMotion, onActiveChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const rawTagX = useMotionValue(0);
  const rawTagY = useMotionValue(0);
  const tagX = useSpring(rawTagX, { stiffness: 280, damping: 26, mass: 0.28 });
  const tagY = useSpring(rawTagY, { stiffness: 280, damping: 26, mass: 0.28 });
  const words = name.split(' ');
  const wordOffsets = words.map((_, wordIndex) =>
    words.slice(0, wordIndex).reduce((total, word) => total + word.length, 0)
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    rawTagX.set(Math.max(8, Math.min(bounds.width - 190, localX + 14)));
    rawTagY.set(Math.max(-18, localY - 30));
    setIsActive(true);
    onActiveChange(true);
  };

  const resetName = () => {
    setHoveredIndex(null);
    setIsActive(false);
    onActiveChange(false);
  };

  return (
    <span
      className="relative inline-block cursor-default"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetName}
    >
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <React.Fragment key={word}>
            <span className="inline-flex whitespace-nowrap">
              {Array.from(word).map((character, characterIndex) => {
                const index = wordOffsets[wordIndex] + characterIndex;
                const distance = hoveredIndex === null ? Number.POSITIVE_INFINITY : Math.abs(index - hoveredIndex);
                const lift = reducedMotion ? 0 : distance === 0 ? -9 : distance === 1 ? -5 : distance === 2 ? -2 : 0;
                const rotation = reducedMotion || distance > 1
                  ? 0
                  : index < (hoveredIndex ?? index) ? -1.5 : index > (hoveredIndex ?? index) ? 1.5 : 0;

                return (
                  <motion.span
                    key={`${character}-${characterIndex}`}
                    className={`inline-block transition-colors duration-200 ${
                      distance === 0
                        ? 'text-cyan-600 dark:text-cyan-300'
                        : distance === 1
                          ? 'text-cyan-700 dark:text-cyan-200'
                          : 'text-zinc-950 dark:text-white'
                    }`}
                    animate={{ y: lift, rotate: rotation }}
                    transition={{ type: 'spring', stiffness: 360, damping: 24, mass: 0.35 }}
                    onPointerEnter={(event) => {
                      if (!reducedMotion && event.pointerType === 'mouse') setHoveredIndex(index);
                    }}
                  >
                    {character}
                  </motion.span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 && ' '}
          </React.Fragment>
        ))}
      </span>

      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 3 }}
            transition={{ duration: 0.18 }}
            style={{ x: tagX, top: tagY }}
            className="pointer-events-none absolute left-0 z-10 whitespace-nowrap font-mono text-[10px] font-semibold uppercase text-cyan-700 dark:text-cyan-300"
          >
            {PRIMARY_ROLE}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isRoleFollowing, setIsRoleFollowing] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 360], [1, 0]);
  const y = useTransform(scrollY, [0, 360], [0, -28]);
  const cueOpacity = useTransform(scrollY, [0, 160], [1, 0]);
  const rawPointerX = useMotionValue(0);
  const rawPointerY = useMotionValue(0);
  const pointerX = useSpring(rawPointerX, { stiffness: 90, damping: 26, mass: 0.45 });
  const pointerY = useSpring(rawPointerY, { stiffness: 90, damping: 26, mass: 0.45 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    rawPointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * -7);
    rawPointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -5);
  };

  const resetPointer = () => {
    rawPointerX.set(0);
    rawPointerY.set(0);
  };

  return (
    <section
      className="relative flex min-h-[76svh] items-center overflow-hidden bg-zinc-50 transition-colors duration-300 dark:bg-zinc-950 md:min-h-[82svh]"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >

      <motion.div
        style={{ opacity, y }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-40 mx-auto w-full max-w-7xl px-6 pb-10 pt-24 md:px-10 md:pb-14 md:pt-28"
      >
        <motion.div className="max-w-5xl" style={{ x: pointerX, y: pointerY }}>
          <motion.div
            variants={itemVariants}
            className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs font-semibold uppercase text-cyan-700 dark:text-cyan-400 md:text-sm"
          >
            <span className="h-px w-8 bg-zinc-400 dark:bg-zinc-600" />
            <motion.span
              animate={{ opacity: isRoleFollowing ? 0 : 1, y: isRoleFollowing ? -4 : 0 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {PRIMARY_ROLE}
            </motion.span>
          </motion.div>

          <h1
            aria-label={RESUME_DATA.name}
            className="max-w-5xl text-6xl font-bold leading-[0.98] tracking-normal text-zinc-950 dark:text-white sm:text-7xl lg:text-[7rem]"
          >
            <InteractiveName
              name={RESUME_DATA.name}
              reducedMotion={Boolean(prefersReducedMotion)}
              onActiveChange={setIsRoleFollowing}
            />
          </h1>

          <p className="mt-7 max-w-3xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-300 md:text-2xl md:leading-relaxed">
            I build reliable cloud platforms and automation, and I am exploring agentic operations for safer, faster delivery.
          </p>

          <motion.div
            variants={itemVariants}
            aria-label={`Available for ${AVAILABLE_ROLES.join(', ')}`}
            className="mt-6 flex max-w-4xl flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-zinc-500 dark:text-zinc-400 md:text-sm"
          >
            <span className="inline-flex items-center gap-2 font-semibold uppercase text-zinc-700 dark:text-zinc-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.1)]" />
              Available for
            </span>
            {AVAILABLE_ROLES.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-cyan-300 dark:focus:ring-offset-zinc-950"
            >
              <FileText size={18} />
              View resume
            </button>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/wwwaiyan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                title="GitHub"
                className="ui-icon inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
              >
                <Github size={19} />
              </a>

              <a
                href="https://linkedin.com/in/waiyansoe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                title="LinkedIn"
                className="ui-icon inline-flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-zinc-50 text-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
              >
                <Linkedin size={19} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.a
        href="#experience"
        aria-label="Scroll to experience"
        style={{ opacity: cueOpacity }}
        className="group absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 text-zinc-500 transition-colors hover:text-cyan-700 dark:text-zinc-500 dark:hover:text-cyan-300 md:block"
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="ui-icon flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white/55 text-zinc-700 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/55 dark:text-zinc-300"
        >
          <ArrowDown size={17} />
        </motion.span>
      </motion.a>
    </section>
  );
};
