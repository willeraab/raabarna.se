import React from 'react';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { caseStudies } from '../data/caseStudies';

export const CaseStudies: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Real-world examples of our consulting excellence in action
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-600">
            Explore our portfolio of successful engagements. Each case study demonstrates
            our commitment to delivering measurable results, innovative solutions, and
            occasionally finding creative ways to avoid total chaos.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="section-container">
        <div className="space-y-12">
          {caseStudies.map((caseStudy) => (
            <div key={caseStudy.id} className="max-w-4xl mx-auto">
              <CaseStudyCard caseStudy={caseStudy} detailed={true} />
            </div>
          ))}
        </div>
      </section>

      {/* Success Metrics Summary */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Overall Success Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">100%</p>
                <p className="text-sm text-gray-600">Project Completion Rate</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">89%</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">47%</p>
                <p className="text-sm text-gray-600">Average Efficiency Gain</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-4xl font-bold text-primary-600 mb-2">∞</p>
                <p className="text-sm text-gray-600">Creative Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Success Story Awaits
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Ready to become our next case study? Let's discuss how we can help
            transform your challenges into success stories.
          </p>
          <a href="/contact" className="btn-primary inline-block">
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
};
