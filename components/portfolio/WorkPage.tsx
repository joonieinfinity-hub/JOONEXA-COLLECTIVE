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
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <SEO 
        title="Our Work | Portfolio"
        description="Explore our portfolio of successful influencer marketing campaigns and high-conversion web designs. See how we help brands grow."
      />
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
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 flex items-center gap-2 font-sans hover:scale-[1.05] ${
                activeCategory === cat.id 
                  ? 'bg-deep-teal text-white shadow-xl shadow-deep-teal/20' 
                  : 'bg-white text-charcoal border border-charcoal/5 hover:border-deep-teal/30 hover:text-deep-teal'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                <Link to={`/work/${project.slug}`} className="block">
                  <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 border border-black/5 shadow-xl shadow-black/5 group-hover:shadow-2xl group-hover:shadow-accent-teal/5 transition-all duration-700">
                    <img 
                      src={project.image} 
                      alt={project.projectName}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="btn-primary">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <span className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-xl text-xs font-bold shadow-sm font-sans">
                        {project.category}
                      </span>
                      {project.type && (
                        <span className="bg-accent-rose/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm font-sans uppercase tracking-widest">
                          {project.type}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-1 font-sans">{project.brandName}</p>
                        <h3 className="text-3xl font-display font-bold text-charcoal tracking-tight group-hover:text-accent-teal transition-colors duration-300">
                          {project.projectName}
                        </h3>
                      </div>
                      <div className="bg-accent-rose/10 text-accent-rose px-4 py-2 rounded-xl text-xs font-bold font-sans">
                        {project.result}
                      </div>
                    </div>
                    <p className="text-muted text-sm leading-relaxed max-w-md font-sans">
                      {project.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkPage;
