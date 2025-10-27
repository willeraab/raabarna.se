import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative h-full glass-card hover:bg-white/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full blur-2xl" />

        <div className="relative z-10">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400" />
              <p className="text-sm font-semibold text-indigo-400 tracking-wide">
                {service.consultant}
              </p>
            </div>

            <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
              {service.category}
            </h3>

            <p className="text-slate-300 leading-relaxed mb-6">
              {service.description}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              <h4 className="font-semibold text-slate-300 text-sm tracking-wide">
                SERVICES
              </h4>
              <div className="h-px flex-1 bg-gradient-to-l from-purple-500/50 to-transparent" />
            </div>

            <ul className="space-y-3">
              {service.services.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: isHovered ? idx * 0.05 : 0 }}
                  className="flex items-start group/item"
                >
                  <svg
                    className="w-5 h-5 mr-3 mt-0.5 text-indigo-400 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-slate-400 group-hover/item:text-slate-300 transition-colors">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
