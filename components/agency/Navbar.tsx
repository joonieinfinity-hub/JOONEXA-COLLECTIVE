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
  const [siteData, setSiteData] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/site')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => console.error("Error fetching site data:", err));

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
          className="flex items-center gap-3 group"
        >
          {siteData?.logoUrl ? (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent-rose/20 shadow-xl shadow-accent-rose/10 bg-white p-0.5"
            >
              <img 
                src={siteData.logoUrl} 
                alt={siteData.name} 
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                className="absolute inset-0 bg-accent-rose/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ) : (
            <span className="text-2xl font-display font-bold tracking-tighter text-charcoal">
              {siteData?.name?.toUpperCase() || 'JOONEXA'}<span className="text-accent-rose">.</span>
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.page}
              onClick={() => handleLinkClick(link.page, link.path)}
              className={`text-sm font-medium tracking-wide uppercase transition-all hover:text-accent-rose font-sans relative group ${
                currentPage === link.page ? 'text-charcoal' : 'text-muted'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent-rose transition-transform duration-300 origin-left ${
                currentPage === link.page ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick(Page.CONTACT, '/contact')}
            className="btn-primary text-sm"
          >
            Start Your Project
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-soft/98 backdrop-blur-2xl md:hidden flex flex-col"
          >
            {/* Close button area - to match navbar height */}
            <div className="h-24 flex items-center justify-end px-6">
              <button 
                className="text-charcoal p-2 hover:text-accent-rose transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.page}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ 
                    delay: i * 0.08,
                    type: "spring",
                    damping: 20,
                    stiffness: 100
                  }}
                  onClick={() => handleLinkClick(link.page, link.path)}
                  className={`text-5xl font-display font-bold uppercase tracking-tighter py-3 px-8 w-full text-center transition-all active:scale-95 ${
                    currentPage === link.page ? 'text-accent-rose' : 'text-charcoal hover:text-accent-teal'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: navLinks.length * 0.08 + 0.1 }}
                className="mt-12 w-full max-w-xs"
              >
                <button 
                  onClick={() => handleLinkClick(Page.CONTACT, '/contact')}
                  className="w-full btn-primary text-xl py-5 shadow-xl shadow-accent-rose/20"
                >
                  Start Your Project
                </button>
              </motion.div>
            </div>

            {/* Mobile Menu Footer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="p-12 border-t border-charcoal/5 flex flex-col items-center gap-4"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted/40 font-sans">
                Joonexa Collective
              </p>
              <div className="flex gap-6">
                <div className="w-1 h-1 rounded-full bg-accent-rose" />
                <div className="w-1 h-1 rounded-full bg-accent-teal" />
                <div className="w-1 h-1 rounded-full bg-charcoal/20" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
