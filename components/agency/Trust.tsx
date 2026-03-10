import React from 'react';
import { motion } from 'framer-motion';

const Trust: React.FC = () => {
  const brands = [
    'Brand Alpha', 'Beta Dynamics', 'Gamma Studio', 'Delta Tech', 'Epsilon Media'
  ];

  return (
    <section className="py-32 border-y border-accent-rose/10 bg-bg-soft overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          <div>
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">Trusted by Leaders</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-charcoal mb-8">
              Proven results for <br />
              <span className="text-accent-rose italic">modern</span> enterprises.
            </h2>
            <p className="text-lg text-muted leading-relaxed mb-12 font-sans">
              We've helped over 50+ brands redefine their digital presence and achieve sustainable growth through data-driven creativity and influencer partnerships.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-display font-bold text-charcoal mb-2">98%</div>
                <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Client Satisfaction</p>
              </div>
              <div>
                <div className="text-4xl font-display font-bold text-charcoal mb-2">250%</div>
                <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Avg. Growth ROI</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 bg-white p-8 rounded-[2.5rem] border border-accent-rose/10 shadow-2xl shadow-accent-rose/5"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent-rose" />
                  <div className="w-3 h-3 rounded-full bg-accent-teal/30" />
                  <div className="w-3 h-3 rounded-full bg-bg-soft" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted/40 font-sans">Analytics Dashboard</div>
              </div>
              
              <div className="space-y-6">
                <div className="h-4 w-3/4 bg-bg-soft rounded-full" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-20 bg-accent-rose/5 rounded-2xl" />
                  <div className="h-20 bg-accent-teal/5 rounded-2xl" />
                  <div className="h-20 bg-accent-rose/5 rounded-2xl" />
                </div>
                <div className="h-32 bg-bg-soft rounded-2xl relative overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-accent-teal/5" />
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 h-1/2 bg-accent-rose/10 border-t-2 border-accent-rose" 
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-rose/5 blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-accent-teal/5 blur-3xl rounded-full" />
          </div>
        </div>

        <div className="pt-12 border-t border-charcoal/5">
          <p className="text-center text-muted/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 font-sans">
            Featured Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {brands.map((brand, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-xl md:text-2xl font-display font-bold tracking-tight text-charcoal hover:text-accent-rose transition-colors cursor-default"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trust;
