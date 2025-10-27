import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from '../components/AnimatedSection';
import { ContactForm } from '../components/ContactForm';

export const Contact: React.FC = () => {
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
              <span className="text-indigo-400 font-semibold tracking-wide">GET IN TOUCH</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Contact Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Let's discuss how we can help you tackle life's challenges
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-2">
            <div className="glass-card">
              <h2 className="text-2xl font-bold mb-6">
                <span className="gradient-text">Request a Consultation</span>
              </h2>
              <p className="text-slate-300 mb-8">
                Fill out the form below and one of our consultants will reach out to you
                within 24-48 hours (depending on nap schedules).
              </p>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Hours */}
            <AnimatedSection delay={0.2}>
              <div className="glass-card hover:bg-white/10">
              <h3 className="text-xl font-bold text-slate-100 mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm text-slate-300">
                <p><span className="font-semibold text-indigo-400">Monday-Friday:</span> 3:30pm - 7:00pm</p>
                <p className="text-xs text-slate-500">(after school, before meltdowns)</p>
                <p className="mt-3"><span className="font-semibold text-indigo-400">Saturday:</span> 9:00am - 5:00pm</p>
                <p className="text-xs text-slate-500">(availability varies by sports schedule)</p>
                <p className="mt-3"><span className="font-semibold text-indigo-400">Sunday:</span> By appointment only</p>
                <p className="text-xs text-slate-500">(usually closed for family meetings)</p>
                <p className="mt-3"><span className="font-semibold text-indigo-400">Holidays:</span> Closed</p>
                <p className="text-xs text-slate-500">(we're busy being a family)</p>
              </div>
              </div>
            </AnimatedSection>

            {/* Contact Methods */}
            <AnimatedSection delay={0.3}>
              <div className="glass-card hover:bg-white/10">
                <h3 className="text-xl font-bold text-slate-100 mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-indigo-400">Email</p>
                    <p className="text-slate-300">hello@raabarna.se</p>
                  </div>
                  <div>
                    <p className="font-semibold text-indigo-400">Emergency Line</p>
                    <p className="text-slate-300">Just come over and ring the doorbell</p>
                  </div>
                  <div>
                    <p className="font-semibold text-indigo-400">Response Time</p>
                    <p className="text-slate-400 text-xs">
                      24-48 hours (depending on homework load, tantrum frequency,
                      and shoe location emergencies)
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Office Location */}
            <AnimatedSection delay={0.4}>
              <div className="glass-card hover:bg-white/10">
                <h3 className="text-xl font-bold text-slate-100 mb-4">Office Location</h3>
                <p className="text-slate-300 text-sm mb-4">
                  The Big House on Main Street<br />
                  Somewhere Nice, ST 12345
                </p>
                <div className="bg-slate-800/50 rounded-lg h-48 flex items-center justify-center border border-slate-700">
                  <p className="text-slate-500 text-sm">Map Placeholder</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Voicemail Message */}
            <AnimatedSection delay={0.5}>
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
                <h4 className="font-semibold text-indigo-400 mb-2 text-sm">Voicemail Message:</h4>
                <p className="text-xs text-slate-400 italic">
                  "You've reached Raab Consulting. Press 1 for Wilhelm, Press 2 for Nina,
                  Press 3 if you have snacks, or stay on the line if this can wait until naptime."
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/50" />
        <div className="section-container relative z-10">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-block mb-4 px-6 py-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full">
              <span className="text-purple-400 font-semibold tracking-wide">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "Do you really charge those rates?",
                a: "Absolutely! But we're flexible. Payment accepted in cash, Robux, Pokemon cards, or gummy bears depending on which consultant you work with.",
              },
              {
                q: "How quickly can you respond to urgent issues?",
                a: "It depends on the urgency level and whether it conflicts with naptime. True emergencies (like missing shoes before school) typically get priority response.",
              },
              {
                q: "Can I request a specific consultant?",
                a: "Yes! Each consultant brings unique expertise. However, availability may be limited by school schedules, snack times, and general levels of cooperation.",
              },
              {
                q: "Do you offer virtual consultations?",
                a: "Yes! Video calls are available, though sessions may be interrupted by requests for water, snacks, or arbitration of sibling disputes.",
              },
            ].map((faq, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="glass-card hover:bg-white/10">
                  <h3 className="font-bold text-slate-100 mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
