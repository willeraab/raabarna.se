import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="card h-full">
      <div className="mb-4">
        <p className="text-sm text-primary-600 font-semibold mb-2">Led by {service.consultant}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.category}</h3>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900 text-sm">Services Include:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {service.services.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-primary-500 mr-2">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
