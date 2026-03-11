import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Users, Globe, Zap, TrendingUp, Palette, Megaphone } from 'lucide-react';
import { Service, Page } from '../../types';

interface ServicesProps {
  onPageChange: (page: Page) => void;
}

const SERVICES_DATA: Service[] = [
  {
    id: '1',
    title: 'Influencer Marketing',
    description: 'Creator partnerships, campaign management, influencer sourcing, and performance tracking.',
    icon: 'Users',
  },
  {
    id: '2',
    title: 'Website Design',
    description: 'Modern websites, landing pages, conversion optimization, and website redesign.',
    icon: 'Globe',
  },
  {
    id: '3',
    title: 'Brand Strategy',
    description: 'Brand identity, positioning, growth strategy, and content direction.',
    icon: 'Zap',
  },
  {
    id: '4',
    title: 'Social Media Growth',
    description: 'Content strategy, account growth, and creative direction.',
    icon: 'TrendingUp',
  },
  {
    id: '5',
    title: 'Creative Direction',
    description: 'Visual storytelling, art direction, and high-end creative assets.',
    icon: 'Palette',
  },
  {
    id: '6',
    title: 'Campaign Management',
    description: 'End-to-end management of digital marketing campaigns and product launches.',
    icon: 'Megaphone',
  },
];

const IconMap: { [key: string]: any } = {
  Users,
  Globe,
  Zap,
  TrendingUp,
  Palette,
  Megaphone,
};

const ServiceCard: React.FC<{ service: Service; index: number; onPageChange: (page: Page) => void }> = ({ service, index, onPageChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Subtle vertical parallax: move up/down slightly as we scroll past
  // Higher index cards get slightly different offsets for a more dynamic feel
  const y = useTransform(scrollYProgress, [0, 1], [20 * (index % 3 + 1), -20 * (index % 3 + 1)]);
  const Icon = IconMap[service.icon];

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        opacity: { duration: 0.8 },
        y: { duration: 0.8, ease: "easeOut" }
      }}
      onClick={() => onPageChange(Page.SERVICES)}
      className="group p-10 rounded-[2.5rem] border border-accent-rose/10 bg-white hover:bg-white hover:border-accent-rose/40 hover:shadow-[0_30px_60px_-12px_rgba(232,169,169,0.15)] transition-all duration-500 cursor-pointer relative z-10"
    >
      <div className="w-14 h-14 rounded-2xl bg-accent-rose/10 flex items-center justify-center mb-8 group-hover:bg-accent-rose group-hover:text-white transition-all duration-500">
        <Icon className="w-7 h-7 text-accent-rose group-hover:text-white transition-all duration-500" />
      </div>
      <h3 className="text-2xl font-display font-bold text-charcoal mb-4 tracking-tight">{service.title}</h3>
      <p className="text-muted leading-relaxed mb-8 font-sans">
        {service.description}
      </p>
      <div className="flex items-center gap-2 text-muted/40 text-xs font-bold uppercase tracking-widest group-hover:text-accent-rose transition-colors font-sans">
        Learn More
        <div className="w-4 h-px bg-accent-rose/20 group-hover:bg-accent-rose transition-all" />
      </div>
    </motion.div>
  );
};

const Services: React.FC<ServicesProps> = ({ onPageChange }) => {
  return (
    <section id="services" className="py-32 px-6 bg-bg-soft relative overflow-hidden">
      {/* Decorative background elements that also have parallax */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-accent-rose/5 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-teal/5 rounded-full blur-3xl" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">Our Expertise</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-charcoal mb-8">
            What We <span className="text-accent-rose italic">Actually</span> Do
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed font-sans">
            We help brands grow through design, digital strategy, creator collaborations, and growth marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              onPageChange={onPageChange} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
