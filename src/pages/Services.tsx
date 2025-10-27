import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { ServiceCard } from '../components/ServiceCard';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { servicePackages } from '../data/packages';
import clsx from 'clsx';

export const Services: React.FC = () => {
  return (
    <div className="relative">
      {/* Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 animated-gradient-bg" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float-left" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-right" />
        </div>

        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-6 py-2 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full">
              <span className="text-indigo-400 font-semibold tracking-wide">WHAT WE OFFER</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Our Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Expert consulting across five specialized divisions, delivered by our team of seasoned professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.1}>
              <ServiceCard service={service} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Service Packages */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
              <span className="text-purple-400 font-semibold tracking-wide">PRICING</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Service Packages</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose the package that best fits your consulting needs and budget
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePackages.map((pkg, idx) => {
              // Map package names to budget parameter values
              const budgetParam = pkg.name.toLowerCase().includes('bronze') ? 'bronze'
                : pkg.name.toLowerCase().includes('silver') ? 'silver'
                : pkg.name.toLowerCase().includes('gold') ? 'gold'
                : pkg.name.toLowerCase().includes('platinum') ? 'platinum'
                : 'custom';

              return (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div
                    className={clsx(
                      'glass-card h-full relative',
                      pkg.featured && 'ring-2 ring-indigo-500/50 transform scale-105 bg-white/10'
                    )}
                  >
                    {pkg.featured && (
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full inline-block mb-4">
                        MOST POPULAR
                      </div>
                    )}
                    <h3 className="text-2xl font-bold mb-2 text-slate-100">{pkg.name}</h3>
                    <p className="text-3xl font-bold gradient-text mb-6">{pkg.price}</p>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature, featureIdx) => (
                        <li key={featureIdx} className="flex items-start text-sm text-slate-300">
                          <span className="text-indigo-400 mr-2 flex-shrink-0">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={`/contact?budget=${budgetParam}`}>
                      <Button
                        variant={pkg.featured ? 'primary' : 'secondary'}
                        className="w-full"
                      >
                        Select Plan
                      </Button>
                    </Link>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <p className="text-slate-400 mb-6">
              Not sure which package is right for you? We can help!
            </p>
            <Link to="/contact">
              <Button variant="primary">Request a Quote</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
        <AnimatedSection>
          <div className="glass-card max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Ready to Get Started?</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Schedule a consultation with one of our expert consultants today
            </p>
            <Link to="/contact">
              <Button variant="primary" className="btn-primary px-10 py-5">Contact Us</Button>
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};
