import React, { forwardRef, useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  id: string;
  index: number;
  children: React.ReactNode;
  className?: string;
}

export const ScrollSection = forwardRef<HTMLDivElement, ScrollSectionProps>(
  ({ id, index, children, className = '' }, forwardedRef) => {
    const localRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
      target: localRef,
      offset: ['start 94%', 'start 28%'],
    });
    const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 80,
      damping: 26,
      mass: 0.35,
      restDelta: 0.001,
    });
    const opacity = useTransform(smoothProgress, [0, 0.8], [0.9, 1]);

    const setRef = useCallback((node: HTMLDivElement | null) => {
      localRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    }, [forwardedRef]);

    return (
      <motion.div
        ref={setRef}
        id={id}
        data-scroll-section
        className={`scroll-stage relative ${className}`}
        style={{
          opacity: reducedMotion || index === 0 ? 1 : opacity,
        }}
      >
        {children}
      </motion.div>
    );
  },
);

ScrollSection.displayName = 'ScrollSection';
