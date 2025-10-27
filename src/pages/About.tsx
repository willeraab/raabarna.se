import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { ConsultantCard } from '../components/ConsultantCard';
import { consultants } from '../data/consultants';

export const About: React.FC = () => {
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
              <span className="text-indigo-400 font-semibold tracking-wide">WHO WE ARE</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">About Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Meet the team behind Raab Consulting Group
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company History */}
      <AnimatedSection className="section-container">
        <div className="max-w-4xl mx-auto glass-card">
          <h2 className="text-4xl font-bold mb-8">
            <span className="gradient-text">Our Story</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
            <p>
              Founded in 2010, Raab Consulting Group began with just two consultants and a dream.
              Through organic growth (and biology), we've expanded to a full-service consultancy
              offering expertise that ranges from corporate strategy to why the sky is blue.
            </p>
            <p>
              Our commitment to work-life integration is unmatched - we literally live where we work.
              Over the years, we've developed proprietary methodologies for managing chaos, optimizing
              routines, and finding creative solutions to problems you didn't know you had.
            </p>
            <p>
              Today, we serve clients ranging from immediate family members to neighborhood pets,
              delivering results that consistently exceed expectations (especially the low ones).
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Mission & Values */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block mb-4 px-6 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
                  <span className="text-purple-400 font-semibold tracking-wide">OUR FOUNDATION</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">Mission & Values</span>
                </h2>
              </div>

              <div className="glass-card mb-12">
                <h3 className="text-2xl font-bold text-indigo-400 mb-4">Our Mission</h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  To provide comprehensive consulting services across an unnecessarily broad spectrum
                  of human experience, from boardroom presentations to bedtime negotiations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Innovation',
                    description: "If it hasn't been tried, we'll try it (safety not guaranteed)",
                  },
                  {
                    title: 'Integrity',
                    description: "We're honest about what we don't know (which is a lot)",
                  },
                  {
                    title: 'Collaboration',
                    description: "Teamwork makes the dream work (when we're not fighting)",
                  },
                  {
                    title: 'Excellence',
                    description: 'We aim for the stars and usually hit the ceiling',
                  },
                  {
                    title: 'Family First',
                    description: 'Because we have no choice',
                  },
                  {
                    title: 'Humor',
                    description: 'Taking our work seriously, but never ourselves',
                  },
                ].map((value, idx) => (
                  <AnimatedSection key={idx} delay={idx * 0.1}>
                    <div className="glass-card h-full group hover:bg-white/10">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all">
                            {value.title}
                          </h3>
                          <p className="text-slate-400">{value.description}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-block mb-4 px-6 py-2 bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 rounded-full">
            <span className="text-pink-400 font-semibold tracking-wide">OUR TEAM</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Meet Our Consultants</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Six brilliant minds, one unstoppable force. Each bringing unique expertise
            and perspectives to deliver exceptional results.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant, index) => (
            <AnimatedSection key={consultant.id} delay={index * 0.1}>
              <ConsultantCard consultant={consultant} />
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};
