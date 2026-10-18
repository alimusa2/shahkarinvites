import React, { useState, useEffect } from 'react';
import { GoldEmblem } from './GoldEmblem';
import { Sparkles, RefreshCw } from 'lucide-react';

interface InvitationLoaderProps {
  onLoaded: () => void;
  cardImage?: string;
  coupleImage?: string;
}

export const InvitationLoader: React.FC<InvitationLoaderProps> = ({
  onLoaded,
  cardImage = '/assets/emerald-card.jpg',
  coupleImage = '/assets/couple.jpg',
}) => {
  const [progress, setProgress] = useState(15);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const totalAssets = 2;

    const handleAssetLoad = () => {
      loadedCount++;
      if (isMounted) {
        const nextProgress = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
        setProgress(nextProgress);
        if (loadedCount >= totalAssets) {
          // Smooth, brief transition when ready (no artificial long lag)
          setTimeout(() => {
            if (isMounted) onLoaded();
          }, 350);
        }
      }
    };

    const handleAssetError = () => {
      // Gracefully continue even if an asset fails
      loadedCount++;
      if (isMounted) {
        if (loadedCount >= totalAssets) {
          setTimeout(() => {
            if (isMounted) onLoaded();
          }, 300);
        }
      }
    };

    // Preload essential invitation assets
    const img1 = new Image();
    img1.src = cardImage;
    img1.onload = handleAssetLoad;
    img1.onerror = handleAssetError;

    const img2 = new Image();
    img2.src = coupleImage;
    img2.onload = handleAssetLoad;
    img2.onerror = handleAssetError;

    // Safety timeout: transition after max 1.8s regardless of network conditions
    const safetyTimer = setTimeout(() => {
      if (isMounted && loadedCount < totalAssets) {
        setProgress(100);
        setTimeout(() => {
          if (isMounted) onLoaded();
        }, 250);
      }
    }, 1800);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, [cardImage, coupleImage, onLoaded]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070E0A] text-ivory px-4 select-none">
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-gold-champagne/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D6B777_0.6px,transparent_0.6px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Center Refined Emblem with subtle gold shimmer */}
      <div className="relative mb-6">
        <div className="relative z-10 p-3 rounded-full bg-black/40 border border-gold-border/60 shadow-gold-sm">
          <GoldEmblem size={48} className="animate-spin-slow" />
        </div>
        <div className="absolute -inset-2 rounded-full bg-gold-champagne/20 blur-md animate-pulse pointer-events-none" />
      </div>

      {/* Typography */}
      <div className="text-center mb-6 z-10 max-w-xs">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gold-champagne font-sans block mb-2 font-medium">
          Cardiva Haute Atelier
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide leading-tight drop-shadow-sm">
          Preparing Your Invitation
        </h2>
        <p className="text-text-secondary text-xs font-light mt-1.5 italic">
          Crafting bespoke digital wedding stationery
        </p>
      </div>

      {/* Thin understated gold progress indicator */}
      <div className="w-full max-w-[200px] z-10 flex flex-col items-center">
        <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-gold-border/40 p-[1px]">
          <div
            className="h-full bg-gradient-to-r from-gold-muted via-gold-champagne to-gold-light rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full mt-2.5 text-[10px] text-gold-champagne/80 font-sans tracking-widest uppercase">
          <span className="flex items-center gap-1">
            <Sparkles size={10} className="text-gold-light" />
            <span>Loading</span>
          </span>
          <span>{progress}%</span>
        </div>
      </div>

      {/* Fallback skip / retry if network is slow */}
      <button
        onClick={onLoaded}
        className="mt-6 text-[10px] uppercase tracking-wider text-text-muted hover:text-gold-champagne transition-colors z-10 underline underline-offset-4"
      >
        Open Directly &rarr;
      </button>
    </div>
  );
};
