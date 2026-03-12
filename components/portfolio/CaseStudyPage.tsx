import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
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
  Loader2,
  ExternalLink,
  Award
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <Loader2 className="w-12 h-12 text-deep-teal animate-spin" />
          <p className="text-muted font-sans font-bold uppercase tracking-widest text-xs">Loading Case Study...</p>
        </motion.div>
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

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-accent-rose origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={project.image} 
          alt={project.projectName}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/work" className="group inline-flex items-center gap-3 text-white/70 hover:text-white mb-10 transition-all font-sans font-black text-xs uppercase tracking-[0.2em]">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-charcoal transition-all">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Portfolio
              </Link>
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-accent-teal text-white px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-accent-teal/20 font-sans"
                >
                  {project.category}
                </motion.span>
                {project.type && (
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest font-sans"
                  >
                    {project.type}
                  </motion.span>
                )}
              </div>
              <h1 className="text-5xl md:text-9xl font-display font-bold text-white mb-8 leading-[0.9] tracking-tighter max-w-5xl">
                {project.projectName}
              </h1>
              <div className="flex items-center gap-6">
                <div className="h-px w-24 bg-white/20" />
                <p className="text-white/60 font-sans font-bold uppercase tracking-[0.3em] text-xs">Case Study 2026</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-24"
              >
                <span className="text-accent-teal text-[10px] font-black uppercase tracking-[0.3em] mb-6 block font-sans">The Challenge</span>
                <p className="text-3xl md:text-5xl font-display font-bold text-charcoal leading-[1.1] tracking-tight">
                  {project.description}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-accent-rose mb-6 flex items-center gap-3 font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-rose" />
                    Objectives
                  </h3>
                  <p className="text-muted text-lg leading-relaxed font-sans opacity-90">
                    {caseStudy.problem}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-accent-teal mb-6 flex items-center gap-3 font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
                    Influencer Strategy
                  </h3>
                  <p className="text-muted text-lg leading-relaxed font-sans opacity-90">
                    {caseStudy.strategy}
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-12 rounded-[3.5rem] border border-charcoal/5 shadow-2xl shadow-black/5 sticky top-32"
              >
                <h3 className="text-xl font-display font-bold text-charcoal mb-10 flex items-center gap-3">
                  <Award className="w-5 h-5 text-accent-rose" />
                  Campaign Details
                </h3>
                <div className="space-y-10">
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 mb-3 font-sans group-hover:text-accent-teal transition-colors">Brand</p>
                    <p className="text-charcoal text-xl font-display font-bold">{project.brandName}</p>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 mb-3 font-sans group-hover:text-accent-teal transition-colors">Industry</p>
                    <p className="text-charcoal font-bold font-sans">{caseStudy.overview.industry}</p>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 mb-4 font-sans group-hover:text-accent-teal transition-colors">Services</p>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.overview.services.map((service, idx) => (
                        <span key={idx} className="bg-bg-soft px-4 py-2 rounded-xl text-[10px] font-black text-muted font-sans uppercase tracking-widest border border-charcoal/5">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Section */}
      <section className="py-32 px-6 bg-white rounded-[5rem] shadow-2xl shadow-black/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <span className="text-accent-teal text-[10px] font-black uppercase tracking-[0.3em] mb-6 block font-sans">The Process</span>
            <h2 className="text-4xl md:text-7xl font-display font-bold text-charcoal tracking-tight">Campaign <span className="text-accent-rose italic">Execution</span></h2>
          </div>
          
          <div className="space-y-48">
            {caseStudy.execution.map((step, idx) => (
              <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={idx % 2 !== 0 ? 'lg:order-2' : ''}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-6xl font-display font-bold text-accent-rose/10">0{idx + 1}</span>
                    <div className="h-px flex-1 bg-charcoal/5" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-bold text-charcoal mb-8 tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-muted text-xl leading-relaxed font-sans opacity-80">
                    {step.content}
                  </p>
                </motion.div>
                
                {step.media && step.media.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`space-y-8 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}
                  >
                    {step.media.map((item, mIdx) => (
                      <div key={mIdx} className="group relative">
                        <div className="rounded-[4rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-black/5 aspect-[4/3]">
                          <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                            src={item.url} 
                            alt={item.caption || step.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        {item.caption && (
                          <div className="absolute bottom-8 left-8 right-8 bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <p className="text-charcoal font-bold text-sm font-sans text-center">
                              {item.caption}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-48 px-6 bg-charcoal text-white overflow-hidden relative mt-[-5rem] pt-[15rem]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-rose/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-teal/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-32">
            <span className="text-accent-rose text-[10px] font-black uppercase tracking-[0.4em] mb-6 inline-block font-sans">The Impact</span>
            <h2 className="text-5xl md:text-9xl font-display font-bold tracking-tighter mb-8 leading-[0.8]">
              Measurable <br />
              <span className="text-accent-teal italic">Performance.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {caseStudy.results.map((result, idx) => {
              const Icon = result.icon ? iconMap[result.icon] : CheckCircle2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.8 }}
                  className="bg-white/5 backdrop-blur-2xl p-16 rounded-[4rem] border border-white/10 text-center hover:bg-white/10 transition-all duration-700 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-teal to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-20 h-20 rounded-3xl bg-accent-teal/20 flex items-center justify-center mx-auto mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                    <Icon className="w-10 h-10 text-accent-teal" />
                  </div>
                  <div className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tighter">
                    {result.value}
                  </div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] font-sans group-hover:text-white transition-colors">
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
              className="btn-muted-rose text-xl"
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
