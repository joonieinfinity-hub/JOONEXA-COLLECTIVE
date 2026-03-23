import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { PricingTier, Page } from '../types';
import { getPricing } from '../services/cmsService';

interface PricingSectionProps {
  onPageChange: (page: Page) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onPageChange }) => {
  const [pricingDataState, setPricingDataState] = useState<PricingTier[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log('PricingSection: Fetching pricing data...');
      const data = await getPricing();
      console.log('PricingSection: Received data:', data);
      if (data && data.tiers) {
        setPricingDataState(data.tiers);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="pricing" className="py-32 px-6 bg-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans"
          >
            Pricing Plans
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tight text-charcoal mb-8"
          >
            Invest in your <span className="text-accent-rose italic">Growth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Positioned to scale with your brand. We focus on value-driven partnerships that deliver measurable impact.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingDataState.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 md:p-10 rounded-[3rem] border transition-all duration-700 flex flex-col relative overflow-hidden ${
                index === 1 
                  ? 'bg-charcoal border-accent-rose md:scale-105 z-10 shadow-3xl shadow-accent-rose/10' 
                  : 'bg-white border-charcoal/5 hover:border-accent-rose/20'
              }`}
            >
              {index === 1 && (
                <div className="absolute top-0 right-0 bg-accent-rose text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2 rounded-bl-2xl font-sans">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className={`text-2xl font-display font-bold mb-2 tracking-tight ${index === 1 ? 'text-white' : 'text-charcoal'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm leading-relaxed font-sans ${index === 1 ? 'text-white/60' : 'text-muted'}`}>
                  {tier.description}
                </p>
              </div>
              
              <div className="mb-10">
                <div className="flex items-baseline gap-1">
                  {tier.price !== 'Custom' && (
                    <span className={`text-sm font-sans ${index === 1 ? 'text-white/40' : 'text-muted'}`}>
                      Starting from
                    </span>
                  )}
                  <span className={`text-5xl font-display font-bold tracking-tighter ${index === 1 ? 'text-white' : 'text-charcoal'}`}>
                    {tier.price === 'Custom' ? 'Custom Pricing' : tier.price}
                  </span>
                </div>
                {tier.subtext && (
                  <p className={`text-xs mt-2 font-sans ${index === 1 ? 'text-white/40' : 'text-muted'}`}>
                    {tier.subtext}
                  </p>
                )}
              </div>

              <div className="flex-1 mb-12">
                <ul className="space-y-4">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className={`flex items-center gap-3 text-sm font-sans ${index === 1 ? 'text-white/80' : 'text-muted'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${index === 1 ? 'bg-accent-rose/20' : 'bg-accent-rose/10'}`}>
                        <Check className={`w-3 h-3 ${index === 1 ? 'text-accent-rose' : 'text-accent-rose'}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => onPageChange(Page.CONTACT)}
                className={`w-full ${index === 1 ? 'btn-primary' : 'btn-secondary'}`}
              >
                {tier.cta} <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-muted text-sm font-sans italic"
        >
          "Every brand is different. Final pricing is customized based on campaign scope and influencer tiers."
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
