import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { SkillsGraph } from './SkillsGraph';

export const Skills: React.FC = () => {
  return (
    <section className="py-32 bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-center mb-16"
        >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">
            Technical Arsenal
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                A visual breakdown of my technical expertise distributed across key infrastructure domains.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Chart Column */}
            <div className="lg:col-span-5 order-1 lg:order-2">
                 <div className="bg-white dark:bg-zinc-900/20 rounded-3xl p-4 border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                    <SkillsGraph />
                 </div>
                 <p className="text-center text-xs text-zinc-400 font-mono mt-4 uppercase tracking-widest">
                    Skill Distribution
                 </p>
            </div>

            {/* List Column */}
            <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RESUME_DATA.skills.map((category, catIndex) => (
                    <motion.div 
                    key={catIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0, y: 20 }, // Vertical drift instead of horizontal slide
                        visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: {
                                duration: 0.6,
                                ease: [0.22, 1, 0.36, 1],
                                delay: catIndex * 0.1,
                                staggerChildren: 0.05
                            }
                        }
                    }}
                    className="bg-white dark:bg-zinc-900/40 p-6 rounded-2xl border border-zinc-200 dark:border-white/5 shadow-sm dark:shadow-none hover:border-cyan-500/30 transition-all duration-300"
                    >
                    <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-4 font-mono uppercase tracking-wider flex items-center justify-between">
                        {category.category}
                        <span className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-1 rounded">
                            {category.items.length}
                        </span>
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, itemIndex) => (
                        <motion.span
                            key={itemIndex}
                            variants={{
                                hidden: { opacity: 0, scale: 0.95, y: 5 }, // Subtler scale and lift
                                visible: { opacity: 1, scale: 1, y: 0 }
                            }}
                            transition={{ 
                                duration: 0.4,
                                ease: "easeOut"
                            }}
                            className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-cyan-700 dark:hover:text-white transition-colors cursor-default"
                        >
                            {skill}
                        </motion.span>
                        ))}
                    </div>
                    </motion.div>
                ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};