import React from 'react';
import { ContactForm } from '../components/ContactForm';

export const Contact: React.FC = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Let's discuss how we can help you tackle life's challenges
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-playful shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Request a Consultation
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and one of our consultants will reach out to you
                within 24-48 hours (depending on nap schedules).
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="bg-white rounded-playful shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-semibold">Monday-Friday:</span> 3:30pm - 7:00pm</p>
                <p className="text-xs text-gray-500">(after school, before meltdowns)</p>
                <p className="mt-3"><span className="font-semibold">Saturday:</span> 9:00am - 5:00pm</p>
                <p className="text-xs text-gray-500">(availability varies by sports schedule)</p>
                <p className="mt-3"><span className="font-semibold">Sunday:</span> By appointment only</p>
                <p className="text-xs text-gray-500">(usually closed for family meetings)</p>
                <p className="mt-3"><span className="font-semibold">Holidays:</span> Closed</p>
                <p className="text-xs text-gray-500">(we're busy being a family)</p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-white rounded-playful shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">hello@raabconsulting.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Emergency Line</p>
                  <p className="text-gray-600">Just come over and ring the doorbell</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Response Time</p>
                  <p className="text-gray-600 text-xs">
                    24-48 hours (depending on homework load, tantrum frequency,
                    and shoe location emergencies)
                  </p>
                </div>
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-playful shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Office Location</h3>
              <p className="text-gray-600 text-sm mb-4">
                The Big House on Main Street<br />
                Somewhere Nice, ST 12345
              </p>
              <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                <p className="text-gray-500 text-sm">Map Placeholder</p>
              </div>
            </div>

            {/* Voicemail Message */}
            <div className="bg-primary-50 rounded-playful p-6">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Voicemail Message:</h4>
              <p className="text-xs text-gray-600 italic">
                "You've reached Raab Consulting. Press 1 for Wilhelm, Press 2 for Nina,
                Press 3 if you have snacks, or stay on the line if this can wait until naptime."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
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
              <div key={idx} className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
