import React from 'react';
import { Page } from '../../types';
import { Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface FooterProps {
  onPageChange: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavClick = (page: Page, path: string) => {
    onPageChange(page);
    navigate(path);
  };

  return (
    <footer className="bg-white border-t border-accent-rose/10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <button 
              onClick={() => onPageChange(Page.HOME)}
              className="text-3xl font-display font-bold tracking-tighter text-charcoal mb-6"
            >
              JOONEXA<span className="text-accent-rose">.</span>
            </button>
            <p className="text-muted max-w-sm leading-relaxed mb-8 font-sans">
              Elevating brands through strategic influencer partnerships and high-conversion digital experiences. Founded by Rimi.
            </p>
            <div className="flex gap-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-charcoal/10 flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-charcoal font-bold mb-6 uppercase tracking-widest text-xs font-sans">Navigation</h4>
            <ul className="space-y-4">
              <li><button onClick={() => handleNavClick(Page.HOME, '/')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">Home</button></li>
              <li><button onClick={() => handleNavClick(Page.ABOUT, '/about')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">About</button></li>
              <li><button onClick={() => handleNavClick(Page.SERVICES, '/#services')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">Services</button></li>
              <li><button onClick={() => handleNavClick(Page.WORK, '/our-work')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">Our Work</button></li>
              <li><button onClick={() => handleNavClick(Page.CREATOR_NETWORK, '/creator-network')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">Creator Network</button></li>
              <li><button onClick={() => handleNavClick(Page.PRICING, '/pricing')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">Pricing</button></li>
              <li><button onClick={() => handleNavClick(Page.CONTACT, '/contact')} className="text-muted hover:text-accent-rose transition-colors text-sm font-sans">Contact</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-charcoal font-bold mb-6 uppercase tracking-widest text-xs font-sans">Contact</h4>
            <ul className="space-y-4">
              <li className="text-muted text-sm font-sans">hello@joonexa-collective.com</li>
              <li className="text-muted text-sm font-sans">Founder: Rimi</li>
              <li className="text-muted text-sm font-sans">© {currentYear} Joonexa Collective</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted/50 text-[10px] font-sans uppercase tracking-widest">
            Minimalist. Modern. Aesthetic.
          </p>
          <div className="flex gap-8 items-center">
            <Link 
              to="/login" 
              data-cursor="Admin"
              className="text-muted/10 hover:text-accent-teal transition-colors text-[10px] uppercase tracking-widest font-bold font-sans"
            >
              Founder Login
            </Link>
            <p className="text-muted/50 text-xs font-sans">Privacy Policy</p>
            <p className="text-muted/50 text-xs font-sans">Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
