import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, BarChart3, Users } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "Strategy & Discovery",
    description: "We dive deep into your brand's goals, audience, and market to create a custom growth roadmap.",
    icon: Search,
    visual: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Creative Execution",
    description: "Our design and content teams bring your brand to life with high-converting visuals and messaging.",
    icon: PenTool,
    visual: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Creator Collaboration",
    description: "We connect you with authentic creators who resonate with your audience and drive real engagement.",
    icon: Users,
    visual: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Scale & Optimize",
    description: "We track performance in real-time and optimize campaigns to ensure maximum ROI and sustainable growth.",
    icon: BarChart3,
    visual: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block">The Process</span>
          <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-charcoal mb-8">
            How we scale <br />
            <span className="text-accent-rose italic">your brand.</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed font-sans">
            A streamlined approach to digital growth, from initial strategy to long-term scaling.
          </p>
        </div>

        <div className="space-y-32">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-accent-rose/10 flex items-center justify-center mb-8">
                  <step.icon className="w-8 h-8 text-accent-rose" />
                </div>
                <span className="text-accent-teal font-display font-bold text-5xl opacity-20 mb-4 block">0{step.id}</span>
                <h3 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-6 tracking-tight">{step.title}</h3>
                <p className="text-xl text-muted leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-accent-rose/10 shadow-2xl shadow-accent-rose/5">
                  <img 
                    src={step.visual} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent-rose/20 to-transparent" />
                  
                  {/* UI Overlay Visuals */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-teal flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="h-2 w-24 bg-charcoal/10 rounded-full mb-2" />
                        <div className="h-2 w-16 bg-charcoal/5 rounded-full" />
                      </div>
                      <div className="ml-auto text-accent-teal font-bold font-sans">+124%</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
