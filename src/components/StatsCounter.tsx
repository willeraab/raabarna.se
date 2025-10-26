import React from 'react';
import { Stat } from '../types';

interface StatsCounterProps {
  stats: Stat[];
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats }) => {
  return (
    <div className="bg-primary-700 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl md:text-5xl font-bold font-heading mb-2">
                {stat.value}
              </p>
              <p className="text-primary-100 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
