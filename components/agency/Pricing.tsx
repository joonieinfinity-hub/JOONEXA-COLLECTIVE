import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { PricingTier, Page } from '../../types';

interface PricingProps {
  onPageChange: (page: Page) => void;
}

const PRICING_DATA: PricingTier[] = [
  {
    id: '1',
    name: 'Starter',
    price: '₹25,000+',
    description: 'For smaller brands looking to establish their digital presence.',
    features: [
      'Campaign Strategy',
      'Influencer Outreach',
      'Basic Analytics',
      'Monthly Report',
      'Standard Support',
    ],
    cta: 'Choose Starter',
  },
  {
    id: '2',
    name: 'Growth',
    price: '₹75,000+',
    description: 'Our most popular plan for brands ready to scale aggressively.',
    features: [
      'Full Campaign Strategy',
      'Influencer Collaborations',
      'Social Media Growth Plan',
      'Campaign Analytics',
      'Priority Support',
      'Weekly Updates',
    ],
    cta: 'Choose Growth',
  },
  {
    id: '3',
    name: 'Scale',
    price: '₹1,50,000+',
    description: 'Full marketing partnership for established brands.',
    features: [
      'Complete Marketing Strategy',
      'Influencer Campaign Management',
      'Website Optimization',
      'Conversion Strategy',
      'Advanced Reporting',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Us',
  },
];

const Pricing: React.FC<PricingProps> = ({ onPageChange }) => {
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
            className="text-4xl md:text-8xl font-display font-bold tracking-tight text-charcoal mb-8"
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
            Transparent pricing designed to scale with your brand. No hidden fees, just results.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {PRICING_DATA.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-10 rounded-[3rem] border transition-all duration-700 flex flex-col relative overflow-hidden ${
                index === 1 
                  ? 'bg-charcoal border-accent-rose scale-105 z-10 shadow-3xl shadow-accent-rose/10' 
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
                <span className={`text-5xl font-display font-bold tracking-tighter ${index === 1 ? 'text-white' : 'text-charcoal'}`}>
                  {tier.price}
                </span>
                <span className={`text-sm ml-2 font-sans ${index === 1 ? 'text-white/40' : 'text-muted'}`}>
                  / project
                </span>
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
                className={`w-full py-5 rounded-full font-bold transition-all duration-500 font-sans shadow-lg ${
                  index === 1 
                    ? 'bg-accent-rose text-white hover:bg-accent-teal shadow-accent-rose/20' 
                    : 'bg-accent-teal text-white hover:bg-accent-rose shadow-accent-teal/20'
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
