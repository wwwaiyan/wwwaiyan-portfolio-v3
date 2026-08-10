import React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { RESUME_DATA } from '../constants';

const labelByCategory: Record<string, string> = {
  'Cloud Infrastructure': 'Cloud',
  Containerization: 'Containers',
  'CI/CD & DevOps': 'CI/CD',
  Observability: 'Observability',
  'AI-Assisted Operations': 'AI Ops',
  DevSecOps: 'DevSecOps',
  Development: 'Development',
};
const centerX = 250;
const centerY = 190;
const radius = 112;
const labelRadius = 154;
const maximum = 8;

interface SkillsGraphProps {
  activeIndex?: number | null;
  onActiveChange?: (index: number | null) => void;
}

const pointAt = (angle: number, distance: number) => ({
  x: centerX + Math.cos(angle) * distance,
  y: centerY + Math.sin(angle) * distance,
});

export const SkillsGraph: React.FC<SkillsGraphProps> = ({ activeIndex = null, onActiveChange }) => {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 110, damping: 24, mass: 0.45 });
  const smoothY = useSpring(pointerY, { stiffness: 110, damping: 24, mass: 0.45 });
  const rotateY = useTransform(smoothX, [-1, 1], [-2.5, 2.5]);
  const rotateX = useTransform(smoothY, [-1, 1], [2.5, -2.5]);

  const sector = (Math.PI * 2) / RESUME_DATA.skills.length;
  const data = RESUME_DATA.skills.map((skill, index) => ({
    label: labelByCategory[skill.category] ?? skill.category,
    value: skill.items.length,
    angle: -Math.PI / 2 + index * sector,
  }));

  const dataPoints = data
    .map(({ angle, value }, index) => {
      const emphasizedValue = index === activeIndex ? Math.min(maximum, value + 0.6) : value;
      const point = pointAt(angle, radius * (emphasizedValue / maximum));
      return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
    })
    .join(' ');

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    pointerX.set(normalizedX);
    pointerY.set(normalizedY);

    const angle = Math.atan2(normalizedY, normalizedX);
    const nearestAxis = ((Math.round((angle + Math.PI / 2) / sector) % data.length) + data.length) % data.length;
    onActiveChange?.(nearestAxis);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
    onActiveChange?.(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65 }}
      className="aspect-[5/4] w-full"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformPerspective: 900,
      }}
    >
      <svg
        viewBox="0 0 500 400"
        role="img"
        aria-labelledby="skills-chart-title skills-chart-description"
        className="h-full w-full overflow-visible"
      >
        <title id="skills-chart-title">Technical toolkit breadth</title>
        <desc id="skills-chart-description">
          A radar chart based on the number of documented technologies in each engineering category.
        </desc>

        {[0.25, 0.5, 0.75, 1].map((level) => {
          const points = data
            .map(({ angle }) => {
              const point = pointAt(angle, radius * level);
              return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
            })
            .join(' ');

          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              className="stroke-zinc-300 dark:stroke-zinc-700"
              strokeWidth="1"
            />
          );
        })}

        {data.map(({ angle, label }, index) => {
          const edge = pointAt(angle, radius);
          const labelPoint = pointAt(angle, labelRadius);
          const horizontal = Math.cos(angle);
          const textAnchor = horizontal > 0.25 ? 'start' : horizontal < -0.25 ? 'end' : 'middle';
          const isActive = index === activeIndex;
          const isMuted = activeIndex !== null && !isActive;

          return (
            <g key={label}>
              <motion.line
                x1={centerX}
                y1={centerY}
                x2={edge.x}
                y2={edge.y}
                className={isActive ? 'stroke-cyan-500 dark:stroke-cyan-400' : 'stroke-zinc-300 dark:stroke-zinc-700'}
                animate={{ opacity: isMuted ? 0.45 : 1, strokeWidth: isActive ? 2 : 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor={textAnchor}
                dominantBaseline="middle"
                className={`font-mono text-[13px] font-semibold ${
                  isActive
                    ? 'fill-cyan-700 dark:fill-cyan-300'
                    : 'fill-zinc-600 dark:fill-zinc-300'
                }`}
                animate={{ opacity: isMuted ? 0.45 : 1, scale: isActive ? 1.06 : 1 }}
                transition={{ duration: 0.25 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                {label}
              </motion.text>
            </g>
          );
        })}

        <motion.polygon
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          animate={{ points: dataPoints }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fill-cyan-500/20 stroke-cyan-600 dark:fill-cyan-400/20 dark:stroke-cyan-400"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {data.map(({ angle, value, label }, index) => {
          const isActive = index === activeIndex;
          const emphasizedValue = isActive ? Math.min(maximum, value + 0.6) : value;
          const point = pointAt(angle, radius * (emphasizedValue / maximum));
          return (
            <motion.circle
              key={`${label}-point`}
              animate={{ cx: point.x, cy: point.y, r: isActive ? 5 : 3.5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fill-cyan-700 dark:fill-cyan-300"
            />
          );
        })}
      </svg>
    </motion.div>
  );
};
