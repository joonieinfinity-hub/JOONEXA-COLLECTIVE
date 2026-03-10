import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Map, Monitor, Heart, Coffee } from 'lucide-react';

const NICHES = [
  {
    id: 1,
    name: "Beauty",
    description: "Skincare, makeup, and self-care experts.",
    icon: Sparkles,
    color: "#FF8B7C",
    visual: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Streetwear, luxury, and sustainable style.",
    icon: Camera,
    color: "#8B7CFF",
    visual: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Travel",
    description: "Adventure, luxury stays, and hidden gems.",
    icon: Map,
    color: "#7CFF8B",
    visual: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Tech",
    description: "Gadgets, software, and future innovation.",
    icon: Monitor,
    color: "#7C8BFF",
    visual: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Fitness",
    description: "Wellness, training, and healthy living.",
    icon: Heart,
    color: "#FF7C8B",
    visual: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Lifestyle",
    description: "Home decor, productivity, and daily life.",
    icon: Coffee,
    color: "#FFD77C",
    visual: "https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?q=80&w=1000&auto=format&fit=crop"
  }
];

const CreatorNetwork: React.FC = () => {
  return (
    <section id="creator-network" className="py-32 px-6 bg-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">Our Network</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-charcoal mb-8">
              A global network <br />
              of <span className="text-accent-rose italic">authentic</span> creators.
            </h2>
            <p className="text-lg text-muted leading-relaxed font-sans">
              We've curated a diverse network of creators across multiple niches, ensuring your brand connects with the right audience in the most authentic way.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-4xl font-display font-bold text-charcoal tracking-tight">10K+</div>
              <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Active Creators</p>
            </div>
            <div className="w-px h-12 bg-charcoal/10" />
            <div className="text-right">
              <div className="text-4xl font-display font-bold text-charcoal tracking-tight">50M+</div>
              <p className="text-muted/40 text-xs font-bold uppercase tracking-widest font-sans">Total Reach</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NICHES.map((niche, index) => (
            <motion.div
              key={niche.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] rounded-[2.5rem] overflow-hidden border border-accent-rose/5 shadow-xl shadow-accent-rose/5"
            >
              <img 
                src={niche.visual} 
                alt={niche.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:bg-accent-rose transition-all duration-500">
                  <niche.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">{niche.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-[200px] font-sans">
                  {niche.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CreatorNetwork;
