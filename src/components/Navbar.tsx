import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/case-studies', label: 'Case Studies' },
    { to: '/contact', label: 'Contact' },
    { to: '/careers', label: 'Careers' },
  ];

  return (
    <motion.nav
      className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50 shadow-lg shadow-indigo-500/10'
          : 'bg-slate-950/40 backdrop-blur-sm border-b border-slate-800/30'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <motion.span
                className="text-2xl md:text-3xl font-heading font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Raab Consulting
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-4 py-2 group"
              >
                <span
                  className={clsx(
                    'font-medium transition-colors duration-200 relative z-10',
                    location.pathname === link.to
                      ? 'text-indigo-400'
                      : 'text-slate-300 group-hover:text-indigo-400'
                  )}
                >
                  {link.label}
                </span>
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-indigo-500/10 rounded-lg border border-indigo-500/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-indigo-400 focus:outline-none p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-2 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800/50">
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      location.pathname === link.to
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-indigo-400'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
