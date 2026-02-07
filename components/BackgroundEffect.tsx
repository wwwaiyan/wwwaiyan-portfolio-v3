import React, { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export const BackgroundEffect: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      mouseX.set(clientX);
      mouseY.set(clientY);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      
      {/* 
         LIGHT MODE CONFIGURATION
         - Uses 'multiply' blend mode so it darkens the white background without obscuring text.
         - Darker cyan dots for visibility.
      */}
      <div className="absolute inset-0 dark:hidden mix-blend-multiply">
        {/* Spotlight - Subtle Cyan Tint */}
        <motion.div
            className="absolute inset-0 opacity-100 transition-opacity duration-300"
            style={{
            background: useMotionTemplate`
                radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(34, 211, 238, 0.15),
                transparent 80%
                )
            `,
            }}
        />
        {/* Grid - Darker Cyan/Teal Dots */}
        <motion.div
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage: "radial-gradient(#0891b2 1px, transparent 1px)", // cyan-600
                backgroundSize: "30px 30px",
                maskImage: useMotionTemplate`
                    radial-gradient(
                        350px circle at ${mouseX}px ${mouseY}px,
                        black,
                        transparent
                    )
                `,
                WebkitMaskImage: useMotionTemplate`
                    radial-gradient(
                        350px circle at ${mouseX}px ${mouseY}px,
                        black,
                        transparent
                    )
                `
            }}
        />
      </div>

      {/* 
         DARK MODE CONFIGURATION
         - Standard overlay 'screen' behavior (default).
         - Bright cyan dots/glow.
      */}
      <div className="absolute inset-0 hidden dark:block">
         {/* Spotlight - Glow */}
        <motion.div
            className="absolute inset-0 opacity-100 transition-opacity duration-300"
            style={{
            background: useMotionTemplate`
                radial-gradient(
                600px circle at ${mouseX}px ${mouseY}px,
                rgba(6, 182, 212, 0.08),
                transparent 80%
                )
            `,
            }}
        />
        {/* Grid - Bright Dots */}
        <motion.div
            className="absolute inset-0 opacity-40"
            style={{
                backgroundImage: "radial-gradient(#06b6d4 1.5px, transparent 1.5px)",
                backgroundSize: "40px 40px",
                maskImage: useMotionTemplate`
                    radial-gradient(
                        350px circle at ${mouseX}px ${mouseY}px,
                        black,
                        transparent
                    )
                `,
                WebkitMaskImage: useMotionTemplate`
                    radial-gradient(
                        350px circle at ${mouseX}px ${mouseY}px,
                        black,
                        transparent
                    )
                `
            }}
        />
      </div>

    </div>
  );
};