/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Page } from './types';

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
import WorkPage from './components/portfolio/WorkPage';
import CaseStudyPage from './components/portfolio/CaseStudyPage';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';

import SEO from './components/SEO';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const location = useLocation();

  // Update current page based on location
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setCurrentPage(Page.HOME);
    else if (path === '/about') setCurrentPage(Page.ABOUT);
    else if (path === '/work') setCurrentPage(Page.WORK);
    else if (path === '/pricing') setCurrentPage(Page.PRICING);
    else if (path === '/contact') setCurrentPage(Page.CONTACT);
    
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
      <div className="py-24 bg-soft-gradient flex justify-center border-y border-accent-rose/10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-charcoal mb-8 tracking-tight">Ready to <span className="text-accent-rose italic">grow?</span></h2>
          <button 
            onClick={() => handlePageChange(Page.CONTACT)}
            className="bg-accent-teal text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-accent-rose transition-all duration-500 shadow-lg shadow-accent-teal/20 font-sans"
          >
            Let's Talk
          </button>
        </motion.div>
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
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              <Route path="/pricing" element={<Pricing onPageChange={handlePageChange} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
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