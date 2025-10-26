import React from 'react';

export const Careers: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Careers</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Join our team of elite consultants (if you qualify)
          </p>
        </div>
      </section>

      {/* Current Openings */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-playful shadow-lg p-8 text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Openings: 0</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Raab Consulting Group, we believe in organic growth and maintaining our
              intimate company culture. As such, we are not currently accepting applications
              from outside candidates.
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-playful shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Requirements for Future Consideration
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span>Must share our DNA</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span>Willingness to work holidays</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span>Ability to function on minimal sleep</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span>Must love siblings (even when they're annoying)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span>Food sharing capability (negotiable)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-3">•</span>
                <span>Potty training (preferred but not required)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Package */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Benefits Package
            </h2>
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
                <div key={idx} className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Internship Program */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-playful shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Internship Program</h2>
            <p className="text-gray-600 mb-6">
              We occasionally accept interns (neighborhood kids, cousins) for short-term
              projects including:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span>Backyard game testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span>Video game consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span>Snack evaluation & quality control</span>
                </li>
              </ul>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span>Playdate facilitation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">•</span>
                  <span>Toy testing (rigorous protocols)</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 italic">
              Internships are unpaid but include complimentary snacks and bragging rights.
            </p>
          </div>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="bg-primary-50 py-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Work Here?</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 italic">
                  "I didn't choose this job, but the benefits are pretty good"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Gabriel, 12-year-old Senior Technology Advisor</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 italic">
                  "They let me draw on stuff sometimes"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Linnéa, 8-year-old Creative Director</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 italic">
                  "SNACKS!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Vendela & Vidar, 4-year-old Co-Directors of Chaos Management</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equal Opportunity */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-playful shadow-lg p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Equal Opportunity Employer</h3>
            <p className="text-gray-600 mb-6">
              Raab Consulting is an equal opportunity employer. All siblings receive equal
              distribution of chores, regardless of age, height, or volume of complaints.
              We are committed to maintaining a diverse workforce of various ages and skill levels.
            </p>
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 font-semibold">Application Process:</p>
              <p className="text-sm text-gray-600 italic">
                Not applicable. Birth certificates reviewed on a case-by-case basis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
