import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '../../types';
import { ExternalLink, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../SEO';

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: '✨' },
  { id: ProjectCategory.WEB_DESIGN, label: 'Web Design', icon: '🌐' },
  { id: ProjectCategory.MARKETING_CAMPAIGNS, label: 'Marketing Campaigns', icon: '📈' },
  { id: ProjectCategory.INFLUENCER_CAMPAIGNS, label: 'Influencer Campaigns', icon: '🤝' },
  { id: ProjectCategory.BRAND_GROWTH, label: 'Brand Growth', icon: '🚀' },
  { id: ProjectCategory.CREATIVE_DIRECTION, label: 'Creative Direction', icon: '🎨' },
];

const WorkPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-soft">
        <Loader2 className="w-12 h-12 text-deep-teal animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen relative overflow-hidden">
      <SEO 
        title="Our Work | Portfolio"
        description="Explore our portfolio of successful influencer marketing campaigns and high-conversion web designs. See how we help brands grow."
      />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent-rose/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent-teal/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block"
          >
            Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tight text-charcoal mb-8 leading-tight"
          >
            Our <span className="text-accent-rose italic">Work</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted max-w-2xl leading-relaxed font-sans"
          >
            Design, marketing and creative strategy that help brands grow.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-16">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              data-cursor={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-4 rounded-2xl text-sm font-black transition-all duration-500 flex items-center gap-3 font-sans hover:scale-[1.05] relative overflow-hidden group ${
                activeCategory === cat.id 
                  ? 'text-white shadow-2xl shadow-accent-rose/30' 
                  : 'bg-white text-charcoal border border-charcoal/5 hover:border-accent-rose/30 hover:text-accent-rose'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div 
                  layoutId="active-filter-bg"
                  className="absolute inset-0 bg-gradient-to-br from-accent-rose to-[#BE6A7A] z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat.icon}</span>
              <span className="relative z-10 uppercase tracking-widest">{cat.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <Link to={`/case-studies/${project.slug}`} className="block">
                  <div className="relative aspect-[16/11] rounded-[3.5rem] overflow-hidden mb-10 border border-black/5 shadow-2xl shadow-black/5 group-hover:shadow-accent-rose/20 transition-all duration-700">
                    <img 
                      src={project.image} 
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:bg-charcoal/60 group-hover:backdrop-blur-[4px] z-10">
                      <div className="btn-case-study transform scale-90 group-hover:scale-100 transition-all duration-500">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute top-8 left-8 flex flex-col gap-3 z-20">
                      <span className="bg-white/90 backdrop-blur-md text-charcoal px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg font-sans">
                        {project.category}
                      </span>
                      {project.type && (
                        <span className="bg-accent-rose/90 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl text-[9px] font-black shadow-lg font-sans uppercase tracking-[0.2em]">
                          {project.type}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <p className="text-accent-teal text-xs font-black uppercase tracking-[0.2em] mb-2 font-sans">{project.brandName}</p>
                        <h3 className="text-4xl lg:text-5xl font-display font-bold text-charcoal tracking-tight group-hover:text-accent-rose transition-colors duration-500 leading-tight">
                          {project.projectName}
                        </h3>
                      </div>
                      <div className="bg-accent-rose/10 text-accent-rose px-5 py-2.5 rounded-2xl text-[10px] font-black font-sans uppercase tracking-widest border border-accent-rose/20">
                        {project.result}
                      </div>
                    </div>
                    <p className="text-muted text-lg leading-relaxed max-w-xl font-sans opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 text-center p-20 rounded-[4rem] bg-charcoal text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-rose rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-teal rounded-full blur-[100px]" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-tight">
              Ready to be our next <br />
              <span className="text-accent-rose italic">success</span> story?
            </h2>
            <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto font-sans">
              Let's collaborate to build something that truly resonates with your audience and drives real growth.
            </p>
            <Link 
              to="/contact" 
              className="btn-primary py-5 px-10 text-xl shadow-2xl shadow-accent-rose/20"
            >
              Start Your Journey <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkPage;
