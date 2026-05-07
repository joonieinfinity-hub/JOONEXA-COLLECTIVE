import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Save, X, Loader2, Layout, Briefcase, ExternalLink, Sparkles, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ImageUploader from './ImageUploader';

interface PortfolioItem {
  id: string;
  brandName: string;
  campaignType: string;
  description: string;
  results: string;
  imageURL: string;
  order: number;
}

const PortfolioManager: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Partial<PortfolioItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'preview'>('grid');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'portfolio'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const fetchedItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PortfolioItem));
      setItems(fetchedItems);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      toast.error('Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingItem?.brandName || !editingItem?.imageURL) {
      toast.error('Brand name and image are required');
      return;
    }

    setSaving(true);
    try {
      if (editingItem.id) {
        const docRef = doc(db, 'portfolio', editingItem.id);
        await updateDoc(docRef, editingItem);
        toast.success('Project updated');
      } else {
        const newItem = {
          ...editingItem,
          order: items.length
        };
        await addDoc(collection(db, 'portfolio'), newItem);
        toast.success('Project added');
      }
      setEditingItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'portfolio', id));
      toast.success('Project deleted');
      fetchItems();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent-rose" /></div>;

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent-teal/10 text-accent-teal rounded-2xl flex items-center justify-center">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-charcoal">Portfolio Manager</h3>
            <p className="text-xs text-muted font-sans font-medium uppercase tracking-widest">{items.length} Projects Published</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-charcoal/5 rounded-xl mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
              title="Grid View"
            >
              <Layout className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('preview')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'preview' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
              title="Preview Mode"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={() => setEditingItem({ brandName: '', campaignType: '', description: '', results: '', imageURL: '' })}
            className="btn-primary px-6 py-3 flex items-center gap-2 text-sm shadow-lg shadow-accent-rose/20"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {editingItem && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-charcoal/5 shadow-2xl shadow-black/5 space-y-8 mb-12">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent-rose/10 text-accent-rose rounded-xl flex items-center justify-center">
                    <Edit2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-charcoal">{editingItem.id ? 'Edit Project' : 'New Project'}</h4>
                </div>
                <button onClick={() => setEditingItem(null)} className="w-10 h-10 rounded-full hover:bg-bg-soft flex items-center justify-center transition-colors text-muted">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Brand Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={editingItem.brandName}
                      onChange={(e) => setEditingItem({...editingItem, brandName: e.target.value})}
                      placeholder="e.g. Aura Skincare"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Campaign Type</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={editingItem.campaignType}
                      onChange={(e) => setEditingItem({...editingItem, campaignType: e.target.value})}
                      placeholder="e.g. Influencer Partnership"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Description</label>
                    <textarea 
                      rows={3}
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none text-charcoal"
                      value={editingItem.description}
                      onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                      placeholder="Describe the project goals and execution..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Key Results</label>
                    <input 
                      type="text" 
                      className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal"
                      value={editingItem.results}
                      onChange={(e) => setEditingItem({...editingItem, results: e.target.value})}
                      placeholder="e.g. 2.4M Impressions, 15% ROI"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <ImageUploader 
                    label="Project Cover Image"
                    currentImageUrl={editingItem.imageURL}
                    onUploadSuccess={(url) => setEditingItem({...editingItem, imageURL: url})}
                    folder="portfolio"
                  />
                  
                  {/* Live Card Preview */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Card Preview</label>
                    <div className="bg-bg-soft p-6 rounded-[2rem] border border-charcoal/5">
                      <div className="bg-white rounded-2xl overflow-hidden border border-charcoal/5 shadow-sm max-w-sm mx-auto">
                        <div className="aspect-video bg-charcoal/5 relative">
                          {editingItem.imageURL ? (
                            <img src={editingItem.imageURL} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted/20">
                              <Layout className="w-8 h-8" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h5 className="font-display font-bold text-charcoal">{editingItem.brandName || 'Brand Name'}</h5>
                          <p className="text-[10px] text-muted uppercase tracking-widest mt-1">{editingItem.campaignType || 'Campaign Type'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button onClick={() => setEditingItem(null)} className="px-8 py-4 text-sm font-bold text-muted hover:text-charcoal transition-colors">Cancel</button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary px-12 py-4 flex items-center gap-3 group"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />}
                  {editingItem.id ? 'Update Project' : 'Save Project'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="bg-white rounded-[2.5rem] overflow-hidden border border-charcoal/5 group hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                {item.imageURL ? (
                  <img src={item.imageURL} alt={item.brandName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-charcoal/5 flex items-center justify-center">
                    <Layout className="w-12 h-12 text-charcoal/10" />
                  </div>
                )}
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="w-12 h-12 bg-white text-charcoal rounded-full flex items-center justify-center hover:bg-accent-teal hover:text-white transition-all shadow-xl"
                    title="Edit Project"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-12 h-12 bg-accent-rose text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    title="Delete Project"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-charcoal uppercase tracking-widest shadow-sm">
                    {item.results || 'Case Study'}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-display font-bold text-charcoal text-xl">{item.brandName}</h5>
                  <ExternalLink className="w-4 h-4 text-muted/20" />
                </div>
                <p className="text-xs text-muted font-sans font-bold uppercase tracking-widest mb-4">{item.campaignType}</p>
                <p className="text-sm text-muted/60 line-clamp-2 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-charcoal p-12 rounded-[4rem] border border-white/10 shadow-3xl shadow-black/50">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/5 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3 text-accent-rose" />
              Live Portfolio Preview
            </span>
            <h2 className="text-4xl font-display font-bold text-white">Our Recent Work</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {items.map((item) => (
              <div key={item.id} className="group relative">
                <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 border border-white/5">
                  {item.imageURL ? (
                    <img src={item.imageURL} alt={item.brandName} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-full h-full bg-white/5 flex items-center justify-center">
                      <Layout className="w-12 h-12 text-white/10" />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-display font-bold text-white">{item.brandName}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-accent-rose text-xs font-bold uppercase tracking-widest">{item.campaignType}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-white/40 text-xs font-medium">{item.results}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;
