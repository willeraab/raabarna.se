import React from 'react';
import { CaseStudy } from '../types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  detailed?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, detailed = false }) => {
  return (
    <div className="glass-card h-full group hover:bg-white/10">
      <h3 className="text-3xl font-bold mb-3">
        <span className="gradient-text">{caseStudy.title}</span>
      </h3>
      <div className="inline-block mb-6 px-4 py-1.5 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full">
        <span className="text-indigo-400 font-semibold text-sm tracking-wide">{caseStudy.client}</span>
      </div>

      <div className="space-y-6 text-base">
        <div>
          <h4 className="font-bold text-lg mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">Challenge</span>
          </h4>
          <p className="text-slate-300 leading-relaxed">{caseStudy.challenge}</p>
        </div>

        {detailed && (
          <>
            <div>
              <h4 className="font-bold text-lg mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Solution</span>
              </h4>
              <p className="text-slate-300 whitespace-pre-line leading-relaxed">{caseStudy.solution}</p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">Results</span>
              </h4>
              <ul className="text-slate-300 space-y-2">
                {caseStudy.results.map((result, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-green-400 mr-2 mt-0.5 flex-shrink-0">✓</span>
                    <span className="leading-relaxed">{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {caseStudy.metrics && (
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700/50 shadow-lg">
                <h4 className="font-bold text-lg mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400">Key Metrics</span>
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                      <p className="text-3xl font-bold gradient-text mb-1">{metric.value}</p>
                      <p className="text-sm text-slate-400 leading-tight">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-slate-700/50 pt-6 mt-6">
              <div className="bg-slate-800/30 rounded-lg p-4 border-l-4 border-purple-500/50">
                <p className="text-slate-300 italic text-lg leading-relaxed">"{caseStudy.testimonial}"</p>
              </div>
              {caseStudy.timeline && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
                  <span className="text-purple-400 font-semibold text-sm">⏱</span>
                  <span className="text-sm text-slate-300">Timeline: {caseStudy.timeline}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
