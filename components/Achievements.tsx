import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { Achievement } from '../types';

const AchievementCard: React.FC<{ data: Achievement; index: number }> = ({ data, index }) => {
  // Helper to split the metric string (e.g., "-35% Build Time") into value and label
  const firstSpaceIndex = data.metric.indexOf(' ');
  const metricValue = firstSpaceIndex !== -1 ? data.metric.slice(0, firstSpaceIndex) : data.metric;
  const metricLabel = firstSpaceIndex !== -1 ? data.metric.slice(firstSpaceIndex + 1) : '';

  return (
    <div className="sticky top-24 md:top-32 mb-6 last:mb-0">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
            }
        }}
        className="relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 md:p-8 hover:border-cyan-500/20 transition-colors duration-300"
      >
        
        {/* Subtle Gradient Decor */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
          
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-3">
             <div className="flex items-center gap-2">
                <span className="w-4 h-0.5 bg-cyan-500"></span>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  {data.category}
                </span>
             </div>

             <motion.h3 
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white leading-tight"
             >
                {data.title}
             </motion.h3>

             <ul className="space-y-1.5">
                {data.description.map((desc, i) => (
                  <motion.li 
                    key={i} 
                    variants={{
                        hidden: { opacity: 0, y: 10 }, // Changed from x slide to y lift
                        visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed flex items-start gap-2"
                  >
                     <span className="mt-2 w-1 h-1 rounded-full bg-cyan-500 flex-shrink-0" />
                     {desc}
                  </motion.li>
                ))}
             </ul>
          </div>

          {/* Metric Visual (Right or Bottom) */}
          <div className="w-full md:w-auto flex-shrink-0 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800 md:pl-8">
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-1 md:gap-0">
                  <motion.div 
                    variants={{
                        hidden: { scale: 0.9, opacity: 0 },
                        visible: { scale: 1, opacity: 1 }
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400 tracking-tighter"
                  >
                    {metricValue}
                  </motion.div>
                  {metricLabel && (
                    <motion.div 
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        className="text-sm md:text-base font-medium text-zinc-500 dark:text-zinc-400 md:text-right"
                    >
                        {metricLabel}
                    </motion.div>
                  )}
              </div>
          </div>

        </div>

        {/* Index Number Watermark */}
        <div className="absolute bottom-3 right-4 font-mono text-xs font-bold text-zinc-200 dark:text-zinc-800 select-none">
            0{index + 1}
        </div>

      </motion.div>
    </div>
  );
};

export const Achievements: React.FC = () => {
  return (
    <section className="relative py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        <div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
            Key Achievements
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl font-light">
            Quantifiable results delivered through engineering excellence.
            </p>
        </div>
        
        <div className="relative pb-12">
            {RESUME_DATA.achievements.map((achievement, index) => (
                <AchievementCard key={index} data={achievement} index={index} />
            ))}
        </div>

      </div>
    </section>
  );
};