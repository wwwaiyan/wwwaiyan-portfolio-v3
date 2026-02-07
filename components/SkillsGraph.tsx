import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';

export const SkillsGraph: React.FC = () => {
  // Transform data for the chart
  // We use the number of items in each category as a proxy for "Breadth of Knowledge"
  const data = RESUME_DATA.skills.map(skill => ({
    subject: skill.category.split(' ')[0], // Take first word for cleaner axis label (e.g., "Cloud" instead of "Cloud & IaC")
    fullSubject: skill.category,
    A: skill.items.length,
    fullMark: 8, // Max scale
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="w-full h-[300px] md:h-[400px] flex justify-center items-center relative z-10"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#71717a" strokeOpacity={0.3} />

          <PolarAngleAxis
            dataKey="subject"
            tick={({ payload, x, y, textAnchor }) => {
              return (
                <text
                  x={x}
                  y={y}
                  className="text-xs md:text-sm font-bold font-mono fill-zinc-600 dark:fill-zinc-300"
                  textAnchor={textAnchor}
                >
                  {payload.value}
                </text>
              );
            }}
          />

          {/* Hidden radius axis to set scale */}
          <PolarRadiusAxis angle={30} domain={[0, 8]} tick={false} axisLine={false} />

          <Radar
            name="Skills"
            dataKey="A"
            stroke="#06b6d4" // cyan-500
            strokeWidth={3}
            fill="#06b6d4"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Decorative center glowing dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full blur-[10px]" />
    </motion.div>
  );
};