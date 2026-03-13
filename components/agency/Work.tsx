import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import ProjectMedia from './ProjectMedia';
import CaseStudies from '../CaseStudies';

import projectsData from '../../data/projects.json';

interface WorkProps {
  onPageChange: (page: Page) => void;
}

const Work: React.FC<WorkProps> = ({ onPageChange }) => {
  const [projects, setProjects] = React.useState<any[]>(projectsData.projects || []);

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

        <CaseStudies projects={projects.slice(0, 4)} layout="featured" />
      </div>
    </section>
  );
};

export default Work;
