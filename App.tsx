/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { Page } from './types';
import { ArrowRight } from 'lucide-react';

// Components
import Navbar from './components/agency/Navbar';
import Footer from './components/agency/Footer';
import Hero from './components/agency/Hero';
import Trust from './components/agency/Trust';
import Services from './components/agency/Services';
import Work from './components/agency/Work';
import Pricing from './components/agency/Pricing';
import Contact from './components/agency/Contact';
import About from './components/agency/About';
import HowItWorks from './components/agency/HowItWorks';
import CreatorNetwork from './components/agency/CreatorNetwork';
import CustomCursor from './components/CustomCursor';

// New Pages
import WorkPage from './pages/work';
import CaseStudyPage from './pages/case-study/[slug]';
import PricingSection from './components/PricingSection';
import StudioEdit from './components/portfolio/StudioEdit';
import Login from './components/admin/Login';
import { Navigate } from 'react-router-dom';

import SEO from './components/SEO';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isFounderAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const location = useLocation();
  const navigate = useNavigate();

  // Update current page based on location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentPage(Page.HOME);
    else if (path === '/about') setCurrentPage(Page.ABOUT);
    else if (path === '/work' || path.startsWith('/case-studies/')) setCurrentPage(Page.WORK);
    else if (path === '/pricing') setCurrentPage(Page.PRICING);
    else if (path === '/contact') setCurrentPage(Page.CONTACT);
    else if (path === '/creator-network') setCurrentPage(Page.CREATOR_NETWORK);
    
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
  };

  const HomePage = () => (
    <>
      <SEO 
        title="Joonexa Collective | Premium Influencer Marketing Agency"
        description="Elevating brands through strategic influencer partnerships and high-conversion digital experiences. Founded by Rimi."
      />
      <Hero onPageChange={handlePageChange} />
      <Trust />
      <HowItWorks />
      <div id="services">
        <Services onPageChange={handlePageChange} />
      </div>
      <CreatorNetwork />
      <div id="work">
        <Work onPageChange={handlePageChange} />
      </div>
      <div id="pricing">
        <PricingSection onPageChange={handlePageChange} />
      </div>
      <div className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[4rem] bg-charcoal p-12 md:p-24 text-center border border-white/5"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-rose/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-teal/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-accent-teal text-xs font-bold uppercase tracking-[0.3em] mb-6 inline-block font-sans"
              >
                Next Steps
              </motion.span>
              <h2 className="text-5xl md:text-8xl font-display font-bold text-white mb-12 tracking-tighter leading-none">
                Ready to <span className="text-accent-rose italic">scale</span> your brand?
              </h2>
              <p className="text-white/60 text-lg md:text-xl mb-12 font-sans leading-relaxed">
                Join our collective of visionary brands and creators. Let's build a digital presence that actually converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={() => {
                    handlePageChange(Page.CONTACT);
                    navigate('/contact');
                  }}
                  className="btn-primary text-xl py-6 px-12 group"
                >
                  Start Your Project
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </motion.div>
                </button>
                <button 
                  onClick={() => {
                    handlePageChange(Page.WORK);
                    navigate('/work');
                  }}
                  className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-all font-sans"
                >
                  View Case Studies
                </button>
              </div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />
          </motion.div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-bg-soft text-charcoal selection:bg-accent-rose selection:text-white">
      <CustomCursor />
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
              <Route path="/pricing" element={<PricingSection onPageChange={handlePageChange} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/creator-network" element={<CreatorNetwork />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/studio-edit" 
                element={
                  <ProtectedRoute>
                    <StudioEdit />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer onPageChange={handlePageChange} />
    </div>
  );
};

export default App;