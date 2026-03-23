import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../../types';
import { Instagram, Linkedin, Mail, X, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import siteSettingsJson from '../../data/siteSettings.json';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const currentYear = new Date().getFullYear();
  const [siteData, setSiteData] = React.useState<any>(siteSettingsJson);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [secretCode, setSecretCode] = React.useState('');
  const [error, setError] = React.useState(false);
  const navigate = useNavigate();

  const handleCopyrightClick = () => {
    setIsModalOpen(true);
    setSecretCode('');
    setError(false);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode === '1994RM') {
      localStorage.setItem('founderAuth', 'true');
      setIsModalOpen(false);
      navigate('/founder/dashboard');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleNavClick = (page: Page, path: string) => {
    onPageChange(page);
    navigate(path);
  };

  return (
    <footer className="bg-transparent border-t border-accent-rose/10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <button 
              onClick={() => onPageChange(Page.HOME)}
              className="flex items-center gap-4 group mb-8"
            >
              {siteData?.logo ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent-rose/20 bg-white p-0.5 group-hover:border-accent-rose/50 transition-colors duration-500">
                  <img 
                    src={siteData.logo} 
                    alt={siteData.agencyName} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : null}
              <span className="text-3xl font-display font-bold tracking-tighter text-charcoal group-hover:text-accent-rose transition-colors duration-500">
                {siteData?.agencyName?.toUpperCase() || 'JOONEXA'}<span className="text-accent-rose">.</span>
              </span>
            </button>
            <p className="text-charcoal/70 max-w-sm leading-relaxed mb-8 font-sans">
              {siteData?.tagline || 'Elevating brands through strategic influencer partnerships and high-conversion digital experiences. Founded by Rimi.'}
            </p>
            <div className="flex gap-4">
              {siteData?.social?.instagram && (
                <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteData?.social?.linkedin && (
                <a href={siteData.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {siteData?.contactEmail && (
                <a href={`mailto:${siteData.contactEmail}`} className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-charcoal font-bold mb-6 uppercase tracking-widest text-xs font-sans">Navigation</h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick(Page.HOME, '/')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">Home</button></li>
              <li><button onClick={() => handleNavClick(Page.ABOUT, '/about')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">About</button></li>
              <li><button onClick={() => handleNavClick(Page.SERVICES, '/#services')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">Services</button></li>
              <li><button onClick={() => handleNavClick(Page.WORK, '/work')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">Work</button></li>
              <li><button onClick={() => handleNavClick(Page.CREATOR_NETWORK, '/creator-network')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">Creator Network</button></li>
              <li><button onClick={() => handleNavClick(Page.PRICING, '/pricing')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">Pricing</button></li>
              <li><button onClick={() => handleNavClick(Page.CONTACT, '/contact')} className="text-charcoal/70 hover:text-accent-rose transition-colors text-sm font-sans">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-charcoal font-bold mb-6 uppercase tracking-widest text-xs font-sans">Contact</h4>
            <ul className="space-y-4">
              <li className="text-charcoal/70 text-sm font-sans">
                <a href={`mailto:${siteData?.contactEmail || 'rimi@joonexa-collective.com'}`} className="hover:text-accent-rose transition-colors">
                  {siteData?.contactEmail || 'rimi@joonexa-collective.com'}
                </a>
              </li>
              <li className="text-charcoal/70 text-sm font-sans">Founder: {siteData?.founderName || 'Rimi'}</li>
              <motion.li 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-charcoal/70 text-sm font-sans cursor-pointer select-none hover:text-charcoal transition-colors"
                onClick={handleCopyrightClick}
              >
                © {currentYear} {siteData?.agencyName || 'Joonexa Collective'}
              </motion.li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/20 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-charcoal/40 text-[10px] font-sans uppercase tracking-widest">
            Minimalist. Modern. Aesthetic.
          </p>
          <div className="flex gap-8 items-center">
            <p className="text-charcoal/40 text-xs font-sans">Privacy Policy</p>
            <p className="text-charcoal/40 text-xs font-sans">Terms of Service</p>
          </div>
        </div>
      </div>

      {/* Secret Code Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/60 backdrop-blur-sm px-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-sm rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-charcoal/30 hover:text-charcoal transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-accent-rose/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-accent-rose" />
                </div>
                <h3 className="text-xl font-display font-bold text-charcoal">Founder Access</h3>
                <p className="text-xs text-charcoal/60 font-sans mt-1">Enter your authorization code</p>
              </div>

              <form onSubmit={handleCodeSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="password"
                    autoFocus
                    placeholder="••••••"
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value.toUpperCase())}
                    className={`w-full bg-bg-soft border ${error ? 'border-accent-rose' : 'border-charcoal/20'} rounded-xl py-4 px-6 text-center text-lg tracking-[0.5em] font-mono focus:outline-none focus:border-accent-rose transition-all`}
                  />
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-accent-rose font-bold text-center mt-2 uppercase tracking-widest"
                    >
                      Invalid Authorization Code
                    </motion.p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full py-4 bg-charcoal text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-accent-rose transition-all duration-300"
                >
                  Verify Identity
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
