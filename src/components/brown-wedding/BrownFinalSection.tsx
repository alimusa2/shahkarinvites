import React from 'react';
import { Heart, RotateCcw, ArrowUp } from 'lucide-react';

interface BrownFinalSectionProps {
  partnerOne?: string;
  partnerTwo?: string;
  onReplay: () => void;
  onScrollToTop: () => void;
}

export const BrownFinalSection: React.FC<BrownFinalSectionProps> = ({
  partnerOne = 'Ayesha',
  partnerTwo = 'Zayd',
  onReplay,
  onScrollToTop,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto my-12 px-4 flex flex-col items-center text-center select-none">
      {/* SECTION H — FINAL WEDDING INVITATION MESSAGE */}
      <div className="w-full relative p-8 sm:p-10 rounded-2xl bg-[#1D100B] border border-[#B88A55]/40 shadow-2xl overflow-hidden mb-10">
        {/* Subtle antique gold corner filigree */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#B88A55]/60" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#B88A55]/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#B88A55]/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#B88A55]/60" />

        <div className="w-8 h-[1px] bg-[#B88A55]/60 mx-auto mb-4" />

        <p className="bw-font-serif text-xl sm:text-2xl text-[#FFF1DC] font-light leading-relaxed tracking-wide">
          Your presence and prayers will make our celebration complete.
        </p>
        <p className="bw-font-script text-3xl sm:text-4xl text-[#D4A86A] mt-2.5">
          {partnerOne} &amp; {partnerTwo}
        </p>

        <div className="flex items-center justify-center gap-2 mt-4 text-[#B88A55]">
          <span className="w-6 h-[1px] bg-[#B88A55]/40" />
          <Heart size={14} className="fill-[#B88A55]/40" />
          <span className="w-6 h-[1px] bg-[#B88A55]/40" />
        </div>
      </div>

      {/* SECTION I — END CARD */}
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#24140F] border border-[#B88A55]/40 flex items-center justify-center mb-3 shadow">
          <Heart size={15} className="text-[#D4A86A] fill-[#D4A86A]" />
        </div>

        <h3 className="bw-font-script text-3xl sm:text-4xl text-[#E8D7BD] tracking-wide mb-1">
          With Love &amp; Gratitude
        </h3>

        {/* Ornamental Divider Line */}
        <div className="flex items-center gap-3 my-4">
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B88A55] to-transparent" />
          <span className="text-xs text-[#B88A55]">✦</span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-[#B88A55] to-transparent" />
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-[#8E6534] font-sans mb-8">
          Together in Love &amp; Faith
        </p>

        {/* Two Restrained Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
          {/* Replay */}
          <button
            onClick={onReplay}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#24140F] hover:bg-[#382118] border border-[#B88A55]/50 hover:border-[#D4A86A] text-[#E8D7BD] hover:text-[#FFF1DC] text-xs uppercase tracking-wider font-sans transition-all active:scale-95 shadow-lg"
            aria-label="Replay experience from cinematic intro"
          >
            <RotateCcw size={14} className="text-[#D4A86A]" />
            <span>Replay Experience</span>
          </button>

          {/* Return to Invitation */}
          <button
            onClick={onScrollToTop}
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B88A55]/20 hover:bg-[#B88A55]/30 border border-[#B88A55]/60 text-[#FFF1DC] text-xs uppercase tracking-wider font-sans transition-all active:scale-95 shadow-lg"
            aria-label="Scroll back up to the invitation card"
          >
            <ArrowUp size={14} className="text-[#D4A86A]" />
            <span>Return to Invitation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
