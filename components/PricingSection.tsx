import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Award, Users, TrendingUp } from 'lucide-react';
import { PricingTier, Page } from '../types';
import { getPricing } from '../services/cmsService';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0
}) => {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!active) return;
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            setValue(easeProgress * end);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={elementRef}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

interface PricingSectionProps {
  onPageChange: (page: Page) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onPageChange }) => {
  const pricingData: PricingTier[] = [
    {
      id: 'launch',
      name: 'Launch',
      price: '₹14,900',
      description: 'Strategic entry into the creator economy, focused on high-intent reach and building initial brand authority.',
      features: [
        'Influencer Sourcing',
        'Campaign Strategy',
        'Creative Direction',
        'Deployment Support',
        'Analytics & Reporting'
      ],
      cta: 'Get Started'
    },
    {
      id: 'scale',
      name: 'Scale',
      price: '₹34,900',
      description: 'The definitive growth engine for established brands ready to accelerate market penetration and engagement.',
      features: [
        'Influencer Sourcing',
        'Campaign Strategy',
        'Creative Direction',
        'Deployment Support',
        'Analytics & Reporting'
      ],
      cta: 'Scale Now',
      subtext: 'Most Popular Choice'
    },
    {
      id: 'signature',
      name: 'Signature',
      price: 'Custom',
      description: 'Elevated, platform-agnostic strategy for brands seeking category dominance and premium brand equity.',
      features: [
        'Influencer Sourcing',
        'Campaign Strategy',
        'Creative Direction',
        'Deployment Support',
        'Analytics & Reporting'
      ],
      cta: 'Contact Us'
    }
  ];

  const handleCTAClick = () => {
    window.location.href = 'mailto:hello@joonexa-collective.com?subject=Strategy Call Inquiry';
  };

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
            Investment Tiers
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
            Premium positioning, performance-driven results. Choose the roadmap that aligns with your brand's ambition.
          </motion.p>
        </div>

        {/* Client Success Metrics Bar */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24"
        >
          {[
            {
              id: 'stat-reach',
              value: 12,
              suffix: 'M+',
              label: 'Reach Generated',
              description: 'Authentic demographic engagement & high-impact impressions.',
              icon: Users,
              highlight: 'rose'
            },
            {
              id: 'stat-campaigns',
              value: 150,
              suffix: '+',
              label: 'Campaigns Managed',
              description: 'Bespoke strategies deployed with absolute creative precision.',
              icon: Award,
              highlight: 'teal'
            },
            {
              id: 'stat-roi',
              value: 4.8,
              suffix: 'x',
              decimals: 1,
              label: 'Average ROI Growth',
              description: 'Outperforming traditional performance marketing channels.',
              icon: TrendingUp,
              highlight: 'rose'
            }
          ].map((stat) => {
            const IconComponent = stat.icon;
            const innerItemVariants = {
              hidden: { opacity: 0, y: 15 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }
              }
            };

            return (
              <motion.div
                key={stat.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 80,
                      damping: 15,
                      duration: 0.8,
                      staggerChildren: 0.12,
                      delayChildren: 0.1
                    }
                  }
                }}
                className="bg-white/70 backdrop-blur-md border border-charcoal/5 rounded-[2.5rem] p-8 relative overflow-hidden group hover:border-accent-rose/20 transition-all duration-500 hover:shadow-xl hover:shadow-charcoal/5"
              >
                <motion.div 
                  variants={innerItemVariants}
                  className="absolute top-6 right-6 p-2 rounded-2xl bg-charcoal/5 group-hover:bg-accent-rose/10 transition-colors duration-500"
                >
                  <IconComponent className={`w-5 h-5 ${stat.highlight === 'rose' ? 'text-accent-rose' : 'text-accent-teal'}`} />
                </motion.div>
                
                <motion.div 
                  variants={innerItemVariants}
                  className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-3 tracking-tight mt-4"
                >
                  <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </motion.div>
                
                <motion.div 
                  variants={innerItemVariants}
                  className="flex items-center gap-2 mb-2"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${stat.highlight === 'rose' ? 'bg-accent-rose animate-pulse' : 'bg-accent-teal'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-charcoal/80 font-sans">
                    {stat.label}
                  </span>
                </motion.div>
                
                <motion.p 
                  variants={innerItemVariants}
                  className="text-xs text-muted leading-relaxed font-sans"
                >
                  {stat.description}
                </motion.p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-12">
          {pricingData.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 md:p-10 rounded-[3rem] border transition-all duration-700 flex flex-col relative overflow-hidden ${
                tier.id === 'scale' 
                  ? 'bg-charcoal border-accent-rose md:scale-110 z-10 shadow-[0_40px_80px_rgba(232,169,169,0.2)] ring-1 ring-accent-rose/50 py-12' 
                  : 'bg-white border-charcoal/5 hover:border-accent-rose/20'
              }`}
            >
              {tier.id === 'scale' && (
                <div className="absolute top-4 right-4 bg-accent-rose text-white text-[9px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full font-sans shadow-lg shadow-accent-rose/20">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-2xl font-display font-bold tracking-tight ${tier.id === 'scale' ? 'text-white' : 'text-charcoal'}`}>
                    {tier.name}
                  </h3>
                  {tier.id === 'scale' && <div className="w-2 h-2 rounded-full bg-accent-rose animate-pulse" />}
                </div>
                <p className={`text-sm leading-relaxed font-sans ${tier.id === 'scale' ? 'text-white/60' : 'text-muted'}`}>
                  {tier.description}
                </p>
              </div>
              
              <div className="mb-10 min-h-[80px] flex flex-col justify-end">
                <div className="flex items-baseline gap-1">
                  {tier.price !== 'Custom' && (
                    <span className={`text-[10px] font-black uppercase tracking-widest font-sans mb-1 block ${tier.id === 'scale' ? 'text-white/30' : 'text-muted/30'}`}>
                      Starting at
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl md:text-5xl font-display font-bold tracking-tighter ${tier.id === 'scale' ? 'text-white' : 'text-charcoal'}`}>
                    {tier.price === 'Custom' ? 'Custom' : tier.price}
                  </span>
                  {tier.price !== 'Custom' && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-sans ${tier.id === 'scale' ? 'text-white/20' : 'text-muted/20'}`}>
                      /campaign
                    </span>
                  )}
                  {tier.price === 'Custom' && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest font-sans ${tier.id === 'scale' ? 'text-white/20' : 'text-muted/20'}`}>
                      Pricing
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1 mb-12">
                <div className={`text-[9px] font-black uppercase tracking-[0.3em] mb-6 font-sans ${tier.id === 'scale' ? 'text-accent-rose/80' : 'text-accent-teal/80'}`}>
                  Engagement Scope
                </div>
                <ul className="space-y-4">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className={`flex items-center gap-3 text-sm font-sans ${tier.id === 'scale' ? 'text-white/80' : 'text-muted'}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${tier.id === 'scale' ? 'bg-accent-rose/10' : 'bg-charcoal/5'}`}>
                        <Check className={`w-3 h-3 ${tier.id === 'scale' ? 'text-accent-rose' : 'text-accent-teal'}`} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={handleCTAClick}
                className={`w-full py-5 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-500 group ${
                  tier.id === 'scale' 
                    ? 'bg-accent-rose text-white hover:bg-white hover:text-charcoal shadow-2xl shadow-accent-rose/30' 
                    : 'bg-charcoal text-white hover:bg-accent-rose'
                }`}
              >
                {tier.id === 'signature' ? 'Inquire for Custom Plan' : tier.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="inline-block p-1 rounded-full bg-charcoal/5 backdrop-blur-sm"
          >
            <div className="px-8 py-3 rounded-full border border-charcoal/5 bg-white shadow-sm">
              <p className="text-charcoal/80 text-sm font-sans font-medium">
                Custom retainers & performance-based pricing available upon consultation.
              </p>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-muted/30 text-[9px] font-black uppercase tracking-[0.4em]"
          >
            *Final pricing depends on campaign complexity, creator tiers, and scope.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
