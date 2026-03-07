import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Page } from '../../types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', page: Page.HOME, path: '/' },
    { name: 'About', page: Page.ABOUT, path: '/about' },
    { name: 'Services', page: Page.SERVICES, path: '/#services' },
    { name: 'Work', page: Page.WORK, path: '/work' },
    { name: 'Pricing', page: Page.PRICING, path: '/pricing' },
    { name: 'Contact', page: Page.CONTACT, path: '/contact' },
  ];

  const handleLinkClick = (page: Page, path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname === '/') {
        const id = path.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(path);
      }
    } else {
      onPageChange(page);
      navigate(path);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-bg-soft/80 backdrop-blur-xl py-4 border-b border-accent-rose/10 shadow-sm' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/"
          onClick={() => onPageChange(Page.HOME)}
          className="text-2xl font-display font-bold tracking-tighter text-charcoal hover:opacity-80 transition-opacity flex items-center gap-1"
        >
          JOONEXA<span className="text-accent-rose">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleLinkClick(link.page, link.path)}
              className={`text-sm font-medium tracking-wide uppercase transition-all hover:text-accent-rose font-sans ${
                currentPage === link.page ? 'text-charcoal' : 'text-muted'
              }`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick(Page.CONTACT, '/contact')}
            className="bg-accent-teal text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-accent-rose transition-all duration-500 shadow-lg shadow-accent-teal/10 font-sans"
          >
            Start a Project
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-bg-soft flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleLinkClick(link.page, link.path)}
                className={`text-4xl font-display font-bold uppercase tracking-tight ${
                  currentPage === link.page ? 'text-accent-rose' : 'text-charcoal'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleLinkClick(Page.CONTACT, '/contact')}
              className="mt-4 bg-accent-teal text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-accent-rose transition-colors duration-500 font-sans"
            >
              Start a Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
