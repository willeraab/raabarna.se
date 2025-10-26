import React from 'react';
import { ServiceCard } from '../components/ServiceCard';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { servicePackages } from '../data/packages';
import clsx from 'clsx';

export const Services: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Expert consulting across five specialized divisions, delivered by our team of seasoned professionals
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Service Packages */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the package that best fits your consulting needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePackages.map((pkg, idx) => (
              <div
                key={idx}
                className={clsx(
                  'bg-white rounded-playful shadow-lg p-6',
                  pkg.featured && 'ring-4 ring-primary-500 transform scale-105'
                )}
              >
                {pkg.featured && (
                  <div className="bg-primary-500 text-white text-xs font-bold py-1 px-3 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold text-primary-600 mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start text-sm text-gray-600">
                      <span className="text-primary-500 mr-2 flex-shrink-0">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.featured ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  Select Plan
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Not sure which package is right for you? We can help!
            </p>
            <Link to="/contact">
              <Button variant="primary">Request a Quote</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
        <div className="bg-primary-50 rounded-playful-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Schedule a consultation with one of our expert consultants today
          </p>
          <Link to="/contact">
            <Button variant="primary">Contact Us</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
