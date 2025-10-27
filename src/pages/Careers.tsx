import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';

export const Careers: React.FC = () => {
  return (
    <div className="relative">
      {/* Header Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="section-container text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-6 px-6 py-2 bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 rounded-full">
              <span className="text-indigo-400 font-semibold tracking-wide">JOIN OUR TEAM</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Careers</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join our team of elite consultants (if you qualify)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Current Openings */}
      <AnimatedSection className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="gradient-text">Current Openings: 0</span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              At Raab Consulting Group, we believe in organic growth and maintaining our
              intimate company culture. As such, we are not currently accepting applications
              from outside candidates.
            </p>
          </div>

          {/* Requirements */}
          <div className="glass-card mb-8">
            <h3 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Requirements for Future Consideration</span>
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">•</span>
                <span>Must share our DNA</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">•</span>
                <span>Willingness to work holidays</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">•</span>
                <span>Ability to function on minimal sleep</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">•</span>
                <span>Must love siblings (even when they're annoying)</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">•</span>
                <span>Food sharing capability (negotiable)</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-3">•</span>
                <span>Potty training (preferred but not required)</span>
              </li>
            </ul>
          </div>
        </div>
      </AnimatedSection>

      {/* Benefits Package */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection className="text-center mb-12">
              <div className="inline-block mb-4 px-6 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
                <span className="text-purple-400 font-semibold tracking-wide">BENEFITS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Benefits Package</span>
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Meals', desc: 'Unlimited meals (3x daily, plus snacks)' },
                { title: 'Housing', desc: 'Free housing (shared accommodations)' },
                { title: 'Laundry', desc: 'Laundry services (self-service after age 10)' },
                { title: 'Transportation', desc: 'Transportation to activities (car seats provided)' },
                { title: 'Celebrations', desc: 'Annual birthday celebrations (guaranteed)' },
                { title: 'Vacation', desc: 'Guaranteed vacation time (family trips, non-negotiable destinations)' },
                { title: 'Education', desc: 'College fund (if you behave)' },
                { title: 'Healthcare', desc: 'Dental coverage (brushing twice daily mandatory)' },
                { title: 'Entertainment', desc: 'Bedtime stories (market rate)' },
                { title: 'Life Insurance', desc: 'Unconditional love (priceless)' },
              ].map((benefit, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.05}>
                  <div className="glass-card hover:bg-white/10">
                    <h3 className="font-bold text-slate-100 mb-2">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm">{benefit.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Program */}
      <AnimatedSection className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card">
            <h2 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Internship Program</span>
            </h2>
            <p className="text-slate-300 mb-6">
              We occasionally accept interns (neighborhood kids, cousins) for short-term
              projects including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Backyard game testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Video game consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Snack evaluation & quality control</span>
                </li>
              </ul>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Playdate facilitation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2">•</span>
                  <span>Toy testing (rigorous protocols)</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-slate-500 italic">
              Internships are unpaid but include complimentary snacks and bragging rights.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Why Work Here */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection className="mb-12">
              <div className="inline-block mb-4 px-6 py-2 bg-pink-500/10 backdrop-blur-sm border border-pink-500/20 rounded-full">
                <span className="text-pink-400 font-semibold tracking-wide">TESTIMONIALS</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Why Work Here?</span>
              </h2>
            </AnimatedSection>

            <div className="space-y-6">
              {[
                { quote: "I didn't choose this job, but the benefits are pretty good", name: "Gabriel, 12-year-old Senior Technology Advisor" },
                { quote: "They let me draw on stuff sometimes", name: "Linnéa, 8-year-old Creative Director" },
                { quote: "SNACKS!", name: "Vendela & Vidar, 4-year-old Co-Directors of Chaos Management" },
              ].map((testimonial, idx) => (
                <AnimatedSection key={idx} delay={idx * 0.1}>
                  <div className="glass-card hover:bg-white/10">
                    <p className="text-slate-300 italic mb-2">
                      "{testimonial.quote}"
                    </p>
                    <p className="text-sm text-slate-500">- {testimonial.name}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <AnimatedSection className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card text-center">
            <h3 className="text-xl font-bold mb-4">
              <span className="gradient-text">Equal Opportunity Employer</span>
            </h3>
            <p className="text-slate-300 mb-6">
              Raab Consulting is an equal opportunity employer. All siblings receive equal
              distribution of chores, regardless of age, height, or volume of complaints.
              We are committed to maintaining a diverse workforce of various ages and skill levels.
            </p>
            <div className="border-t border-slate-700 pt-6">
              <p className="text-sm text-indigo-400 font-semibold">Application Process:</p>
              <p className="text-sm text-slate-400 italic">
                Not applicable. Birth certificates reviewed on a case-by-case basis.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};
