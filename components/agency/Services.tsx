import React from 'react';
import { motion } from 'framer-motion';
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

const Services: React.FC<ServicesProps> = ({ onPageChange }) => {
  return (
    <section id="services" className="py-32 px-6 bg-bg-soft">
      <div className="max-w-7xl mx-auto">
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
          {SERVICES_DATA.map((service, index) => {
            const Icon = IconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onPageChange(Page.SERVICES)}
                className="group p-10 rounded-[2.5rem] border border-accent-rose/10 bg-white hover:bg-white hover:border-accent-rose/30 hover:shadow-2xl hover:shadow-accent-rose/5 transition-all duration-500 cursor-pointer"
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
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
