import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, db } from '../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Project, ProjectCategory } from '../../types';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  LayoutGrid, 
  FileText, 
  BarChart3, 
  Image as ImageIcon,
  Save,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (!db) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'projects'), orderBy('brandName'));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
      setProjects(projectsData);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject) return;

    try {
      if (currentProject.id) {
        const projectRef = doc(db, 'projects', currentProject.id);
        await updateDoc(projectRef, currentProject);
      } else {
        await addDoc(collection(db, 'projects'), {
          ...currentProject,
          slug: currentProject.projectName?.toLowerCase().replace(/ /g, '-') || 'new-project'
        });
      }
      setIsEditing(false);
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
      } catch (err) {
        console.error("Error deleting project:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-bg-soft pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold text-charcoal mb-2">Founder Dashboard</h1>
            <p className="text-muted font-sans">Manage your portfolio and case studies.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                setCurrentProject({
                  brandName: '',
                  projectName: '',
                  category: ProjectCategory.WEB_DESIGN,
                  description: '',
                  result: '',
                  image: '',
                  caseStudy: {
                    overview: { industry: '', services: [] },
                    problem: '',
                    strategy: '',
                    execution: [],
                    results: []
                  }
                });
                setIsEditing(true);
              }}
              className="bg-accent-teal text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-accent-rose transition-all font-sans"
            >
              <Plus className="w-5 h-5" /> Add New Project
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white text-charcoal border border-charcoal/10 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:border-accent-rose transition-all font-sans"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 gap-6">
          {!db ? (
            <div className="bg-white p-20 rounded-[3rem] border border-dashed border-accent-rose/20 text-center">
              <X className="w-16 h-16 text-accent-rose/20 mx-auto mb-6" />
              <h3 className="text-xl font-display font-bold text-charcoal mb-2">Firebase Not Configured</h3>
              <p className="text-muted font-sans">Please set VITE_FIREBASE_API_KEY in the environment variables to manage projects.</p>
            </div>
          ) : loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-accent-teal border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted font-sans">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white p-20 rounded-[3rem] border border-dashed border-charcoal/20 text-center">
              <LayoutGrid className="w-16 h-16 text-muted/20 mx-auto mb-6" />
              <h3 className="text-xl font-display font-bold text-charcoal mb-2">No projects yet</h3>
              <p className="text-muted font-sans">Start by adding your first masterpiece.</p>
            </div>
          ) : (
            projects.map((project) => (
              <motion.div 
                key={project.id}
                layout
                className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-full md:w-48 aspect-video rounded-2xl overflow-hidden shrink-0">
                  <img src={project.image} alt={project.brandName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                    <span className="bg-accent-teal/10 text-accent-teal px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest font-sans">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-bold text-charcoal mb-1">{project.projectName}</h3>
                  <p className="text-muted text-sm font-sans">{project.brandName} • {project.result}</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => {
                      setCurrentProject(project);
                      setIsEditing(true);
                    }}
                    className="p-4 bg-bg-soft text-charcoal rounded-2xl hover:bg-accent-teal hover:text-white transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-4 bg-bg-soft text-accent-rose rounded-2xl hover:bg-accent-rose hover:text-white transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditing && currentProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsEditing(false)}
                className="absolute inset-0 bg-charcoal/60 backdrop-blur-md"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl p-12"
              >
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-display font-bold text-charcoal">
                    {currentProject.id ? 'Edit Project' : 'New Project'}
                  </h2>
                  <button onClick={() => setIsEditing(false)} className="p-3 hover:bg-bg-soft rounded-full transition-colors text-muted">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-10">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Brand Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-teal transition-all font-sans"
                        value={currentProject.brandName}
                        onChange={(e) => setCurrentProject({...currentProject, brandName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Project Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-teal transition-all font-sans"
                        value={currentProject.projectName}
                        onChange={(e) => setCurrentProject({...currentProject, projectName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Category</label>
                      <select 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-teal transition-all font-sans appearance-none"
                        value={currentProject.category}
                        onChange={(e) => setCurrentProject({...currentProject, category: e.target.value as ProjectCategory})}
                      >
                        {Object.values(ProjectCategory).map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Main Result (e.g. +42% Reach)</label>
                      <input 
                        type="text" 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-teal transition-all font-sans"
                        value={currentProject.result}
                        onChange={(e) => setCurrentProject({...currentProject, result: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Main Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/30" />
                      <input 
                        type="text" 
                        className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-accent-teal transition-all font-sans"
                        value={currentProject.image}
                        onChange={(e) => setCurrentProject({...currentProject, image: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Short Description</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-teal transition-all font-sans resize-none"
                      value={currentProject.description}
                      onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                      required
                    />
                  </div>

                  {/* Case Study Fields would go here - simplified for now */}
                  <div className="pt-6 border-t border-charcoal/5">
                    <button 
                      type="submit"
                      className="w-full bg-accent-teal text-white py-5 rounded-2xl font-bold hover:bg-accent-rose transition-all duration-500 flex items-center justify-center gap-2 font-sans"
                    >
                      <Save className="w-5 h-5" /> Save Project Details
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

export default Dashboard;
