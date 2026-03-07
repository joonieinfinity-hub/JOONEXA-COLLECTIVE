import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Users, Target } from 'lucide-react';
import { Page } from '../../types';

interface HeroProps {
  onPageChange: (page: Page) => void;
}

const NICHES = ['Lifestyle', 'Tech', 'Fashion', 'Beauty', 'Travel', 'Wellness'];

const Hero: React.FC<HeroProps> = ({ onPageChange }) => {
  const [nicheIndex, setNicheIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNicheIndex((prev) => (prev + 1) % NICHES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 overflow-hidden bg-hero-gradient">
      {/* Background Illustrations - Subtle SaaS Style */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent-rose/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-12 h-12 border-2 border-accent-rose/20 rounded-lg rotate-12" />
        <div className="absolute bottom-1/4 left-20 w-8 h-8 bg-accent-teal/10 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-accent-rose/20 rounded-full" />
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-rose/20 text-muted text-xs font-bold uppercase tracking-widest mb-8 bg-accent-rose/5"
          >
            <Sparkles className="w-3 h-3 text-accent-rose" />
            Empowering the Next Generation of Creators
          </motion.span>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight text-charcoal mb-8 leading-[1.1]">
            Connecting Brands with <br />
            <span className="relative inline-block">
              <span className="text-accent-teal italic">Authentic</span>
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent-rose/30 rounded-full" />
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
            {' '}Creators
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed font-sans"
          >
            Joonexa Collective is a premium influencer marketing agency founded by Rimi. 
            We bridge the gap between visionary brands and high-impact creators through 
            <span className="highlight-rose mx-1 font-medium text-charcoal">data-driven strategy</span> 
            and elegant storytelling.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <button 
              onClick={() => onPageChange(Page.CONTACT)}
              className="group bg-accent-rose text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-accent-teal transition-all duration-500 flex items-center gap-2 shadow-lg shadow-accent-rose/20"
            >
              Start Your Campaign
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onPageChange(Page.WORK)}
              className="text-charcoal px-10 py-4 rounded-full text-lg font-bold border border-charcoal/10 hover:bg-accent-rose hover:text-white hover:border-accent-rose transition-all duration-500"
            >
              Explore Our Network
            </button>
          </motion.div>
        </motion.div>

        {/* Hero Visual - SaaS Style Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-accent-rose/10 shadow-2xl shadow-accent-rose/10 bg-white/80 backdrop-blur-sm p-8">
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-bg-soft/50 grid grid-cols-12 gap-6 p-6">
              
              {/* Main Dashboard Area */}
              <div className="col-span-8 space-y-6">
                <div className="h-48 bg-white rounded-3xl shadow-sm border border-accent-rose/5 p-6 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-accent-teal" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted/50">Campaign Reach</div>
                        <div className="text-xl font-display font-bold text-charcoal">1.2M+ Views</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-accent-rose" />
                      <div className="w-2 h-2 rounded-full bg-accent-teal/30" />
                    </div>
                  </div>
                  <div className="h-24 flex items-end gap-2">
                    {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                        className={`flex-1 rounded-t-lg ${i % 2 === 0 ? 'bg-accent-rose/20' : 'bg-accent-teal/20'}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="h-40 bg-white rounded-3xl shadow-sm border border-accent-rose/5 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-accent-rose/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-accent-rose" />
                      </div>
                      <span className="text-xs font-bold text-muted">Creator Match</span>
                    </div>
                    <div className="flex -space-x-3 mb-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-bg-soft overflow-hidden">
                          <img src={`https://picsum.photos/seed/creator${i}/100/100`} alt="Creator" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-accent-teal text-white flex items-center justify-center text-[10px] font-bold">+12</div>
                    </div>
                    <div className="h-1.5 w-full bg-bg-soft rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="h-full bg-accent-teal" 
                      />
                    </div>
                  </div>
                  <div className="h-40 bg-white rounded-3xl shadow-sm border border-accent-rose/5 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-accent-teal/10 flex items-center justify-center">
                        <Target className="w-4 h-4 text-accent-teal" />
                      </div>
                      <span className="text-xs font-bold text-muted">Engagement Rate</span>
                    </div>
                    <div className="text-3xl font-display font-bold text-charcoal mb-1">8.4%</div>
                    <div className="text-[10px] text-accent-teal font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +2.1% from last month
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Area */}
              <div className="col-span-4 space-y-6">
                <div className="h-full bg-accent-teal/5 rounded-3xl border border-accent-teal/10 p-6 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-accent-teal uppercase tracking-widest mb-6">Live Feed</div>
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white shadow-sm" />
                          <div className="space-y-1">
                            <div className="h-2 w-20 bg-charcoal/10 rounded-full" />
                            <div className="h-1.5 w-12 bg-charcoal/5 rounded-full" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-2xl shadow-sm border border-accent-rose/5">
                    <div className="text-[10px] font-bold text-muted mb-2">ROI Prediction</div>
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
        <span className="text-muted/30 text-[10px] uppercase tracking-[0.3em] font-bold">Discover More</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent-rose/30 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
