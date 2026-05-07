import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Plus, Trash2, CreditCard, Check, Sparkles, Eye, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface PricingData {
  starterPrice: string;
  growthPrice: string;
  premiumPrice: string;
  starterFeatures: string[];
  growthFeatures: string[];
  premiumFeatures: string[];
}

const PricingSettings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [data, setData] = useState<PricingData>({
    starterPrice: '',
    growthPrice: '',
    premiumPrice: '',
    starterFeatures: [],
    growthFeatures: [],
    premiumFeatures: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'pricing', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data() as PricingData);
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
        toast.error('Failed to load pricing');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const docRef = doc(db, 'pricing', 'main');
      await setDoc(docRef, data);
      toast.success('Pricing updated successfully');
    } catch (error) {
      console.error('Error saving pricing:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const addFeature = (tier: 'starter' | 'growth' | 'premium') => {
    const key = `${tier}Features` as keyof PricingData;
    setData({
      ...data,
      [key]: [...(data[key] as string[]), '']
    });
  };

  const updateFeature = (tier: 'starter' | 'growth' | 'premium', index: number, value: string) => {
    const key = `${tier}Features` as keyof PricingData;
    const newFeatures = [...(data[key] as string[])];
    newFeatures[index] = value;
    setData({ ...data, [key]: newFeatures });
  };

  const removeFeature = (tier: 'starter' | 'growth' | 'premium', index: number) => {
    const key = `${tier}Features` as keyof PricingData;
    const newFeatures = (data[key] as string[]).filter((_, i) => i !== index);
    setData({ ...data, [key]: newFeatures });
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-accent-rose" /></div>;

  const TierEditor = ({ title, tier, priceKey, featuresKey, color }: { title: string, tier: 'starter' | 'growth' | 'premium', priceKey: keyof PricingData, featuresKey: keyof PricingData, color: string }) => (
    <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-charcoal/5 shadow-xl shadow-black/5 space-y-8">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color === 'rose' ? 'bg-accent-rose/10 text-accent-rose' : 'bg-accent-teal/10 text-accent-teal'}`}>
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-display font-bold text-charcoal">{title} Tier</h4>
          <p className="text-[10px] text-muted font-black uppercase tracking-widest">Pricing & Features</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 ml-4 font-sans">Monthly Price</label>
        <div className="relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-muted/40 font-bold">$</span>
          <input 
            type="text" 
            className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 pl-10 pr-6 focus:outline-none focus:border-accent-rose transition-all font-sans text-charcoal font-bold"
            value={data[priceKey] as string}
            onChange={(e) => setData({...data, [priceKey]: e.target.value})}
            placeholder="999"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted/40 font-sans">Included Features</label>
          <button 
            type="button"
            onClick={() => addFeature(tier)}
            className="w-8 h-8 bg-charcoal/5 rounded-full flex items-center justify-center text-charcoal/40 hover:bg-accent-teal hover:text-white transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {(data[featuresKey] as string[]).map((feature, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={index} 
              className="flex gap-2 group"
            >
              <input 
                type="text" 
                className="flex-1 bg-bg-soft border border-charcoal/5 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-rose transition-all font-sans text-sm text-charcoal"
                value={feature}
                onChange={(e) => updateFeature(tier, index, e.target.value)}
                placeholder="Feature description"
              />
              <button 
                type="button"
                onClick={() => removeFeature(tier, index)}
                className="w-10 h-10 flex items-center justify-center text-muted/20 hover:text-accent-rose transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          {(data[featuresKey] as string[]).length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-charcoal/5 rounded-2xl">
              <p className="text-xs text-muted/40 font-sans">No features added yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-charcoal/5 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('edit')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'edit' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
        >
          <Edit3 className="w-4 h-4" />
          Edit Pricing
        </button>
        <button 
          onClick={() => setActiveTab('preview')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'preview' ? 'bg-white text-charcoal shadow-sm' : 'text-muted hover:text-charcoal'}`}
        >
          <Eye className="w-4 h-4" />
          Live Preview
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'edit' ? (
          <motion.form 
            key="edit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSave} 
            className="space-y-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <TierEditor title="Starter" tier="starter" priceKey="starterPrice" featuresKey="starterFeatures" color="teal" />
              <TierEditor title="Growth" tier="growth" priceKey="growthPrice" featuresKey="growthFeatures" color="rose" />
              <TierEditor title="Premium" tier="premium" priceKey="premiumPrice" featuresKey="premiumFeatures" color="teal" />
            </div>

            <div className="flex justify-end pt-8">
              <button 
                type="submit"
                disabled={saving}
                className="btn-primary px-12 py-5 flex items-center gap-3 shadow-xl shadow-accent-rose/20 group"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                Save Pricing Updates
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-charcoal p-12 md:p-20 rounded-[4rem] border border-white/10 shadow-3xl shadow-black/50"
          >
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/5 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3 h-3 text-accent-rose" />
                Live Pricing Preview
              </span>
              <h2 className="text-4xl font-display font-bold text-white">Investment Tiers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Starter Campaign', price: data.starterPrice, features: data.starterFeatures, color: 'teal' },
                { name: 'Growth Campaign', price: data.growthPrice, features: data.growthFeatures, color: 'rose' },
                { name: 'Brand Partnership', price: data.premiumPrice, features: data.premiumFeatures, color: 'teal' }
              ].map((tier, i) => (
                <div key={i} className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] flex flex-col ${tier.color === 'rose' ? 'ring-2 ring-accent-rose ring-offset-4 ring-offset-charcoal' : ''}`}>
                  <div className="mb-8">
                    <h4 className="text-white font-display font-bold text-xl mb-2">{tier.name}</h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold text-white">${tier.price}</span>
                      <span className="text-white/40 text-xs font-sans">/campaign</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-10 flex-1">
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 ${tier.color === 'rose' ? 'text-accent-rose' : 'text-accent-teal'}`} />
                        <span className="text-white/60 text-sm font-sans">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${tier.color === 'rose' ? 'bg-accent-rose text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingSettings;
