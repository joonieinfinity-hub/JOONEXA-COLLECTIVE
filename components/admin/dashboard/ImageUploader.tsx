import React, { useState } from 'react';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, Loader2, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  currentImageUrl?: string;
  label?: string;
  folder?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onUploadSuccess, 
  currentImageUrl, 
  label = "Upload Image",
  folder = "general"
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setPreview(url);
      onUploadSuccess(url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-xs font-bold uppercase tracking-widest text-muted/50 ml-2 font-sans">{label}</label>}
      
      <div className="relative group">
        <div className={`
          relative w-full aspect-video rounded-3xl overflow-hidden border-2 border-dashed transition-all
          ${preview ? 'border-transparent' : 'border-charcoal/10 bg-bg-soft hover:border-accent-rose/30'}
        `}>
          {preview ? (
            <>
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <label className="cursor-pointer bg-white text-charcoal px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent-rose hover:text-white transition-all">
                  Change
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
                <button 
                  onClick={() => { setPreview(null); onUploadSuccess(''); }}
                  className="bg-accent-rose text-white p-2 rounded-full hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <label className="absolute inset-0 cursor-pointer flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                {uploading ? <Loader2 className="w-6 h-6 text-accent-rose animate-spin" /> : <Upload className="w-6 h-6 text-accent-rose" />}
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-charcoal">Click to upload</p>
                <p className="text-[10px] text-muted uppercase tracking-widest mt-1">PNG, JPG up to 5MB</p>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          )}
        </div>

        {uploading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-3xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-accent-rose animate-spin" />
              <p className="text-xs font-bold uppercase tracking-widest text-accent-rose">Uploading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
