import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory, PricingTier } from '../../types';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  LayoutGrid, 
  Save,
  X,
  CheckCircle2,
  ArrowLeft,
  DollarSign,
  Briefcase,
  Image as ImageIcon,
  Loader2,
  Settings,
  LogOut,
  FileText,
  Globe,
  Mail
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SiteData {
  name: string;
  description: string;
  founder: string;
  resumeUrl: string;
  heroImage: string;
  contactEmail: string;
  socials: {
    instagram: string;
    linkedin: string;
  };
}

const StudioEdit: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pricing, setPricing] = useState<PricingTier[]>([]);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'pricing' | 'site'>('projects');
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isEditingPricing, setIsEditingPricing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [currentPricing, setCurrentPricing] = useState<Partial<PricingTier> | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projectsRes, pricingRes, siteRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/pricing'),
        fetch('/api/site')
      ]);
      const pData = await projectsRes.json();
      const prData = await pricingRes.json();
      const sData = await siteRes.json();
      setProjects(pData.projects);
      setPricing(prData.pricing);
      setSiteData(sData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isFounderAuthenticated');
    navigate('/login');
  };

  const handleSaveSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteData) return;
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteData)
      });
      if (res.ok) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (err) {
      console.error("Error saving site data:", err);
      setSaveStatus('idle');
    }
  };

  const handleSaveProjects = async (updatedProjects: Project[]) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: updatedProjects })
      });
      if (res.ok) {
        setProjects(updatedProjects);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (err) {
      console.error("Error saving projects:", err);
      setSaveStatus('idle');
    }
  };

  const handleSavePricing = async (updatedPricing: PricingTier[]) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pricing: updatedPricing })
      });
      if (res.ok) {
        setPricing(updatedPricing);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (err) {
      console.error("Error saving pricing:", err);
      setSaveStatus('idle');
    }
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updated = projects.filter(p => p.id !== id);
      handleSaveProjects(updated);
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    // Validation
    const newErrors: Record<string, string> = {};
    if (!currentProject.brandName?.trim()) newErrors.brandName = 'Brand name is required';
    if (!currentProject.projectName?.trim()) newErrors.projectName = 'Project title is required';
    if (!currentProject.description?.trim()) newErrors.description = 'Description is required';
    if (!currentProject.result?.trim()) newErrors.result = 'Result summary is required';
    if (!currentProject.image?.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!currentProject.image.startsWith('http')) {
      newErrors.image = 'Must be a valid URL starting with http';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    let updated: Project[];
    if (currentProject.id) {
      updated = projects.map(p => p.id === currentProject.id ? currentProject as Project : p);
    } else {
      const newProject = {
        ...currentProject,
        id: Date.now().toString(),
        slug: currentProject.projectName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'new-project'
      } as Project;
      updated = [...projects, newProject];
    }
    handleSaveProjects(updated);
    setIsEditingProject(false);
  };

  const handlePricingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPricing) return;

    // Validation
    const newErrors: Record<string, string> = {};
    if (!currentPricing.name?.trim()) newErrors.name = 'Tier name is required';
    if (!currentPricing.price?.trim()) newErrors.price = 'Price is required';
    if (!currentPricing.description?.trim()) newErrors.description = 'Description is required';
    if (!currentPricing.cta?.trim()) newErrors.cta = 'Call to action text is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const updated = pricing.map(p => p.id === currentPricing.id ? currentPricing as PricingTier : p);
    handleSavePricing(updated);
    setIsEditingPricing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-soft">
        <Loader2 className="w-12 h-12 text-deep-teal animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-soft pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-muted hover:text-charcoal transition-colors font-sans text-sm font-bold"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Site
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-accent-rose hover:opacity-80 transition-colors font-sans text-sm font-bold"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
            <h1 className="text-4xl font-display font-bold text-charcoal mb-2 tracking-tight">Studio Edit</h1>
            <p className="text-muted font-sans">Manage your agency's content without the complexity.</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-2xl border border-charcoal/5 shadow-sm">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 font-sans ${activeTab === 'projects' ? 'bg-charcoal text-white' : 'text-muted hover:text-charcoal'}`}
            >
              <Briefcase className="w-4 h-4" /> Projects
            </button>
            <button 
              onClick={() => setActiveTab('pricing')}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 font-sans ${activeTab === 'pricing' ? 'bg-charcoal text-white' : 'text-muted hover:text-charcoal'}`}
            >
              <DollarSign className="w-4 h-4" /> Pricing
            </button>
            <button 
              onClick={() => setActiveTab('site')}
              className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 font-sans ${activeTab === 'site' ? 'bg-charcoal text-white' : 'text-muted hover:text-charcoal'}`}
            >
              <Settings className="w-4 h-4" /> Site
            </button>
          </div>
        </div>

        {/* Save Status Indicator */}
        <AnimatePresence>
          {saveStatus !== 'idle' && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-8 right-8 z-[110] px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm font-sans ${
                saveStatus === 'saving' ? 'bg-white text-charcoal' : 'bg-deep-teal text-white'
              }`}
            >
              {saveStatus === 'saving' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {saveStatus === 'saving' ? 'Saving changes...' : 'Changes saved!'}
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setCurrentProject({
                    brandName: '',
                    projectName: '',
                    category: ProjectCategory.WEB_DESIGN,
                    description: '',
                    result: '',
                    image: '',
                    type: 'Concept Project',
                    caseStudy: {
                      overview: { industry: '', services: [] },
                      problem: '',
                      strategy: '',
                      execution: [],
                      results: []
                    }
                  });
                  setIsEditingProject(true);
                  setErrors({});
                }}
                className="btn-primary"
              >
                <Plus className="w-5 h-5" /> Add New Project
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {projects.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] border border-dashed border-charcoal/20 text-center">
                  <LayoutGrid className="w-16 h-16 text-muted/20 mx-auto mb-6" />
                  <h3 className="text-xl font-display font-bold text-charcoal mb-2">No projects found</h3>
                  <p className="text-muted font-sans">Start by adding your first masterpiece.</p>
                </div>
              ) : (
                projects.map((project) => (
                  <motion.div 
                    key={project.id}
                    layout
                    className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center gap-8"
                  >
                    <div className="w-full md:w-48 aspect-video rounded-2xl overflow-hidden shrink-0 border border-charcoal/5">
                      <img src={project.image} alt={project.brandName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                        <span className="bg-deep-teal/10 text-deep-teal px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest font-sans">
                          {project.category}
                        </span>
                        <span className="bg-accent-rose/10 text-accent-rose px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest font-sans">
                          {project.type}
                        </span>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-charcoal mb-1 tracking-tight">{project.projectName}</h3>
                      <p className="text-muted text-sm font-sans">{project.brandName} • {project.result}</p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setCurrentProject(project);
                          setIsEditingProject(true);
                          setErrors({});
                        }}
                        className="p-4 bg-bg-soft text-charcoal rounded-2xl hover:bg-deep-teal hover:text-white transition-all"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-4 bg-bg-soft text-accent-rose rounded-2xl hover:bg-accent-rose hover:text-white transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricing.map((tier) => (
              <motion.div 
                key={tier.id}
                className="bg-white p-10 rounded-[3rem] border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-2 tracking-tight">{tier.name}</h3>
                  <p className="text-muted text-sm font-sans leading-relaxed">{tier.description}</p>
                </div>
                <div className="mb-10">
                  <span className="text-4xl font-display font-bold text-charcoal tracking-tight">{tier.price}</span>
                </div>
                <button 
                  onClick={() => {
                    setCurrentPricing(tier);
                    setIsEditingPricing(true);
                    setErrors({});
                  }}
                  className="w-full py-4 bg-bg-soft text-charcoal rounded-2xl font-bold hover:bg-deep-teal hover:text-white transition-all flex items-center justify-center gap-2 font-sans"
                >
                  <Edit2 className="w-4 h-4" /> Edit Tier
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'site' && siteData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-[3rem] border border-charcoal/5 shadow-sm"
          >
            <form onSubmit={handleSaveSite} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Agency Name</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans"
                      value={siteData.name}
                      onChange={(e) => setSiteData({...siteData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Contact Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                    <input 
                      type="email" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans"
                      value={siteData.contactEmail}
                      onChange={(e) => setSiteData({...siteData, contactEmail: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Agency Description</label>
                <textarea 
                  rows={3}
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans resize-none"
                  value={siteData.description}
                  onChange={(e) => setSiteData({...siteData, description: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Hero Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans"
                      value={siteData.heroImage}
                      onChange={(e) => setSiteData({...siteData, heroImage: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Resume URL</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans"
                      value={siteData.resumeUrl}
                      onChange={(e) => setSiteData({...siteData, resumeUrl: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-charcoal/5">
                <button 
                  type="submit"
                  className="w-full btn-primary"
                >
                  <Save className="w-5 h-5" /> Save Site Settings
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Project Edit Modal */}
        <AnimatePresence>
          {isEditingProject && currentProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditingProject(false)}
                className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-12"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-charcoal tracking-tight">
                    {currentProject.id ? 'Edit Project' : 'New Project'}
                  </h2>
                  <button onClick={() => setIsEditingProject(false)} className="p-3 hover:bg-bg-soft rounded-full transition-colors text-muted">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Brand Name</label>
                      <input 
                        type="text" 
                        className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.brandName ? 'border-accent-rose' : 'border-charcoal/5'}`}
                        value={currentProject.brandName}
                        onChange={(e) => {
                          setCurrentProject({...currentProject, brandName: e.target.value});
                          if (errors.brandName) setErrors({...errors, brandName: ''});
                        }}
                      />
                      {errors.brandName && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.brandName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Project Title</label>
                      <input 
                        type="text" 
                        className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.projectName ? 'border-accent-rose' : 'border-charcoal/5'}`}
                        value={currentProject.projectName}
                        onChange={(e) => {
                          setCurrentProject({...currentProject, projectName: e.target.value});
                          if (errors.projectName) setErrors({...errors, projectName: ''});
                        }}
                      />
                      {errors.projectName && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.projectName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Category</label>
                      <select 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans appearance-none"
                        value={currentProject.category}
                        onChange={(e) => setCurrentProject({...currentProject, category: e.target.value as ProjectCategory})}
                      >
                        {Object.values(ProjectCategory).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Project Type</label>
                      <select 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans appearance-none"
                        value={currentProject.type}
                        onChange={(e) => setCurrentProject({...currentProject, type: e.target.value})}
                      >
                        <option value="Client Project">Client Project</option>
                        <option value="Concept Project">Concept Project</option>
                        <option value="Speculative Redesign">Speculative Redesign</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Image URL</label>
                      <div className="relative">
                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                        <input 
                          type="text" 
                          className={`w-full bg-bg-soft border rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.image ? 'border-accent-rose' : 'border-charcoal/5'}`}
                          value={currentProject.image}
                          onChange={(e) => {
                            setCurrentProject({...currentProject, image: e.target.value});
                            if (errors.image) setErrors({...errors, image: ''});
                          }}
                        />
                      </div>
                      {errors.image && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.image}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Result Summary (e.g. 40% Growth)</label>
                      <input 
                        type="text" 
                        className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.result ? 'border-accent-rose' : 'border-charcoal/5'}`}
                        value={currentProject.result}
                        onChange={(e) => {
                          setCurrentProject({...currentProject, result: e.target.value});
                          if (errors.result) setErrors({...errors, result: ''});
                        }}
                      />
                      {errors.result && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.result}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Description</label>
                    <textarea 
                      rows={3}
                      className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans resize-none ${errors.description ? 'border-accent-rose' : 'border-charcoal/5'}`}
                      value={currentProject.description}
                      onChange={(e) => {
                        setCurrentProject({...currentProject, description: e.target.value});
                        if (errors.description) setErrors({...errors, description: ''});
                      }}
                    />
                    {errors.description && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.description}</p>}
                  </div>

                  <div className="pt-6 border-t border-charcoal/5">
                    <button 
                      type="submit"
                      className="w-full btn-primary"
                    >
                      <Save className="w-5 h-5" /> Save Project
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Pricing Edit Modal */}
        <AnimatePresence>
          {isEditingPricing && currentPricing && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditingPricing(false)}
                className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-12"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-charcoal tracking-tight">Edit Pricing Tier</h2>
                  <button onClick={() => setIsEditingPricing(false)} className="p-3 hover:bg-bg-soft rounded-full transition-colors text-muted">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handlePricingSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Tier Name</label>
                      <input 
                        type="text" 
                        className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.name ? 'border-accent-rose' : 'border-charcoal/5'}`}
                        value={currentPricing.name}
                        onChange={(e) => {
                          setCurrentPricing({...currentPricing, name: e.target.value});
                          if (errors.name) setErrors({...errors, name: ''});
                        }}
                      />
                      {errors.name && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Price (e.g. $2,500)</label>
                      <input 
                        type="text" 
                        className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.price ? 'border-accent-rose' : 'border-charcoal/5'}`}
                        value={currentPricing.price}
                        onChange={(e) => {
                          setCurrentPricing({...currentPricing, price: e.target.value});
                          if (errors.price) setErrors({...errors, price: ''});
                        }}
                      />
                      {errors.price && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.price}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Call to Action (e.g. Get Started)</label>
                    <input 
                      type="text" 
                      className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans ${errors.cta ? 'border-accent-rose' : 'border-charcoal/5'}`}
                      value={currentPricing.cta}
                      onChange={(e) => {
                        setCurrentPricing({...currentPricing, cta: e.target.value});
                        if (errors.cta) setErrors({...errors, cta: ''});
                      }}
                    />
                    {errors.cta && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.cta}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Description</label>
                    <textarea 
                      rows={2}
                      className={`w-full bg-bg-soft border rounded-2xl py-4 px-6 focus:outline-none focus:border-deep-teal transition-all font-sans resize-none ${errors.description ? 'border-accent-rose' : 'border-charcoal/5'}`}
                      value={currentPricing.description}
                      onChange={(e) => {
                        setCurrentPricing({...currentPricing, description: e.target.value});
                        if (errors.description) setErrors({...errors, description: ''});
                      }}
                    />
                    {errors.description && <p className="text-accent-rose text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.description}</p>}
                  </div>

                  <div className="pt-6 border-t border-charcoal/5">
                    <button 
                      type="submit"
                      className="w-full btn-primary"
                    >
                      <Save className="w-5 h-5" /> Save Pricing Tier
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudioEdit;
