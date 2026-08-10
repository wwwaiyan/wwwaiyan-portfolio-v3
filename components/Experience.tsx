import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { Waypoints } from 'lucide-react';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 35%'],
  });
  const roadmapProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.35,
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate mx-auto w-full max-w-7xl overflow-clip px-4 py-16 md:px-8 md:py-28"
    >
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
        <div className="relative md:col-span-4">
          <div className="md:sticky md:top-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center gap-3 font-mono text-xs font-semibold uppercase text-cyan-600 dark:text-cyan-400"
            >
              <Waypoints size={17} />
              Career roadmap
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 text-4xl font-bold tracking-tighter text-zinc-900 dark:text-white md:text-6xl"
            >
              Experience
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="max-w-xs text-lg text-zinc-500 dark:text-zinc-400"
            >
              A roadmap of roles, responsibilities, and growth across DevOps and infrastructure.
            </motion.p>

            <div className="mt-8 hidden max-w-xs items-center gap-3 md:flex">
              <div className="h-1 flex-1 overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <motion.div
                  className="h-full origin-left bg-cyan-500"
                  style={{ scaleX: prefersReducedMotion ? 1 : roadmapProgress }}
                />
              </div>
              <span className="font-mono text-xs text-zinc-500">
                {String(RESUME_DATA.experience.length).padStart(2, '0')} milestones
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-4 inline-flex rounded-full border border-zinc-200 bg-white/70 px-3 py-1.5 font-mono text-xs text-zinc-600 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-400"
            >
              4+ yrs DevOps & cloud · 10+ yrs total
            </motion.div>
          </div>
        </div>

        <div className="relative md:col-span-8">
          <div className="absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800" />
          <motion.div
            className="absolute bottom-6 left-6 top-6 w-px origin-top -translate-x-1/2 bg-cyan-500"
            style={{ scaleY: prefersReducedMotion ? 1 : roadmapProgress }}
          />

          <div>
            {RESUME_DATA.experience.map((job, index) => {
              const isCurrentRole = job.period.toLowerCase().includes('present');
              const highlights = (job.highlightIndexes ?? [0, 1, 2])
                .map((descriptionIndex) => job.description[descriptionIndex])
                .filter(Boolean);

              return (
                <motion.article
                  key={`${job.company}-${job.period}`}
                  initial="rest"
                  whileInView="active"
                  viewport={{ once: false, amount: 0.45 }}
                  className="relative grid grid-cols-[3rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0 md:gap-6 md:pb-10"
                >
                  <div className="relative z-30 md:self-stretch">
                    <motion.div
                      variants={{
                        rest: { scale: 0.85, borderColor: 'rgb(161 161 170)' },
                        active: { scale: 1, borderColor: 'rgb(6 182 212)' },
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border-2 bg-zinc-50 font-mono text-xs font-bold text-zinc-500 shadow-sm dark:bg-zinc-950 dark:text-zinc-300"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>
                  </div>

                  <motion.div
                    variants={{
                      rest: { opacity: 0.72, y: 16 },
                      active: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`ui-card min-w-0 self-start overflow-hidden rounded-lg border bg-white shadow-lg shadow-zinc-900/5 dark:bg-zinc-900 dark:shadow-black/20 ${isCurrentRole ? 'border-cyan-500/50 dark:border-cyan-500/40' : 'border-zinc-200 dark:border-zinc-800'}`}
                  >
                    <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800">
                      <div className="h-full bg-cyan-500" style={{ width: `${((index + 1) / RESUME_DATA.experience.length) * 100}%` }} />
                    </div>

                    <div className="p-5 md:p-7">
                      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-100 pb-5 dark:border-zinc-800 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <div className="mb-2 flex items-center gap-2 font-mono text-xs font-semibold uppercase text-cyan-600 dark:text-cyan-400">
                            <span
                              className={`h-2 w-2 rounded-full ${isCurrentRole ? 'animate-pulse bg-emerald-500' : 'bg-zinc-400 dark:bg-zinc-600'}`}
                            />
                            {isCurrentRole ? 'Current role' : `Milestone ${String(index + 1).padStart(2, '0')}`}
                          </div>
                          <h3 className="text-xl font-bold leading-tight text-zinc-900 dark:text-zinc-100 md:text-2xl">
                            {job.role}
                          </h3>
                          <p className="mt-2 text-base font-medium text-zinc-600 dark:text-zinc-300 md:text-lg">
                            {job.company}
                          </p>
                        </div>

                        <span className="shrink-0 font-mono text-sm text-zinc-500 dark:text-zinc-400">
                          {job.period}
                        </span>
                      </div>

                      <ul className="space-y-4">
                        {highlights.map((description, descriptionIndex) => (
                          <motion.li
                            key={descriptionIndex}
                            variants={{
                              rest: { opacity: 0, y: 8 },
                              active: { opacity: 1, y: 0 },
                            }}
                            transition={{ duration: 0.35, delay: descriptionIndex * 0.025 }}
                            className="flex items-start text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-base"
                          >
                            <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 bg-cyan-500" />
                            {description}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 font-mono text-xs text-zinc-500 dark:border-zinc-800">
                        <span>Selected impact</span>
                        <span>{String(highlights.length).padStart(2, '0')} highlights</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
