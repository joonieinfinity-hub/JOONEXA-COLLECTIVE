import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import ProjectMedia from './ProjectMedia';

interface WorkProps {
  onPageChange: (page: Page) => void;
}

const Work: React.FC<WorkProps> = ({ onPageChange }) => {
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(err => console.error("Error fetching projects:", err));
  }, []);

  const handleVideoGenerated = (projectId: string, videoUrl: string) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, video: videoUrl } : p));
  };

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
            className="btn-secondary text-sm"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/case-studies/${project.slug}`}>
                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 border border-black/5 shadow-lg shadow-black/5">
                  <ProjectMedia 
                    image={project.image}
                    video={project.video}
                    brandName={project.brandName}
                    projectId={project.id}
                    onVideoGenerated={(url) => handleVideoGenerated(project.id, url)}
                  />
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
                      <span className="bg-white/90 backdrop-blur-md text-charcoal px-4 py-2 rounded-xl text-xs font-bold shadow-sm font-sans">
                        {project.category}
                      </span>
                      {project.type && (
                        <span className="bg-accent-rose/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm font-sans uppercase tracking-widest">
                          {project.type}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-charcoal/20 flex items-end justify-start p-8 backdrop-blur-[1px] transition-all duration-500 group-hover:bg-charcoal/40 group-hover:backdrop-blur-[2px]">
                      <span className="btn-case-study pointer-events-none">
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
