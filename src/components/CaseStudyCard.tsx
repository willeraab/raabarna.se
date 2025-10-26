import React from 'react';
import { CaseStudy } from '../types';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  detailed?: boolean;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, detailed = false }) => {
  return (
    <div className="card h-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{caseStudy.title}</h3>
      <p className="text-sm text-primary-600 mb-4">Client: {caseStudy.client}</p>

      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Challenge</h4>
          <p className="text-gray-600">{caseStudy.challenge}</p>
        </div>

        {detailed && (
          <>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Solution</h4>
              <p className="text-gray-600 whitespace-pre-line">{caseStudy.solution}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
              <ul className="text-gray-600 space-y-1">
                {caseStudy.results.map((result, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-500 mr-2">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {caseStudy.metrics && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-2xl font-bold text-primary-600">{metric.value}</p>
                      <p className="text-xs text-gray-600">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-gray-600 italic">"{caseStudy.testimonial}"</p>
              {caseStudy.timeline && (
                <p className="text-xs text-gray-500 mt-2">Timeline: {caseStudy.timeline}</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
