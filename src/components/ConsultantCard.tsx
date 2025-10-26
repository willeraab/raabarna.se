import React from 'react';
import { Consultant } from '../types';

interface ConsultantCardProps {
  consultant: Consultant;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant }) => {
  return (
    <div className="card">
      <div className="flex flex-col items-center text-center">
        <img
          src={consultant.image}
          alt={consultant.name}
          className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-200"
        />
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{consultant.name}</h3>
        <p className="text-primary-600 font-semibold mb-4">{consultant.title}</p>

        <div className="w-full text-left space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {consultant.education.map((edu, idx) => (
                <li key={idx}>• {edu}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {consultant.specializations.slice(0, 4).map((spec, idx) => (
                <li key={idx}>• {spec}</li>
              ))}
              {consultant.specializations.length > 4 && (
                <li className="text-gray-500 italic">
                  + {consultant.specializations.length - 4} more...
                </li>
              )}
            </ul>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 italic">"{consultant.quote}"</p>
          </div>

          <div className="bg-primary-50 rounded-lg p-3 text-center">
            <p className="text-sm font-semibold text-primary-700">{consultant.rate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
