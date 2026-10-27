import React, { useState, useRef } from 'react';
import { Heart, Sparkles, BookOpen } from 'lucide-react';
import { BrownWaxSeal } from './BrownWaxSeal';
import { brownAudio } from './BrownAudioController';

interface BrownInvitationCardProps {
  partnerOne?: string;
  partnerTwo?: string;
  weddingDate?: string;
  venueName?: string;
  onOpenStateChange?: (isOpen: boolean) => void;
}

export const BrownInvitationCard: React.FC<BrownInvitationCardProps> = ({
  partnerOne = 'Aayan',
  partnerTwo = 'Meher',
  weddingDate = 'Saturday, the 24th of October, 2026',
  venueName = 'The Royal Palm Garden & Pavilion',
  onOpenStateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!isOpen) {
      brownAudio.playCardOpenChime();
      setIsOpen(true);
      onOpenStateChange?.(true);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      handleOpen();
    } else {
      setIsOpen(false);
      onOpenStateChange?.(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className="bw-perspective-1200 w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] mx-auto my-6 px-2 sm:px-0 select-none transition-all duration-700"
      id="invitation-card"
    >
      {/* 3D Invitation Container */}
      <div
        className={`relative w-full rounded-t-[140px] sm:rounded-t-[170px] rounded-b-2xl transition-all duration-1000 bw-preserve-3d ${
          isOpen ? 'shadow-[0_25px_60px_rgba(0,0,0,0.85)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.7)]'
        }`}
        style={{
          minHeight: '560px',
        }}
      >
        {/* =========================================================
            LAYER 1: INNER PAGES (REVEALED WHEN COVER FLIPS OPEN)
            ========================================================= */}
        <div
          className={`w-full h-full rounded-t-[140px] sm:rounded-t-[170px] rounded-b-2xl p-6 sm:p-8 flex flex-col items-center justify-between transition-opacity duration-700 bw-paper-ivory border border-[#B88A55]/30 ${
            isOpen ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={{
            boxShadow: 'inset 0 0 40px rgba(74, 46, 35, 0.08), 0 15px 35px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Inner Arched Decorative Border */}
          <div
            className="w-full h-full rounded-t-[125px] sm:rounded-t-[150px] rounded-b-xl border border-[#B88A55]/40 p-5 sm:p-7 flex flex-col items-center justify-between text-center relative"
            style={{
              boxShadow: 'inset 0 0 0 3px rgba(247, 240, 229, 0.9), inset 0 0 0 4px rgba(184, 138, 85, 0.3)',
            }}
          >
            {/* Top Ornamental Flourish */}
            <div className="flex flex-col items-center pt-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E6534] font-sans font-medium">
                Our Wedding Invitation
              </span>
              <div className="w-12 h-[1px] bg-[#B88A55]/50 my-2" />
            </div>

            {/* Romantic Couple Photograph in Antique Frame */}
            <div className="relative my-3 p-1.5 rounded-xl bg-[#FFFDF9] border border-[#B88A55]/40 shadow-md max-w-[210px] sm:max-w-[240px]">
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#24140F]">
                <img
                  src="/assets/brown-card/memory-2.jpg"
                  alt="Couple by warm candlelight"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* SECTION E: PERSONAL MESSAGE */}
            <div className="max-w-xs my-2">
              <div className="flex items-center justify-center gap-1.5 text-[#B88A55] mb-2">
                <Heart size={13} className="fill-[#B88A55]" />
              </div>

              <blockquote className="bw-font-serif text-base sm:text-lg text-[#382118] font-medium leading-relaxed italic">
                “Some moments become memories.<br />
                Some people become home.<br />
                And some stories are too beautiful not to celebrate.”
              </blockquote>
            </div>

            {/* Event Schedule Details */}
            <div className="pt-3 border-t border-[#B88A55]/30 w-full text-center">
              <p className="bw-font-script text-2xl text-[#8E6534] leading-tight">
                {partnerOne} & {partnerTwo}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-[#4A2E23] font-sans font-semibold mt-1">
                {weddingDate}
              </p>
              <p className="text-[11px] text-[#6E4E37] font-serif mt-0.5">
                {venueName}
              </p>
            </div>

            {/* Close / Fold Back button */}
            <button
              onClick={handleToggle}
              type="button"
              className="mt-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#8E6534] hover:text-[#382118] font-sans flex items-center gap-1 transition-colors"
            >
              <span>Fold Cover</span>
              <span>×</span>
            </button>
          </div>
        </div>

        {/* =========================================================
            LAYER 2: FRONT COVER (3D ANIMATED OPENING)
            ========================================================= */}
        <div
          className={`absolute inset-0 rounded-t-[140px] sm:rounded-t-[170px] rounded-b-2xl bw-paper-espresso border border-[#B88A55]/50 overflow-hidden transition-all duration-1000 ${
            isOpen
              ? '-rotate-y-180 pointer-events-none opacity-0 scale-95 origin-left'
              : 'rotate-y-0 opacity-100 z-20 origin-left shadow-2xl'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle Arch Foil Frame (Matching Storyboard Frame 3 & 4) */}
          <div
            className="w-full h-full rounded-t-[138px] sm:rounded-t-[168px] rounded-b-xl p-6 sm:p-8 flex flex-col items-center justify-between text-center relative"
            style={{
              boxShadow: 'inset 0 0 0 2px rgba(184, 138, 85, 0.45), inset 0 0 25px rgba(0, 0, 0, 0.7)',
            }}
          >
            {/* Candlelight Ambient Glow Behind Arch */}
            <div
              className="bw-candle-glow absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-36 rounded-full pointer-events-none blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(212, 168, 106, 0.28) 0%, rgba(184, 138, 85, 0.08) 60%, transparent 80%)',
              }}
            />

            {/* Top Arched Title */}
            <div className="pt-6 sm:pt-8 flex flex-col items-center">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#D4A86A] font-sans font-medium drop-shadow">
                A Beautiful Beginning
              </span>

              {/* Decorative Arch Emblem */}
              <div className="flex items-center gap-3 my-3">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#B88A55]" />
                <span className="text-xs text-[#FFF1DC]">✦</span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#B88A55]" />
              </div>

              {/* Storyboard Frame 3 Calligraphy: "You & Me" */}
              <h2 className="bw-font-script text-4xl sm:text-5xl text-[#FFF1DC] tracking-wide my-1 drop-shadow-lg">
                {partnerOne} & {partnerTwo}
              </h2>

              <p className="text-xs text-[#E8D7BD] font-serif tracking-widest uppercase mt-1">
                Together, always.
              </p>
            </div>

            {/* Center Storyboard Frame 4: Ribbon with Wax Seal */}
            <div className="relative my-4 flex flex-col items-center">
              {/* Horizontal Silk Ribbon across cover */}
              <div
                className="w-48 sm:w-56 h-6 rounded-sm shadow-md flex items-center justify-center relative -mb-6"
                style={{
                  background: 'linear-gradient(90deg, #24140F 0%, #4A2E23 35%, #5C3A2D 50%, #4A2E23 65%, #24140F 100%)',
                  borderTop: '1px solid rgba(184, 138, 85, 0.4)',
                  borderBottom: '1px solid rgba(184, 138, 85, 0.4)',
                }}
              />

              {/* Antique Gold Wax Seal Button */}
              <div className="relative z-10">
                <BrownWaxSeal
                  label="Open your wedding invitation"
                  onClick={handleOpen}
                  size={72}
                  initials="Y&M"
                />
              </div>

              <span className="bw-font-script text-lg text-[#E8D7BD] mt-2">
                A Little Something For You
              </span>
            </div>

            {/* Open Invitation CTA Interaction */}
            <div className="pb-4 w-full flex flex-col items-center">
              <button
                type="button"
                onClick={handleOpen}
                className="group relative px-6 py-3 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300 active:scale-95 shadow-xl hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #FFF1DC 0%, #D4A86A 50%, #B88A55 100%)',
                  color: '#24140F',
                  boxShadow: '0 6px 20px rgba(184, 138, 85, 0.35)',
                }}
                aria-label="Open wedding invitation"
              >
                <BookOpen size={14} className="transition-transform group-hover:scale-110" />
                <span>Open Your Invitation</span>
                <Sparkles size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
              </button>

              <span className="text-[10px] text-[#B88A55]/80 font-serif tracking-wider uppercase mt-2">
                Tap to unfold the celebration
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
