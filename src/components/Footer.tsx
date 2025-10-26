import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-heading font-bold mb-4">
              Raab Consulting Group
            </h3>
            <p className="text-gray-400 mb-4">
              Comprehensive Solutions from Naptime to Nasdaq
            </p>
            <p className="text-sm text-gray-500">
              Est. 2010 • 6 Consultants • ∞ Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-primary-400 transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-primary-400 transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: hello@raabarna.se</li>
              <li className="pt-2">
                <Link to="/contact" className="text-primary-400 hover:text-primary-300">
                  Get in Touch →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p className="mb-2">
            © {currentYear} Raab Consulting Group. All rights reserved.
          </p>
          <p className="text-xs italic">
            Results may vary. Not responsible for increased family chaos. No refunds on sibling disputes.
          </p>
        </div>
      </div>
    </footer>
  );
};
