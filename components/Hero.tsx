import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Transform scroll Y into opacity (1 -> 0) and blur (0px -> 10px)
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const blur = useTransform(scrollY, [0, 300], ["0px", "10px"]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  // Refined staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Slightly tighter stagger for cohesion
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 15, // Reduced from 20 for subtler movement
      opacity: 0,
      filter: 'blur(5px)' // Reduced from 10px for a softer, less aggressive effect
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2, // Slower duration for elegance
        ease: [0.25, 1, 0.5, 1] // Cubic bezier for a smooth "settling" effect
      }
    }
  };

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-200 via-zinc-50 to-zinc-50 dark:from-black dark:via-zinc-950 dark:to-zinc-950 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        style={{ opacity, filter: `blur(${blur})`, scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4"
      >
        <motion.p variants={itemVariants} className="text-cyan-600 dark:text-cyan-400 font-mono text-sm tracking-widest mb-4 uppercase">
          Portfolio
        </motion.p>
        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-6">
          {RESUME_DATA.name.split(' ').map((n, i) => (
            <span key={i} className="inline-block mr-4 md:mr-8">{n}</span>
          ))}
        </motion.h1>
        <motion.h2 variants={itemVariants} className="text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 font-light tracking-wide">
          {RESUME_DATA.title}
        </motion.h2>

        <motion.div variants={itemVariants} className="mt-6 flex flex-wrap justify-center gap-3 md:gap-6 text-zinc-500 text-xs md:text-sm font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {RESUME_DATA.contact.location}
          </span>
          <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span>AWS • K8s • Terraform • CI/CD</span>
        </motion.div>

        {/* Professional Summary - Attractive Card */}
        <motion.div
          variants={itemVariants}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="relative p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50 shadow-xl shadow-zinc-900/5 dark:shadow-black/20">
            {/* Decorative quote mark */}
            <span className="absolute -top-4 left-6 text-6xl text-cyan-500/20 font-serif">"</span>

            <p className="relative text-zinc-700 dark:text-zinc-300 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-left">
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">DevOps Engineer</span> with{' '}
              <span className="font-semibold text-zinc-900 dark:text-white">3+ years</span> of experience building{' '}
              <span className="underline decoration-cyan-500/50 decoration-2 underline-offset-2">scalable cloud infrastructure</span>,{' '}
              automated CI/CD pipelines, and secure DevSecOps practices.
              Passionate about creating reliable systems that empower teams to ship faster.
            </p>

            {/* Tech pills */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-5">
              {['AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitOps', 'Prometheus'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }} // Reduced bounce height slightly
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-600"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};