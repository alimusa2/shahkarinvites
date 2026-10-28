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
  partnerOne = 'Ayesha',
  partnerTwo = 'Zayd',
  weddingDate = 'Saturday, the 24th of October, 2026',
  venueName = 'The Royal Palm Garden & Pavilion, Lahore',
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

  const coupleInitials = `${partnerOne.charAt(0)} & ${partnerTwo.charAt(0)}`;

  return (
    <div
      ref={cardRef}
      className="bw-perspective-1200 w-full max-w-[min(94vw,370px)] sm:max-w-[440px] lg:max-w-[480px] mx-auto my-6 px-1 sm:px-0 select-none transition-all duration-700"
      id="invitation-card"
    >
      {/* 3D Invitation Container */}
      <div
        className={`relative w-full rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl transition-all duration-1000 bw-preserve-3d ${
          isOpen ? 'shadow-[0_25px_60px_rgba(0,0,0,0.9)]' : 'shadow-[0_20px_50px_rgba(0,0,0,0.75)]'
        }`}
        style={{
          minHeight: '560px',
        }}
      >
        {/* =========================================================
            LAYER 1: INNER PAGES (REVEALED WHEN COVER FLIPS OPEN)
            ========================================================= */}
        <div
          className={`w-full h-full rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl p-5 sm:p-8 flex flex-col items-center justify-between transition-opacity duration-700 bw-paper-ivory border-2 border-[#B88A55]/40 ${
            isOpen ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          style={{
            boxShadow: 'inset 0 0 50px rgba(74, 46, 35, 0.12), 0 20px 45px rgba(0, 0, 0, 0.6)',
          }}
        >
          {/* Inner Arched Decorative Border with Double Gold Inset */}
          <div
            className="w-full h-full rounded-t-[115px] sm:rounded-t-[140px] rounded-b-xl border border-[#B88A55]/50 p-4 sm:p-7 flex flex-col items-center justify-between text-center relative"
            style={{
              boxShadow: 'inset 0 0 0 3px rgba(247, 240, 229, 0.95), inset 0 0 0 4.5px rgba(184, 138, 85, 0.4)',
            }}
          >
            {/* Top Bismillah Calligraphy & Header */}
            <div className="flex flex-col items-center pt-2">
              <span className="text-sm sm:text-base text-[#8E6534] font-arabic tracking-widest mb-1 opacity-90 drop-shadow-sm">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#8E6534] font-sans font-semibold">
                Together With Their Families
              </span>
              <div className="flex items-center gap-2 my-2">
                <span className="w-8 h-[1px] bg-[#B88A55]/50" />
                <span className="text-[10px] text-[#B88A55]">❦</span>
                <span className="w-8 h-[1px] bg-[#B88A55]/50" />
              </div>
            </div>

            {/* Couple Photograph in Antique Arch Frame */}
            <div className="relative my-2 p-1.5 rounded-xl bg-[#FFFDF9] border border-[#B88A55]/50 shadow-md max-w-[200px] sm:max-w-[230px]">
              <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-[#24140F]">
                <img
                  src="/assets/brown-card/memory-2.jpg"
                  alt={`${partnerOne} and ${partnerTwo}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-1.5 pb-0.5 text-center">
                <span className="bw-font-script text-base text-[#8E6534]">
                  {partnerOne} & {partnerTwo}
                </span>
              </div>
            </div>

            {/* Sacred Wedding Quranic Verse / Blessing (NO PROPOSAL) */}
            <div className="max-w-xs my-2 px-2">
              <blockquote className="bw-font-serif text-xs sm:text-sm text-[#382118] font-normal leading-relaxed italic">
                “And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you love and mercy.”
              </blockquote>
              <span className="text-[9px] uppercase tracking-widest text-[#8E6534] font-sans font-medium block mt-1">
                — Surah Ar-Rum 30:21
              </span>
            </div>

            {/* Ceremony Details */}
            <div className="pt-3 border-t border-[#B88A55]/30 w-full text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8E6534] font-sans font-semibold mb-1">
                Request the pleasure of your company at their
              </p>
              <p className="bw-font-serif text-base sm:text-lg text-[#24140F] font-semibold tracking-wide">
                Sacred Nikah &amp; Reception Banquet
              </p>
              <p className="text-[11px] uppercase tracking-wider text-[#4A2E23] font-sans font-bold mt-1.5">
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
              className="mt-3 px-3.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-[#8E6534] hover:text-[#382118] font-sans flex items-center gap-1.5 transition-colors border border-[#B88A55]/30 hover:border-[#8E6534]"
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
          className={`absolute inset-0 rounded-t-[130px] sm:rounded-t-[160px] rounded-b-2xl bw-paper-espresso border-2 border-[#B88A55]/60 overflow-hidden transition-all duration-1000 ${
            isOpen
              ? '-rotate-y-180 pointer-events-none opacity-0 scale-95 origin-left'
              : 'rotate-y-0 opacity-100 z-20 origin-left shadow-2xl'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle Arch Foil Frame with Luxury Inset Bevel */}
          <div
            className="w-full h-full rounded-t-[128px] sm:rounded-t-[158px] rounded-b-xl p-5 sm:p-8 flex flex-col items-center justify-between text-center relative"
            style={{
              boxShadow: 'inset 0 0 0 2px rgba(184, 138, 85, 0.5), inset 0 0 35px rgba(0, 0, 0, 0.8)',
            }}
          >
            {/* Candlelight Ambient Glow Behind Arch */}
            <div
              className="bw-candle-glow absolute -top-8 left-1/2 -translate-x-1/2 w-52 h-40 rounded-full pointer-events-none blur-2xl"
              style={{
                background: 'radial-gradient(circle, rgba(212, 168, 106, 0.32) 0%, rgba(184, 138, 85, 0.09) 60%, transparent 80%)',
              }}
            />

            {/* Top Arched Title & Bismillah */}
            <div className="pt-4 sm:pt-6 flex flex-col items-center">
              <span className="text-sm sm:text-base text-[#D4A86A] font-arabic tracking-widest mb-1.5 opacity-90 drop-shadow">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </span>

              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#D4A86A] font-sans font-medium drop-shadow">
                The Wedding Celebration
              </span>

              {/* Decorative Arch Emblem */}
              <div className="flex items-center gap-3 my-2.5">
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#B88A55]" />
                <span className="text-xs text-[#FFF1DC]">✦</span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#B88A55]" />
              </div>

              {/* Couple Brown Names in Calligraphy */}
              <h2 className="bw-font-script text-4xl sm:text-5xl text-[#FFF1DC] tracking-wide my-1 drop-shadow-lg">
                {partnerOne} &amp; {partnerTwo}
              </h2>

              <p className="text-[11px] text-[#E8D7BD] font-serif tracking-widest uppercase mt-1">
                Sacred Nikah &amp; Reception
              </p>
            </div>

            {/* Center: Silk Ribbon with Authentic Brown Couple Initials Wax Seal */}
            <div className="relative my-3 flex flex-col items-center">
              {/* Horizontal Silk Ribbon across cover */}
              <div
                className="w-48 sm:w-56 h-6 rounded-sm shadow-md flex items-center justify-center relative -mb-6"
                style={{
                  background: 'linear-gradient(90deg, #24140F 0%, #4A2E23 35%, #5C3A2D 50%, #4A2E23 65%, #24140F 100%)',
                  borderTop: '1px solid rgba(184, 138, 85, 0.45)',
                  borderBottom: '1px solid rgba(184, 138, 85, 0.45)',
                }}
              />

              {/* Antique Gold Wax Seal with Brown Couple Initials */}
              <div className="relative z-10">
                <BrownWaxSeal
                  label={`Open wedding invitation of ${partnerOne} & ${partnerTwo}`}
                  onClick={handleOpen}
                  size={74}
                  initials={coupleInitials}
                />
              </div>

              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D7BD] font-sans mt-2.5">
                Imperial Wedding Folio
              </span>
            </div>

            {/* Open Invitation CTA Interaction */}
            <div className="pb-3 w-full flex flex-col items-center">
              <button
                type="button"
                onClick={handleOpen}
                className="group relative px-6 py-3 rounded-full flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold transition-all duration-300 active:scale-95 shadow-xl hover:brightness-110"
                style={{
                  background: 'linear-gradient(135deg, #FFF1DC 0%, #D4A86A 50%, #B88A55 100%)',
                  color: '#24140F',
                  boxShadow: '0 6px 20px rgba(184, 138, 85, 0.4)',
                }}
                aria-label="Open wedding invitation"
              >
                <BookOpen size={14} className="transition-transform group-hover:scale-110" />
                <span>Open Wedding Invitation</span>
                <Sparkles size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
              </button>

              <span className="text-[10px] text-[#B88A55]/90 font-serif tracking-wider uppercase mt-2">
                Tap to unfold wedding suite
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
