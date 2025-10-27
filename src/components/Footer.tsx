import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900/80 backdrop-blur-sm border-t border-slate-800/50 text-slate-300">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="gradient-text text-2xl font-heading font-bold mb-4">
              Raab Consulting Group
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Strategic Solutions from Nasdaq to Naptime
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span className="px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                Est. 2010
              </span>
              <span className="px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
                6 Consultants
              </span>
              <span className="px-3 py-1 bg-pink-500/10 rounded-full border border-pink-500/20">
                ∞ Solutions
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-6 tracking-wide">QUICK LINKS</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-400 transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-indigo-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="hover:text-indigo-400 transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-indigo-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/case-studies"
                  className="hover:text-indigo-400 transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-indigo-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="hover:text-indigo-400 transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-indigo-400 transition-all duration-300 mr-0 group-hover:mr-2" />
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-100 font-semibold mb-6 tracking-wide">CONTACT</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>hello@raabarna.se</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors group"
                >
                  Get in Touch
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 mt-12 pt-8 text-center">
          <p className="text-slate-400 mb-3">
            © {currentYear} Raab Consulting Group. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 italic">
            Results may vary. Not responsible for increased family chaos. No refunds on sibling disputes.
          </p>
        </div>
      </div>
    </footer>
  );
};
