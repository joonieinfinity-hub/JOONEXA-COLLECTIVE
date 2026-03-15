import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Save, X, Loader2, GripVertical } from 'lucide-react';
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
        // Update
        const docRef = doc(db, 'portfolio', editingItem.id);
        await updateDoc(docRef, editingItem);
        toast.success('Project updated');
      } else {
        // Create
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
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-display font-bold text-charcoal">Manage Portfolio</h3>
        <button 
          onClick={() => setEditingItem({ brandName: '', campaignType: '', description: '', results: '', imageURL: '' })}
          className="btn-primary px-6 py-3 flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </button>
      </div>

      {editingItem && (
        <div className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-8">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-display font-bold text-charcoal">{editingItem.id ? 'Edit Project' : 'New Project'}</h4>
            <button onClick={() => setEditingItem(null)} className="text-muted hover:text-charcoal"><X className="w-5 h-5" /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Brand Name</label>
                <input 
                  type="text" 
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  value={editingItem.brandName}
                  onChange={(e) => setEditingItem({...editingItem, brandName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Campaign Type</label>
                <input 
                  type="text" 
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  value={editingItem.campaignType}
                  onChange={(e) => setEditingItem({...editingItem, campaignType: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Description</label>
                <textarea 
                  rows={3}
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans resize-none"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Results</label>
                <input 
                  type="text" 
                  className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
                  value={editingItem.results}
                  onChange={(e) => setEditingItem({...editingItem, results: e.target.value})}
                />
              </div>
            </div>

            <ImageUploader 
              label="Project Image"
              currentImageUrl={editingItem.imageURL}
              onUploadSuccess={(url) => setEditingItem({...editingItem, imageURL: url})}
              folder="portfolio"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button onClick={() => setEditingItem(null)} className="px-8 py-4 text-sm font-bold text-muted hover:text-charcoal transition-colors">Cancel</button>
            <button 
              onClick={handleSave}
              disabled={saving}
              className="btn-primary px-12 py-4 flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {editingItem.id ? 'Update Project' : 'Save Project'}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden border border-charcoal/5 group hover:shadow-xl hover:shadow-black/5 transition-all">
            <div className="aspect-video relative">
              <img src={item.imageURL} alt={item.brandName} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="w-10 h-10 bg-white text-charcoal rounded-full flex items-center justify-center hover:bg-accent-rose hover:text-white transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="w-10 h-10 bg-accent-rose text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h5 className="font-display font-bold text-charcoal text-lg">{item.brandName}</h5>
              <p className="text-xs text-muted uppercase tracking-widest mt-1">{item.campaignType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioManager;
