
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { RESUME_DATA } from '../constants';

export const Certificates: React.FC = () => {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900 dark:text-white tracking-tight">
                        Certifications & Learning Badges
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                        Validated expertise through industry-recognized credentials and specialized courses.
                    </p>
                </motion.div>

                {/* Unified Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {RESUME_DATA.certificates.map((cert, index) => (
                        <motion.a
                            key={index}
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: index * 0.1
                                    }
                                }
                            }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="group relative flex flex-col items-center text-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-cyan-500/30 hover:shadow-xl hover:shadow-cyan-900/10 transition-all duration-300"
                        >
                            {/* Decorative Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50 dark:to-zinc-900/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Logo Image - Big transparent logo without border */}
                            <div className="relative mb-4 w-32 h-32 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                <img
                                    src={cert.logo}
                                    alt={cert.title}
                                    loading="lazy"
                                    className="w-full h-full object-contain drop-shadow-md"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-sm md:text-base font-bold text-zinc-900 dark:text-white mb-2 leading-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                        {cert.title}
                                    </h3>
                                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                                        {cert.issuer}
                                    </p>
                                </div>
                            </div>

                            {/* External Link Icon */}
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <ExternalLink size={14} className="text-zinc-400 hover:text-cyan-500" />
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>
        </section>
    );
};
