import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, Video, AlertCircle } from 'lucide-react';

interface ProjectMediaProps {
  image: string;
  video?: string;
  brandName: string;
  projectId: string;
  onVideoGenerated?: (videoUrl: string) => void;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const ProjectMedia: React.FC<ProjectMediaProps> = ({ 
  image, 
  video, 
  brandName, 
  projectId,
  onVideoGenerated 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [currentVideo, setCurrentVideo] = useState<string | undefined>(video);

  const handleGenerateVideo = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsGenerating(true);
      setError(null);
      setStatus('Checking API Key...');

      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setStatus('Please select a paid API key...');
        await window.aistudio.openSelectKey();
      }

      setStatus('Initializing AI...');
      // Create a new instance right before the call as per instructions
      const ai = new GoogleGenAI({ apiKey: (process.env as any).API_KEY });

      setStatus('Generating video prompt...');
      
      const prompt = `A cinematic, high-quality, professional looping background video for a boutique French café called "${brandName}". Showcasing the elegant ambiance, soft morning sunlight streaming through windows, steam rising from a fresh cup of coffee on a marble table, minimalist Parisian decor, 4k, professional cinematography, slow motion.`;

      setStatus('Starting video generation (this may take a few minutes)...');
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      let attempts = 0;
      const maxAttempts = 60; // 10 minutes max (10s intervals)
      
      while (!operation.done && attempts < maxAttempts) {
        attempts++;
        setStatus(`Generating... (${attempts * 10}s elapsed)`);
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await (ai as any).operations.getVideosOperation({ operation: operation });
      }

      if (!operation.done) {
        throw new Error('Video generation timed out. Please try again.');
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) {
        throw new Error('Failed to retrieve video link.');
      }

      setStatus('Finalizing video...');
      
      const response = await fetch(downloadLink, {
        method: 'GET',
        headers: {
          'x-goog-api-key': (process.env as any).API_KEY,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
           // Reset key if not found as per instructions
           await window.aistudio.openSelectKey();
           throw new Error('API Key invalid or expired. Please select a valid key.');
        }
        throw new Error('Failed to download generated video.');
      }

      const blob = await response.blob();
      const videoUrl = URL.createObjectURL(blob);
      
      setCurrentVideo(videoUrl);
      if (onVideoGenerated) {
        onVideoGenerated(videoUrl);
      }
      
      setIsGenerating(false);
      setStatus('');
    } catch (err: any) {
      console.error('Video generation error:', err);
      setError(err.message || 'An unexpected error occurred.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative w-full h-full group/media overflow-hidden">
      <AnimatePresence mode="wait">
        {currentVideo ? (
          <motion.video
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={currentVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <motion.img
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={image}
            alt={brandName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/media:scale-110"
            referrerPolicy="no-referrer"
          />
        )}
      </AnimatePresence>

      {/* Overlay for generation */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${isGenerating ? 'bg-charcoal/60 backdrop-blur-md opacity-100' : 'bg-charcoal/0 opacity-0 group-hover/media:opacity-100'}`}>
        {isGenerating ? (
          <div className="text-center p-6 max-w-xs">
            <Loader2 className="w-12 h-12 text-accent-teal animate-spin mx-auto mb-4" />
            <p className="text-white font-display font-bold text-lg mb-2">{status}</p>
            <p className="text-white/60 text-xs font-sans mb-4">We're crafting a professional ambiance video for {brandName}.</p>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-accent-teal"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        ) : !currentVideo && (
          <button
            onClick={handleGenerateVideo}
            className="btn-primary flex items-center gap-2 scale-90 hover:scale-100 transition-transform"
          >
            <Video className="w-4 h-4" />
            Generate Ambiance Video
          </button>
        )}

        {error && (
          <div className="absolute bottom-4 left-4 right-4 bg-accent-rose/90 backdrop-blur-md p-3 rounded-xl flex flex-col gap-2 text-white text-xs">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
              <button onClick={() => setError(null)} className="ml-auto font-bold underline">Dismiss</button>
            </div>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] opacity-80 hover:opacity-100 underline"
            >
              Learn more about billing & API keys
            </a>
          </div>
        )}
      </div>
      
      {currentVideo && !isGenerating && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover/media:opacity-100 transition-opacity">
          <button 
            onClick={handleGenerateVideo}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent-rose transition-colors"
            title="Regenerate Video"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectMedia;
