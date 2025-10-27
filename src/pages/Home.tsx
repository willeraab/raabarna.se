import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { StatsCounter } from '../components/StatsCounter';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import { ServiceCard } from '../components/ServiceCard';
import { AnimatedSection } from '../components/AnimatedSection';
import { ParticleBackground } from '../components/ParticleBackground';
import { stats } from '../data/stats';
import { testimonials } from '../data/testimonials';
import { services } from '../data/services';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      <ParticleBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-6 px-6 py-2 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full"
            >
              <span className="text-indigo-400 font-semibold tracking-wide">ENTERPRISE CONSULTING EXCELLENCE</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-shadow">
              <span className="gradient-text">Raab Consulting Group</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl mb-6 text-slate-300 font-light"
            >
              Strategic Solutions from <span className="text-indigo-400 font-semibold">Nasdaq</span> to <span className="text-purple-400 font-semibold">Naptime</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-slate-400 leading-relaxed"
            >
              Professional consultancy services across an unprecedented range of disciplines.
              Leveraging decades of combined experience to deliver transformative results
              across industries, markets, and nap schedules.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link to="/contact">
                <Button variant="primary" className="btn-primary text-lg px-10 py-5">
                  Schedule Consultation
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" className="btn-secondary text-lg px-10 py-5">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="relative z-10">
        <StatsCounter stats={stats} />
      </AnimatedSection>

      {/* Services Overview */}
      <section className="section-container relative z-10">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
            <span className="text-purple-400 font-semibold tracking-wide">OUR EXPERTISE</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Comprehensive Services</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Six specialized divisions led by expert consultants with unique perspectives.
            From strategic planning to chaos management, we deliver results that exceed expectations.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 0.1}>
              <ServiceCard service={service} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center">
          <Link to="/services">
            <Button variant="primary" className="btn-primary text-lg px-10 py-5">
              View Full Service Details
            </Button>
          </Link>
        </AnimatedSection>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-block mb-4 px-6 py-2 bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 rounded-full">
              <span className="text-pink-400 font-semibold tracking-wide">CLIENT SUCCESS STORIES</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Trusted by Industry Leaders</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Don't just take our word for it. See what our clients have to say about
              the transformative impact of our consulting services.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <TestimonialCarousel testimonials={testimonials} />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-600/30" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
        </div>

        <div className="section-container text-center relative z-10">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Ready to Transform Your Business?</span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Our team of six expert consultants is standing by to deliver
              strategic solutions tailored to your unique challenges.
            </p>
            <Link to="/contact">
              <Button variant="primary" className="btn-primary text-lg px-12 py-6">
                Get Started Today
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};
