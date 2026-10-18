import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { GoldEmblem } from './GoldEmblem';

interface FinalCTAProps {
  onOpenCustomizer?: () => void;
  onExploreDesigns?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenCustomizer,
  onExploreDesigns,
}) => {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden text-center bg-gradient-to-b from-transparent via-[#0f1f16]/40 to-background-main">
      {/* Golden glow & bokeh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-gold-champagne/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        <GoldEmblem size={44} className="mb-6 opacity-90" />

        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-gold-champagne" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
            Begin Your Celebration
          </span>
          <Sparkles size={14} className="text-gold-champagne" />
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-ivory tracking-tight mb-6 max-w-2xl leading-tight">
          Your Celebration Deserves More Than an Ordinary Card.
        </h2>

        <p className="text-text-secondary text-base sm:text-lg max-w-xl font-light mb-10 leading-relaxed">
          Create an invitation your guests will remember. Elegant animations, seamless WhatsApp delivery, and effortless RSVP tracking.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenCustomizer}
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-md hover:shadow-gold-lg flex items-center justify-center gap-2"
          >
            <span>Create Your Invitation</span>
            <ArrowRight size={15} />
          </button>

          <button
            onClick={onExploreDesigns}
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-gold-border/80 hover:border-gold-champagne text-gold-champagne hover:text-gold-light text-xs uppercase tracking-widest font-medium transition-all duration-300 bg-black/30 backdrop-blur-sm"
          >
            Explore Designs
          </button>
        </div>
      </div>
    </section>
  );
};
