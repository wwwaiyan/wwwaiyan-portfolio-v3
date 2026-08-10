import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

export const BackgroundEffect: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const [isPointerVisible, setIsPointerVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const hasPointerPosition = useRef(false);
  const { scrollY } = useScroll();

  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 26, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 26, mass: 0.5 });
  const signalX = useSpring(pointerX, { stiffness: 360, damping: 30, mass: 0.3 });
  const signalY = useSpring(pointerY, { stiffness: 360, damping: 30, mass: 0.3 });
  const gridOffsetY = useTransform(scrollY, (value) => prefersReducedMotion ? 0 : (value * -0.025) % 40);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || prefersReducedMotion) return;

    const handlePointerMove = ({ clientX, clientY }: PointerEvent) => {
      if (!hasPointerPosition.current) {
        signalX.jump(clientX);
        signalY.jump(clientY);
        hasPointerPosition.current = true;
      }
      pointerX.set(clientX);
      pointerY.set(clientY);
      setIsPointerVisible(true);
      const target = document.elementFromPoint(clientX, clientY);
      setIsInteractive(Boolean(target?.closest('a, button, input, textarea, select, [role="button"]')));
    };
    const handlePointerLeave = () => {
      setIsPointerVisible(false);
      setIsInteractive(false);
      setIsPointerDown(false);
      hasPointerPosition.current = false;
    };
    const handlePointerDown = () => setIsPointerDown(true);
    const handlePointerUp = () => setIsPointerDown(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('blur', handlePointerLeave);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', handlePointerLeave);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [pointerX, pointerY, prefersReducedMotion, signalX, signalY]);

  const lightSpotlight = useMotionTemplate`
    radial-gradient(
      560px circle at ${smoothX}px ${smoothY}px,
      rgba(8, 145, 178, 0.075),
      rgba(6, 182, 212, 0.018) 50%,
      transparent 78%
    )
  `;
  const darkSpotlight = useMotionTemplate`
    radial-gradient(
      600px circle at ${smoothX}px ${smoothY}px,
      rgba(34, 211, 238, 0.075),
      rgba(6, 182, 212, 0.018) 52%,
      transparent 80%
    )
  `;
  const pointerMask = useMotionTemplate`
    radial-gradient(
      420px circle at ${smoothX}px ${smoothY}px,
      black 6%,
      rgba(0, 0, 0, 0.72) 50%,
      transparent 82%
    )
  `;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      >
        <motion.div
          className="absolute -inset-10 opacity-[0.035] dark:hidden"
          style={{
            y: gridOffsetY,
            backgroundImage: 'radial-gradient(rgba(8, 145, 178, 0.7) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <motion.div
          className="absolute -inset-10 hidden opacity-[0.055] dark:block"
          style={{
            y: gridOffsetY,
            backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.65) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          animate={{ opacity: isPointerVisible && !prefersReducedMotion ? 1 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 dark:hidden mix-blend-multiply">
            <motion.div className="absolute inset-0" style={{ background: lightSpotlight }} />
            <motion.div
              className="absolute -inset-10 opacity-30"
              style={{
                y: gridOffsetY,
                backgroundImage: 'radial-gradient(rgba(8, 145, 178, 0.86) 1.2px, transparent 1.2px)',
                backgroundSize: '40px 40px',
                maskImage: pointerMask,
                WebkitMaskImage: pointerMask,
              }}
            />
          </div>

          <div className="absolute inset-0 hidden dark:block">
            <motion.div className="absolute inset-0" style={{ background: darkSpotlight }} />
            <motion.div
              className="absolute -inset-10 opacity-35"
              style={{
                y: gridOffsetY,
                backgroundImage: 'radial-gradient(rgba(34, 211, 238, 0.82) 1.2px, transparent 1.2px)',
                backgroundSize: '40px 40px',
                maskImage: pointerMask,
                WebkitMaskImage: pointerMask,
              }}
            />
          </div>
        </motion.div>
      </div>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden overflow-hidden md:block">
        <motion.span
          data-cursor-signal="ring"
          className="fixed left-[-14px] top-[-14px] h-7 w-7 rounded-full border border-cyan-600/50 shadow-[0_0_16px_rgba(8,145,178,0.22)] dark:border-cyan-300/55 dark:shadow-[0_0_18px_rgba(34,211,238,0.24)]"
          style={{ x: signalX, y: signalY }}
          animate={{
            opacity: isPointerVisible && !prefersReducedMotion ? 1 : 0,
            scale: isPointerDown ? 0.72 : isInteractive ? 1.55 : 1,
          }}
          transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } }}
        />
        <motion.span
          data-cursor-signal="dot"
          className="fixed left-[-3px] top-[-3px] h-1.5 w-1.5 rounded-full bg-cyan-600 shadow-[0_0_10px_rgba(8,145,178,0.7)] dark:bg-cyan-300 dark:shadow-[0_0_10px_rgba(34,211,238,0.75)]"
          style={{ x: pointerX, y: pointerY }}
          animate={{
            opacity: isPointerVisible && !prefersReducedMotion ? 1 : 0,
            scale: isPointerDown ? 1.7 : isInteractive ? 0.7 : 1,
          }}
          transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.16 } }}
        />
      </div>
    </>
  );
};
