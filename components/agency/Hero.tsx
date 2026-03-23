import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Users, Target, Moon, Sun } from 'lucide-react';
import { Page } from '../../types';
import { getSiteSettings } from '../../services/cmsService';

interface HeroProps {
  onPageChange: (page: Page) => void;
}

interface SiteData {
  agencyName: string;
  tagline: string;
  founderName: string;
  resumeUrl: string;
  heroImage: string;
  heroHeadline?: string;
  heroSubheadline?: string;
}

const NICHES = ['Lifestyle', 'Tech', 'Fashion', 'Beauty', 'Travel', 'Wellness'];

const TESTIMONIALS = [
  {
    id: '1',
    quote: "Joonexa Collective transformed our digital presence. Their creator partnerships brought an authenticity we couldn't find elsewhere.",
    name: "Sarah Jenkins",
    title: "Marketing Director",
    company: "Aura Skincare",
  },
  {
    id: '2',
    quote: "The strategic approach Rimi and her team took for our launch was flawless. Our ROI exceeded all expectations.",
    name: "Marcus Thorne",
    title: "CEO",
    company: "Velo Tech",
  },
  {
    id: '3',
    quote: "Elegant design meets data-driven growth. Joonexa is the only agency we trust with our brand identity.",
    name: "Elena Rossi",
    title: "Founder",
    company: "Luxe Living",
  }
];

