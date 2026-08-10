import React, { useEffect } from 'react';
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

interface LogoPosition {
  src: string;
  darkSrc?: string;
  top: number;
  left: number;
  size: number;
  depth: number;
  phase: number;
}

const logos: LogoPosition[] = [
  { src: '/assets/logos/aws.svg', darkSrc: '/assets/logos/aws-dark.svg', top: 20, left: 112, size: 42, depth: 10, phase: 0 },
  { src: '/assets/logos/google-cloud.svg', top: 48, left: 222, size: 39, depth: 16, phase: 0.8 },
  { src: '/assets/logos/kubernetes.svg', top: 112, left: 32, size: 43, depth: 20, phase: 1.6 },
  { src: '/assets/logos/docker.svg', top: 146, left: 226, size: 41, depth: 13, phase: 2.4 },
  { src: '/assets/logos/terraform.svg', top: 226, left: 76, size: 38, depth: 17, phase: 3.2 },
  { src: '/assets/logos/grafana.svg', top: 258, left: 224, size: 40, depth: 11, phase: 4 },
];

interface MotionLogoProps extends LogoPosition {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}

const MotionLogo: React.FC<MotionLogoProps> = ({
  src,
  darkSrc,
  top,
  left,
  size,
  depth,
  pointerX,
  pointerY,
}) => {
  const x = useTransform(pointerX, (value) => value * depth);
  const y = useTransform(pointerY, (value) => value * depth * 0.72);
  const rotate = useTransform(pointerX, (value) => value * depth * 0.35);

  return (
    <motion.span
      className="absolute flex items-center justify-center"
      style={{ top, left, width: size, height: size, x, y, rotate }}
    >
      <span className="flex h-full w-full items-center justify-center">
        <img
          src={src}
          alt=""
          aria-hidden="true"
          width={size}
          height={size}
          className={`h-full w-full object-contain ${darkSrc ? 'dark:hidden' : ''}`}
        />
        {darkSrc && (
          <img
            src={darkSrc}
            alt=""
            aria-hidden="true"
            width={size}
            height={size}
            className="hidden h-full w-full object-contain dark:block"
          />
        )}
      </span>
    </motion.span>
  );
};

export const LogoMotion: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 75, damping: 25, mass: 0.5 });
  const pointerY = useSpring(rawY, { stiffness: 75, damping: 25, mass: 0.5 });
  const { scrollY } = useScroll();
  const introOpacity = useTransform(scrollY, [0, 420], [1, 0]);
  const introY = useTransform(scrollY, [0, 420], [0, -24]);
  const introScale = useTransform(scrollY, [0, 420], [1, 0.92]);
  const introRotate = useTransform(scrollY, [0, 420], [0, 7]);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (prefersReducedMotion || !finePointer.matches) return;

    const handlePointerMove = ({ clientX, clientY }: PointerEvent) => {
      rawX.set((clientX / window.innerWidth - 0.5) * 2);
      rawY.set((clientY / window.innerHeight - 0.5) * 2);
    };
    const resetPointer = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', resetPointer);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', resetPointer);
    };
  }, [pointerX, pointerY, rawX, rawY, prefersReducedMotion]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ opacity: introOpacity, y: introY, scale: introScale, rotate: introRotate }}
      className="pointer-events-none fixed right-[3vw] top-[17vh] z-20 hidden h-[21rem] w-[19rem] xl:block 2xl:right-[7vw]"
    >
      <div className="relative h-full w-full opacity-65">
        {logos.map((logo) => (
          <MotionLogo
            key={logo.src}
            {...logo}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        ))}
      </div>
    </motion.div>
  );
};
