import React, { useState } from 'react';
import { Button } from './Button';
import { consultants } from '../data/consultants';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultant: '',
    issueType: '',
    bestTime: '',
    message: '',
    budget: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send to a backend or form service
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="consultant" className="block text-sm font-semibold text-gray-700 mb-2">
            Preferred Consultant
          </label>
          <select
            id="consultant"
            name="consultant"
            value={formData.consultant}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">No preference</option>
            {consultants.map((consultant) => (
              <option key={consultant.id} value={consultant.name}>
                {consultant.name} - {consultant.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="issueType" className="block text-sm font-semibold text-gray-700 mb-2">
            Issue Type
          </label>
          <select
            id="issueType"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select type</option>
            <option value="urgent">Urgent - Immediate Chaos</option>
            <option value="high">High - Needs Resolution Soon</option>
            <option value="medium">Medium - General Consulting</option>
            <option value="low">Low - Just Curious</option>
          </select>
        </div>

        <div>
          <label htmlFor="bestTime" className="block text-sm font-semibold text-gray-700 mb-2">
            Best Time to Reach
          </label>
          <input
            type="text"
            id="bestTime"
            name="bestTime"
            placeholder="e.g., Weekdays after 3pm"
            value={formData.bestTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Challenge Description *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your consulting needs..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
          Budget Range
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Select budget</option>
          <option value="bronze">Bronze - $99/month</option>
          <option value="silver">Silver - $299/month</option>
          <option value="gold">Gold - $599/month</option>
          <option value="platinum">Platinum - $1,999/month</option>
          <option value="custom">Custom - Let's Discuss</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Button type="submit" variant="primary">
          Submit Request
        </Button>
        {submitted && (
          <p className="text-green-600 font-semibold">
            Thank you! We'll be in touch soon (probably).
          </p>
        )}
      </div>
    </form>
  );
};
