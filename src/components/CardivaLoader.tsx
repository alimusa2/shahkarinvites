import React, { useState, useEffect } from 'react';
import { GoldEmblem } from './GoldEmblem';
import { Sparkles } from 'lucide-react';

interface CardivaLoaderProps {
  onComplete: () => void;
}

export const CardivaLoader: React.FC<CardivaLoaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'closed' | 'unfolding' | 'revealed'>('closed');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Stage 1: Progress meter fills smoothly
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 80);

    // Stage 2: Card unseals and folds open
    const t1 = setTimeout(() => {
      setStage('unfolding');
    }, 900);

    // Stage 3: Smooth dissolve to platform
    const t2 = setTimeout(() => {
      setStage('revealed');
      setTimeout(onComplete, 500);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070A08] transition-opacity duration-700 select-none ${
        stage === 'revealed' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Cinematic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gold-champagne/10 rounded-full blur-[90px] pointer-events-none" />

      {/* The Luxury Card Folio */}
      <div className="relative w-[88vw] max-w-[340px] aspect-[4/5] sm:aspect-[3/4] perspective-1000">
        
        {/* Folio Back / Base Card */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#0D2419] to-[#07160F] border border-gold-champagne/40 shadow-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Subtle Islamic geometric watermarking */}
          <div className="absolute inset-0 bg-[radial-gradient(#D6B777_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
          
          <GoldEmblem size={52} className="mb-4 animate-pulse" />

          <h2 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mb-1">
            Cardiva
          </h2>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-champagne/90 font-sans mb-4">
            Haute Invitation Studio
          </span>

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-champagne to-transparent mb-4" />

          <p className="text-[11px] text-text-secondary font-light italic max-w-[200px]">
            Every Celebration Begins with an Invitation.
          </p>
        </div>

        {/* Left Folding Door / Flap */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#091D14] to-[#0D261B] rounded-l-2xl border-l border-y border-gold-border/60 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xl ${
            stage !== 'closed' ? '-rotate-y-110 opacity-30' : 'rotate-y-0 opacity-100'
          }`}
          style={{ transformOrigin: 'left center' }}
        >
          <div className="absolute inset-y-0 right-0 w-[1px] bg-gold-champagne/30" />
        </div>

        {/* Right Folding Door / Flap */}
        <div
          className={`absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#091D14] to-[#0D261B] rounded-r-2xl border-r border-y border-gold-border/60 origin-right transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-xl flex items-center justify-center ${
            stage !== 'closed' ? 'rotate-y-110 opacity-30' : 'rotate-y-0 opacity-100'
          }`}
          style={{ transformOrigin: 'right center' }}
        >
          <div className="absolute inset-y-0 left-0 w-[1px] bg-gold-champagne/30" />
        </div>

        {/* Central Wax Seal Crest */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ease-out ${
            stage !== 'closed'
              ? 'scale-125 opacity-0 pointer-events-none'
              : 'scale-100 opacity-100'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#801217] via-[#A81822] to-[#600C10] border-2 border-gold-champagne shadow-2xl flex items-center justify-center">
            <span className="font-serif text-2xl font-bold text-gold-light drop-shadow">
              C
            </span>
          </div>
        </div>

      </div>

      {/* Loading Progress Bar & Status */}
      <div className="mt-8 flex flex-col items-center max-w-[220px] w-full px-4">
        <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden border border-gold-border/30 mb-3">
          <div
            className="h-full bg-gradient-to-r from-gold-muted via-gold-champagne to-gold-light transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[10px] tracking-widest uppercase text-gold-champagne/80 font-sans">
          <span>{stage === 'closed' ? 'Preparing Atelier...' : 'Unfolding Invitation...'}</span>
          <span>{progress}%</span>
        </div>

        {/* Skip button for immediate entry */}
        <button
          onClick={onComplete}
          className="mt-4 text-[10px] uppercase tracking-wider text-text-muted hover:text-gold-light transition-colors py-1"
        >
          Skip Intro &rarr;
        </button>
      </div>
    </div>
  );
};
