import React from 'react';
import { ConsultantCard } from '../components/ConsultantCard';
import { consultants } from '../data/consultants';

export const About: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Meet the team behind Raab Consulting Group
          </p>
        </div>
      </section>

      {/* Company History */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              Founded in 2025, Raab Consulting Group began with just two consultants and a dream.
              Through organic growth (and biology), we've expanded to a full-service consultancy
              offering expertise that ranges from corporate strategy to why the sky is blue.
            </p>
            <p className="mb-4">
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
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Mission & Values
            </h2>

            <div className="bg-white rounded-playful shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-primary-700 mb-4">Our Mission</h3>
              <p className="text-gray-600">
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
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Meet Our Consultants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {consultants.map((consultant) => (
            <ConsultantCard key={consultant.id} consultant={consultant} />
          ))}
        </div>
      </section>
    </div>
  );
};
