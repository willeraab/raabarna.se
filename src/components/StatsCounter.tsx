import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stat } from '../types';

interface StatsCounterProps {
  stats: Stat[];
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10" />
      <div className="absolute inset-0 backdrop-blur-sm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <motion.p
                  className="relative text-5xl md:text-6xl lg:text-7xl font-bold font-heading gradient-text"
                  initial={{ scale: 0.5 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  {stat.value}
                </motion.p>
              </div>
              <p className="text-slate-400 text-sm md:text-base font-medium tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
