import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Save, Loader2, Plus, Trash2 } from 'lucide-react';
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

  const TierSection = ({ title, tier, priceKey, featuresKey }: { title: string, tier: 'starter' | 'growth' | 'premium', priceKey: keyof PricingData, featuresKey: keyof PricingData }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-charcoal/5 space-y-6">
      <h4 className="text-lg font-display font-bold text-charcoal">{title} Tier</h4>
      
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Price</label>
        <input 
          type="text" 
          className="w-full bg-bg-soft border border-charcoal/5 rounded-2xl py-4 px-6 focus:outline-none focus:border-accent-rose transition-all font-sans"
          value={data[priceKey] as string}
          onChange={(e) => setData({...data, [priceKey]: e.target.value})}
          placeholder="e.g. $999/mo"
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">Features</label>
          <button 
            type="button"
            onClick={() => addFeature(tier)}
            className="text-accent-teal hover:text-accent-teal/80 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-3">
          {(data[featuresKey] as string[]).map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 bg-bg-soft border border-charcoal/5 rounded-xl py-3 px-4 focus:outline-none focus:border-accent-rose transition-all font-sans text-sm"
                value={feature}
                onChange={(e) => updateFeature(tier, index, e.target.value)}
                placeholder="Feature description"
              />
              <button 
                type="button"
                onClick={() => removeFeature(tier, index)}
                className="text-muted/30 hover:text-accent-rose transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSave} className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <TierSection title="Starter" tier="starter" priceKey="starterPrice" featuresKey="starterFeatures" />
        <TierSection title="Growth" tier="growth" priceKey="growthPrice" featuresKey="growthFeatures" />
        <TierSection title="Premium" tier="premium" priceKey="premiumPrice" featuresKey="premiumFeatures" />
      </div>

      <div className="flex justify-end pt-8">
        <button 
          type="submit"
          disabled={saving}
          className="btn-primary px-12 py-5 flex items-center gap-3 shadow-xl shadow-accent-rose/20"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Pricing updates
        </button>
      </div>
    </form>
  );
};

export default PricingSettings;
