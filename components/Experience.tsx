import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

export const Experience: React.FC = () => {
  return (
    <section className="relative w-full py-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Sticky Header */}
        <div className="md:col-span-4 relative">
          <div className="sticky top-32">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tighter"
            >
              Experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, delay: 0.2 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-zinc-500 dark:text-zinc-500 text-lg max-w-xs"
            >
              A timeline of my professional journey in DevOps and Infrastructure.
            </motion.p>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="md:col-span-8 space-y-12 relative border-l border-zinc-200 dark:border-zinc-800 ml-2 md:ml-0 pl-8 md:pl-12 transition-colors duration-300">
            
          {RESUME_DATA.experience.map((job, index) => (
            <motion.div 
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 30 }, // Reduced from 50 for subtler entry
                visible: {
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1], // Cinematic cubic bezier
                        delay: index * 0.1,
                        staggerChildren: 0.08
                    }
                }
              }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <motion.div 
                variants={{
                    hidden: { scale: 0, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
                }}
                className="absolute -left-[41px] md:-left-[57px] top-8 w-5 h-5 rounded-full border-4 border-zinc-50 dark:border-black z-10 bg-cyan-500"
              />

              {/* Card Wrapper for Hover Effect */}
              <motion.div
                whileHover={{ scale: 1.01, y: -2 }} // Subtler hover
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6 -ml-6 rounded-2xl border border-transparent hover:border-cyan-500/30 hover:bg-white dark:hover:bg-zinc-900/50 hover:shadow-lg dark:hover:shadow-cyan-900/10 transition-colors duration-300"
              >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                    <motion.h3 
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                      className="text-2xl font-bold text-zinc-800 dark:text-zinc-100"
                    >
                        {job.role}
                    </motion.h3>
                    <motion.span 
                      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                      className="font-mono text-cyan-600 dark:text-cyan-500 text-sm mt-1 md:mt-0"
                    >
                        {job.period}
                    </motion.span>
                  </div>
                  
                  <motion.div 
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                    className="text-xl text-zinc-600 dark:text-zinc-400 font-medium mb-4 flex items-center gap-2"
                  >
                     {job.company}
                     <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-500">{job.location}</span>
                  </motion.div>

                  <ul className="space-y-3">
                    {job.description.map((desc, i) => (
                      <motion.li 
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 10 }, // Changed from x offset to soft vertical drift
                            visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base flex items-start"
                      >
                        <span className="mr-3 text-cyan-500/50 mt-1.5">•</span>
                        {desc}
                      </motion.li>
                    ))}
                  </ul>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};