const Hero: React.FC<HeroProps> = ({ onPageChange }) => {
  const [nicheIndex, setNicheIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSiteSettings();
      if (data) {
        setSiteData(data as SiteData);
      }
    };
    fetchData();

    const nicheInterval = setInterval(() => {
      setNicheIndex((prev) => (prev + 1) % NICHES.length);
    }, 2500);

    const testimonialInterval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => {
      clearInterval(nicheInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 md:pt-32 overflow-hidden bg-hero-luxury text-[#F5F5F3] hero-fade-out">
      {/* Rose Gold Glow */}
      <motion.div 
        animate={{ 
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 rose-gold-glow pointer-events-none" 
      />
      
      {/* Teal Radial Depth */}
      <motion.div 
        animate={{ 
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.03, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute inset-0 z-0 teal-radial-depth pointer-events-none" 
      />
      
      {/* Editorial Background (Subtle Accents) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Soft Blurred Abstract Shapes */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full blur-[120px] bg-accent-rose/20"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
          className="absolute -bottom-40 -left-20 w-[800px] h-[800px] rounded-full blur-[150px] bg-accent-rose/10"
        />
      </div>

      {/* Dark Mode Toggle */}
      <div className="absolute top-32 right-10 z-50">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-3 rounded-full transition-all duration-500 shadow-lg backdrop-blur-md bg-white/5 text-accent-rose hover:bg-white/10"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/5 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3 h-3 text-accent-rose" />
            Empowering the Next Generation of Creators
          </motion.span>
          
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-[#F5F5F3]">
            {siteData?.heroHeadline ? (
              siteData.heroHeadline
            ) : (
              <>
                Connecting Brands with <br />
                <span className="relative inline-block">
                  <span className="text-accent-rose italic">Authentic</span>
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 w-full h-1 rounded-full origin-left bg-accent-rose/30" 
                  />
                </span>
                {' '}
                <div className="h-[1.2em] inline-flex items-center overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={NICHES[nicheIndex]}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      className="text-accent-rose"
                    >
                      {NICHES[nicheIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
                {' '}
                <motion.span
                  custom={2}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i: number) => ({
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.5 + i * 0.2, duration: 0.8, ease: "easeOut" }
                    })
                  }}
                  initial="hidden"
                  animate="visible"
                  className="inline-block italic"
                >
                  Creators
                </motion.span>
              </>
            )}
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-sans text-[#F5F5F3]/75"
          >
            {siteData?.heroSubheadline || siteData?.tagline || (
              <>
                {siteData?.agencyName || 'Joonexa Collective'} is a premium influencer marketing agency founded by {siteData?.founderName || 'Rimi'}. 
                We bridge the gap between visionary brands and high-impact creators through 
                <span className="mx-1 font-medium text-accent-rose highlight-rose">data-driven strategy</span> 
                and elegant storytelling.
              </>
            )}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => {
                onPageChange(Page.CONTACT);
                navigate('/contact');
              }}
              className="btn-primary group shadow-xl shadow-accent-teal/20 hover:shadow-accent-teal/40 transition-all duration-500"
            >
              Start Your Project
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => {
                onPageChange(Page.WORK);
                navigate('/work');
              }}
              className="btn-secondary group shadow-lg shadow-accent-rose/10 hover:shadow-accent-rose/20 transition-all duration-500"
            >
              View Our Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 max-w-xl mx-auto"
          >
            <div className={`relative px-8 py-6 rounded-3xl border transition-colors duration-700 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/40 border-accent-rose/10'}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <p className={`text-sm italic mb-4 leading-relaxed ${isDarkMode ? 'text-white/80' : 'text-charcoal/80'}`}>
                    "{TESTIMONIALS[testimonialIndex].quote}"
                  </p>
                  <div className="flex flex-col items-center">
                    <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-accent-teal' : 'text-accent-rose'}`}>
                      {TESTIMONIALS[testimonialIndex].name}
                    </span>
                    <span className={`text-[10px] font-medium mt-1 ${isDarkMode ? 'text-white/40' : 'text-muted/60'}`}>
                      {TESTIMONIALS[testimonialIndex].title}, {TESTIMONIALS[testimonialIndex].company}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Dots */}
              <div className="flex justify-center gap-1.5 mt-4">
                {TESTIMONIALS.map((_, i) => (
                  <div 
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === testimonialIndex ? (isDarkMode ? 'bg-accent-teal w-3' : 'bg-accent-rose w-3') : (isDarkMode ? 'bg-white/10' : 'bg-charcoal/10')}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Visual - SaaS Style Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
        >
          <div className={`relative aspect-[16/9] rounded-[3rem] overflow-hidden border backdrop-blur-sm p-8 transition-colors duration-700 ${isDarkMode ? 'bg-white/5 border-white/10 shadow-accent-teal/10' : 'bg-white/80 border-accent-rose/10 shadow-accent-rose/10 shadow-2xl'}`}>
            <div className={`w-full h-full rounded-2xl overflow-hidden relative grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-6 ${isDarkMode ? 'bg-charcoal/50' : 'bg-bg-soft/50'}`}>
              
              {/* Main Dashboard Area */}
              <div className="md:col-span-8 space-y-6">
                <div className={`h-auto md:h-48 rounded-3xl shadow-sm border p-4 md:p-6 relative overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-charcoal border-white/5' : 'bg-white border-accent-rose/5'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-accent-teal/20' : 'bg-accent-teal/10'}`}>
                        <TrendingUp className="w-5 h-5 text-accent-teal" />
                      </div>
                      <div className="text-left">
                        <div className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-white/40' : 'text-muted/50'}`}>Campaign Reach</div>
                        <div className={`text-xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>1.2M+ Views</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent-rose" />
                      <div className="w-2 h-2 rounded-full bg-accent-teal/30" />
                    </div>
                  </div>
                  <div className="h-20 md:h-24 flex items-end gap-1.5 md:gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                        className={`flex-1 rounded-t-lg ${i % 2 === 0 ? (isDarkMode ? 'bg-accent-rose/40' : 'bg-accent-rose/20') : (isDarkMode ? 'bg-accent-teal/40' : 'bg-accent-teal/20')}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className={`h-auto md:h-40 rounded-3xl shadow-sm border p-6 transition-colors duration-700 ${isDarkMode ? 'bg-charcoal border-white/5' : 'bg-white border-accent-rose/5'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-accent-rose/20' : 'bg-accent-rose/10'}`}>
                        <Users className="w-4 h-4 text-accent-rose" />
                      </div>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-white/60' : 'text-muted'}`}>Creator Match</span>
                    </div>
                    <div className="flex -space-x-3 mb-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-10 h-10 rounded-full border-2 overflow-hidden ${isDarkMode ? 'border-charcoal bg-white/10' : 'border-white bg-bg-soft'}`}>
                          <img src={`https://picsum.photos/seed/creator${i}/100/100`} alt="Creator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-accent-teal text-white flex items-center justify-center text-[10px] font-bold">+12</div>
                    </div>
                    <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-bg-soft'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="h-full bg-accent-teal" 
                      />
                    </div>
                  </div>
                  <div className={`h-auto md:h-40 rounded-3xl shadow-sm border p-6 transition-colors duration-700 ${isDarkMode ? 'bg-charcoal border-white/5' : 'bg-white border-accent-rose/5'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-accent-teal/20' : 'bg-accent-teal/10'}`}>
                        <Target className="w-4 h-4 text-accent-teal" />
                      </div>
                      <span className={`text-xs font-bold ${isDarkMode ? 'text-white/60' : 'text-muted'}`}>Engagement Rate</span>
                    </div>
                    <div className={`text-3xl font-display font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-charcoal'}`}>8.4%</div>
                    <div className="text-[10px] text-accent-teal font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +2.1% from last month
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Area */}
              <div className="md:col-span-4 space-y-6">
                <div className={`h-full rounded-3xl border p-6 flex flex-col justify-between transition-colors duration-700 ${isDarkMode ? 'bg-accent-teal/10 border-accent-teal/20' : 'bg-accent-teal/5 border-accent-teal/10'}`}>
                  <div>
                    <div className="text-xs font-bold text-accent-teal uppercase tracking-widest mb-6">Live Feed</div>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full shadow-sm ${isDarkMode ? 'bg-white/10' : 'bg-white'}`} />
                          <div className="space-y-1">
                            <div className={`h-2 w-20 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-charcoal/10'}`} />
                            <div className={`h-1.5 w-12 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-charcoal/5'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm border mt-6 transition-colors duration-700 ${isDarkMode ? 'bg-charcoal border-white/5' : 'bg-white border-accent-rose/5'}`}>
                    <div className={`text-[10px] font-bold mb-2 ${isDarkMode ? 'text-white/40' : 'text-muted'}`}>ROI Prediction</div>
                    <div className="text-lg font-display font-bold text-accent-rose">4.2x</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isDarkMode ? 'text-white/20' : 'text-muted/30'}`}>Discover More</span>
        <div className={`w-px h-12 bg-gradient-to-b from-accent-rose/30 to-transparent`} />
      </motion.div>
    </section>
  );
};

export default Hero;
