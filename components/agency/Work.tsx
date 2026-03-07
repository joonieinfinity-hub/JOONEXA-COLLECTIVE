import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../../types';
import { PROJECTS_DATA } from '../../data/projects';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface WorkProps {
  onPageChange: (page: Page) => void;
}

const Work: React.FC<WorkProps> = ({ onPageChange }) => {
  return (
    <section id="work" className="py-32 px-6 bg-bg-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans">Featured Work</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight text-charcoal leading-tight">
              Selected <span className="text-accent-rose italic">Case</span> Studies
            </h2>
          </div>
          <Link 
            to="/work"
            onClick={() => onPageChange(Page.WORK)}
            className="text-charcoal px-8 py-3 rounded-full border border-charcoal/10 hover:bg-accent-rose hover:text-white hover:border-accent-rose transition-all duration-500 font-bold text-sm font-sans"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {PROJECTS_DATA.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/work/${project.slug}`}>
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-black/5 shadow-lg shadow-black/5">
                  <img 
                    src={project.image} 
                    alt={project.brandName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white text-charcoal px-8 py-3 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-sans flex items-center gap-2">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-charcoal mb-2 tracking-tight">{project.projectName}</h3>
                    <p className="text-muted text-sm font-medium uppercase tracking-widest font-sans">{project.brandName} • {project.category}</p>
                  </div>
                  <div className="bg-accent-teal/10 text-accent-teal px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap font-sans">
                    {project.result}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
