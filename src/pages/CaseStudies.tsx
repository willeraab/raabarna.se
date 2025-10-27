import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { caseStudies } from '../data/caseStudies';

export const CaseStudies: React.FC = () => {
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
              <span className="text-indigo-400 font-semibold tracking-wide">SUCCESS STORIES</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Real-world examples of our consulting excellence in action
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <AnimatedSection className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-slate-300 leading-relaxed">
            Explore our portfolio of successful engagements. Each case study demonstrates
            our commitment to delivering measurable results, innovative solutions, and
            occasionally finding creative ways to avoid total chaos.
          </p>
        </div>
      </AnimatedSection>

      {/* Case Studies Grid */}
      <section className="section-container">
        <div className="space-y-12">
          {caseStudies.map((caseStudy, index) => (
            <AnimatedSection key={caseStudy.id} delay={index * 0.1}>
              <div className="max-w-4xl mx-auto">
                <CaseStudyCard caseStudy={caseStudy} detailed={true} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Success Metrics Summary */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-block mb-4 px-6 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
                <span className="text-purple-400 font-semibold tracking-wide">BY THE NUMBERS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Overall Success Metrics</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '100%', label: 'Project Completion Rate' },
                { value: '89%', label: 'Client Satisfaction' },
                { value: '47%', label: 'Average Efficiency Gain' },
                { value: '∞', label: 'Creative Solutions' },
              ].map((metric, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="glass-card text-center group hover:bg-white/10">
                    <p className="text-4xl font-bold gradient-text mb-2">{metric.value}</p>
                    <p className="text-sm text-slate-400">{metric.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto glass-card">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Your Success Story Awaits</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Ready to become our next case study? Let's discuss how we can help
              transform your challenges into success stories.
            </p>
            <a href="/contact" className="btn-primary inline-block px-10 py-5">
              Start Your Project
            </a>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};
