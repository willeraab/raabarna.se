import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { StatsCounter } from '../components/StatsCounter';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { ServiceCard } from '../components/ServiceCard';
import { stats } from '../data/stats';
import { testimonials } from '../data/testimonials';
import { services } from '../data/services';

export const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Raab Consulting Group
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Comprehensive Solutions from Naptime to Nasdaq
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-primary-50">
            Professional consultancy services across an unprecedented range of disciplines.
            From strategic planning to chaos management, we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="primary" className="bg-white text-primary-700 hover:bg-gray-100">
                Schedule Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" className="bg-primary-700 text-white hover:bg-primary-600 border-2 border-white">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsCounter stats={stats} />

      {/* Services Overview */}
      <section className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive consulting across six specialized divisions,
            each led by expert consultants with unique perspectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/services">
            <Button variant="primary">View Full Service Details</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Clients Say
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 text-white">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Challenges?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Our team of six expert consultants is standing by (when they're not napping).
          </p>
          <Link to="/contact">
            <Button variant="primary" className="bg-white text-primary-700 hover:bg-gray-100">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
