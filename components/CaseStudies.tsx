import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CaseStudiesProps {
  projects: Project[];
  layout?: 'grid' | 'featured';
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ projects, layout = 'grid' }) => {
  return (
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
      className={layout === 'featured' ? "grid grid-cols-1 md:grid-cols-2 gap-12" : "grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"}
    >
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
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
              <div className={layout === 'featured' 
                ? "relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-black/5 shadow-lg shadow-black/5 group-hover:shadow-accent-rose/20 transition-all duration-700"
                : "relative aspect-[16/10] rounded-[4rem] overflow-hidden mb-12 border border-black/5 shadow-2xl shadow-black/5 group-hover:shadow-[0_32px_64px_-16px_rgba(242,125,38,0.2)] transition-all duration-700"
              }>
                <motion.img 
                  src={project.image} 
                  alt={project.projectName}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-charcoal/20 flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:bg-charcoal/60 group-hover:backdrop-blur-[8px] z-10">
                  <div className="btn-case-study transform scale-90 group-hover:scale-100 transition-all duration-700 shadow-2xl">
                    View Case Study <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <div className={layout === 'featured' ? "absolute top-6 left-6 flex flex-col gap-2 z-20" : "absolute top-10 left-10 flex flex-col gap-4 z-20"}>
                  <span className="bg-white/90 backdrop-blur-xl text-charcoal px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl font-sans border border-white/20">
                    {project.category}
                  </span>
                  {project.type && (
                    <span className="bg-accent-rose/90 backdrop-blur-xl text-white px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[9px] font-black shadow-xl font-sans uppercase tracking-[0.2em] border border-white/10">
                      {project.type}
                    </span>
                  )}
                </div>
              </div>
              
              <div className={layout === 'featured' ? "px-4" : "px-10"}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <p className="text-accent-teal text-[10px] font-black uppercase tracking-[0.3em] mb-3 font-sans">{project.brandName}</p>
                    <h3 className={layout === 'featured' 
                      ? "text-2xl md:text-3xl font-display font-bold text-charcoal tracking-tight group-hover:text-accent-rose transition-colors duration-500"
                      : "text-4xl lg:text-6xl font-display font-bold text-charcoal tracking-tighter group-hover:text-accent-rose transition-colors duration-500 leading-[0.9]"
                    }>
                      {project.projectName}
                    </h3>
                  </div>
                  <div className="bg-accent-rose/10 text-accent-rose px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-[10px] font-black font-sans uppercase tracking-widest border border-accent-rose/20 shadow-lg shadow-accent-rose/5">
                    {project.result}
                  </div>
                </div>
                <p className="text-muted text-lg md:text-xl leading-relaxed max-w-xl font-sans opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  {project.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CaseStudies;
