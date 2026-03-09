import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { 
  ArrowLeft, 
  ArrowRight,
  Calendar, 
  Smartphone, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  BarChart, 
  Users, 
  Share2, 
  Target,
  CheckCircle2,
  ChevronRight,
  Loader2
} from 'lucide-react';
import SEO from '../SEO';

const iconMap: Record<string, any> = {
  Calendar,
  Smartphone,
  Clock,
  TrendingUp,
  DollarSign,
  BarChart,
  Users,
  Share2,
  Target
};

const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const found = (data.projects as Project[]).find(p => p.slug === slug);
        setProject(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching project:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-soft">
        <Loader2 className="w-12 h-12 text-deep-teal animate-spin" />
      </div>
    );
  }

  if (!project || !project.caseStudy) {
    return <Navigate to="/work" replace />;
  }

  const { caseStudy } = project;

  return (
    <div className="pt-24 pb-24 bg-bg-soft min-h-screen">
      <SEO 
        title={project.seo?.title || `${project.projectName} | Case Study`}
        description={project.seo?.description || project.description}
        ogImage={project.image}
      />

      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={project.image} 
          alt={project.projectName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/work" className="inline-flex items-center gap-2 text-white/80 hover:text-white hover:scale-[1.05] mb-8 transition-all font-sans font-bold text-sm uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Back to Work
              </Link>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-accent-teal text-white px-4 py-2 rounded-xl text-xs font-bold inline-block font-sans">
                  {project.category}
                </span>
                {project.type && (
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-xl text-xs font-bold inline-block font-sans">
                    {project.type}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight max-w-4xl">
                {project.projectName}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="mb-16">
                <h2 className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-4 font-sans">Project Overview</h2>
                <p className="text-2xl md:text-3xl font-display font-bold text-charcoal leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-16">
                <div>
                  <h3 className="text-xl font-display font-bold text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-accent-rose/10 flex items-center justify-center text-accent-rose text-sm">01</span>
                    The Problem
                  </h3>
                  <p className="text-muted text-lg leading-relaxed font-sans">
                    {caseStudy.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-bold text-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-accent-rose/10 flex items-center justify-center text-accent-rose text-sm">02</span>
                    Our Strategy
                  </h3>
                  <p className="text-muted text-lg leading-relaxed font-sans">
                    {caseStudy.strategy}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-10 rounded-[2.5rem] border border-charcoal/5 shadow-xl shadow-black/5 sticky top-32">
                <h3 className="text-lg font-display font-bold text-charcoal mb-8 border-b border-charcoal/5 pb-4">Details</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted/50 mb-2 font-sans">Brand</p>
                    <p className="text-charcoal font-bold font-sans">{project.brandName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted/50 mb-2 font-sans">Industry</p>
                    <p className="text-charcoal font-bold font-sans">{caseStudy.overview.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted/50 mb-2 font-sans">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.overview.services.map((service, idx) => (
                        <span key={idx} className="bg-bg-soft px-3 py-1 rounded-lg text-xs font-bold text-muted font-sans">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-accent-teal text-xs font-bold uppercase tracking-widest mb-16 text-center font-sans">Execution & Implementation</h2>
          
          <div className="space-y-32">
            {caseStudy.execution.map((step, idx) => (
              <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-charcoal mb-6 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted text-lg leading-relaxed font-sans">
                    {step.content}
                  </p>
                </div>
                
                {step.media && step.media.length > 0 && (
                  <div className={`space-y-6 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    {step.media.map((item, mIdx) => (
                      <div key={mIdx} className="group">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 border border-black/5">
                          <img 
                            src={item.url} 
                            alt={item.caption || step.title}
                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {item.caption && (
                          <p className="text-center text-muted text-sm mt-4 italic font-sans">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-32 px-6 bg-charcoal text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-rose/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-teal/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent-rose text-xs font-bold uppercase tracking-widest mb-4 inline-block font-sans">The Results</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mb-8">
              Measurable <span className="text-accent-teal italic">Growth</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudy.results.map((result, idx) => {
              const Icon = result.icon ? iconMap[result.icon] : CheckCircle2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-md p-12 rounded-[3rem] border border-white/10 text-center hover:bg-white/10 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent-teal/20 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-accent-teal" />
                  </div>
                  <div className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tighter">
                    {result.value}
                  </div>
                  <p className="text-white/60 text-sm font-bold uppercase tracking-widest font-sans">
                    {result.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next Project CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal mb-12 tracking-tight">
            Ready to achieve similar <span className="text-accent-rose italic">results?</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/contact"
              data-cursor="Let's Talk"
              className="btn-primary text-xl"
            >
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/work"
              data-cursor="Portfolio"
              className="btn-secondary text-xl"
            >
              View More Work <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyPage;
