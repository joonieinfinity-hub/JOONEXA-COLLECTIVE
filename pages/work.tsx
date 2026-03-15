import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project, ProjectCategory } from '../types';
import { Loader2, Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import CaseStudies from '../components/CaseStudies';
import { getPortfolio } from '../services/cmsService';

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: '✨' },
  { id: ProjectCategory.WEB_DESIGN, label: 'Web Design', icon: '🌐' },
  { id: ProjectCategory.MARKETING_CAMPAIGNS, label: 'Marketing Campaigns', icon: '📈' },
  { id: ProjectCategory.INFLUENCER_CAMPAIGNS, label: 'Influencer Campaigns', icon: '🤝' },
  { id: ProjectCategory.BRAND_GROWTH, label: 'Brand Growth', icon: '🚀' },
  { id: ProjectCategory.CREATIVE_DIRECTION, label: 'Creative Direction', icon: '🎨' },
];

const Work: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProjects = async () => {
      setLoading(true);
      const data = await getPortfolio();
      setProjects(data as Project[]);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let result = projects;
    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.projectName.toLowerCase().includes(query) || 
        p.brandName.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    return result;
  }, [activeCategory, searchQuery, projects]);

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

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 items-start lg:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat, idx) => (
              <motion.button
                key={cat.id}
                data-cursor={cat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.05 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all duration-500 flex items-center gap-2 font-sans hover:scale-[1.05] relative overflow-hidden group uppercase tracking-widest ${
                  activeCategory === cat.id 
                    ? 'text-white shadow-xl shadow-accent-rose/20' 
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
                <span className="relative z-10 text-xs">{cat.icon}</span>
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30 group-focus-within:text-accent-teal transition-colors" />
            <input 
              type="text"
              placeholder="Search projects or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-charcoal/5 rounded-2xl py-4 pl-14 pr-12 text-sm font-sans focus:outline-none focus:border-accent-teal focus:ring-4 focus:ring-accent-teal/5 transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted/30 hover:text-accent-rose"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <CaseStudies projects={filteredProjects} />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <div className="w-24 h-24 bg-bg-soft rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-muted/20" />
            </div>
            <h3 className="text-3xl font-display font-bold text-charcoal mb-4">No projects found</h3>
            <p className="text-muted font-sans">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="mt-8 text-accent-teal font-black uppercase tracking-widest text-xs font-sans hover:text-accent-rose transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

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

export default Work;
