import React from 'react';
import { Volume2, ChevronDown, MapPin, Calendar, Clock, Heart, Utensils, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PhoneMockupProps {
  variant: 'cover' | 'details';
  className?: string;
  onClick?: () => void;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ variant, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-[40px] sm:rounded-[48px] p-2 sm:p-2.5 bg-gradient-to-b from-[#3a3424] via-[#1a1c17] to-[#12140f] shadow-phone-mockup border border-gold-champagne/40 transition-transform duration-500 hover:scale-[1.02] cursor-pointer group ${className}`}
      style={{
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 25px rgba(214, 183, 119, 0.18)',
      }}
    >
      {/* Outer titanium edge sheen */}
      <div className="absolute inset-0 rounded-[40px] sm:rounded-[48px] border border-gold-light/20 pointer-events-none" />

      {/* Side buttons simulation */}
      <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-gold-muted/60 rounded-l-sm" />
      <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-gold-muted/60 rounded-l-sm" />
      <div className="absolute -right-[3px] top-28 w-[3px] h-14 bg-gold-muted/60 rounded-r-sm" />

      {/* Screen Frame */}
      <div className="relative w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-[#07160F] border border-black/80 flex flex-col">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 sm:h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
          <div className="w-2 h-2 rounded-full bg-[#151515] border border-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-900/60" />
        </div>

        {/* Floating Top Audio Indicator */}
        <div className="absolute top-3 left-4 z-20 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-gold-border/60 flex items-center justify-center text-gold-champagne">
          <Volume2 size={11} />
        </div>

        {/* Screen Content - Variant 1: Cover */}
        {variant === 'cover' && (
          <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-5 pt-8 sm:pt-9 text-center bg-cover bg-center select-none"
            style={{ backgroundImage: `url('/assets/emerald-card.jpg')` }}
          >
            {/* Subtle dark tint for text contrast */}
            <div className="absolute inset-0 bg-background-emerald/40 backdrop-blur-[1px]" />

            {/* Content Over Background */}
            <div className="relative z-10 w-full flex flex-col items-center pt-2">
              {/* Gold Calligraphy Monogram */}
              <div className="text-gold-light text-sm sm:text-base font-arabic tracking-wider mb-2 opacity-90 drop-shadow">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>

              <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold-light/90 font-sans mb-3 sm:mb-4">
                Together with their families
              </p>

              {/* Couple Names */}
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide leading-tight drop-shadow-md">
                Ayesha
              </h3>
              <span className="font-serif italic text-base sm:text-lg text-gold-champagne my-0.5">&amp;</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide leading-tight drop-shadow-md">
                Hamza
              </h3>

              <div className="w-12 h-[1px] bg-gold-border my-2 sm:my-3" />

              <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-text-secondary">
                Invite you to celebrate their wedding
              </p>
            </div>

            {/* Date and Venue Badge */}
            <div className="relative z-10 w-full max-w-[200px] mb-2 sm:mb-4">
              <div className="border-t border-b border-gold-border/60 py-1.5 my-1 flex items-center justify-center gap-3 text-gold-light">
                <span className="text-[8px] sm:text-[9px] tracking-widest font-sans uppercase">Sunday</span>
                <span className="w-1 h-1 rounded-full bg-gold-champagne" />
                <span className="font-serif text-xs sm:text-sm tracking-wider font-semibold">DEC 20, 2026</span>
                <span className="w-1 h-1 rounded-full bg-gold-champagne" />
                <span className="text-[8px] sm:text-[9px] tracking-widest font-sans uppercase">6:00 PM</span>
              </div>

              <p className="font-serif text-[11px] sm:text-xs text-ivory tracking-wider mt-1.5">
                The Grand Palace
              </p>
              <p className="text-[8px] sm:text-[9px] text-text-secondary tracking-widest uppercase">
                Lahore, Pakistan
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="relative z-10 flex flex-col items-center animate-bounce">
              <span className="w-5 h-5 rounded-full border border-gold-border flex items-center justify-center text-gold-champagne bg-black/30">
                <ChevronDown size={11} />
              </span>
            </div>
          </div>
        )}

        {/* Screen Content - Variant 2: Details & Story */}
        {variant === 'details' && (
          <div className="relative w-full h-full flex flex-col p-4 sm:p-5 pt-8 sm:pt-9 text-center bg-[#07160F] text-ivory overflow-hidden select-none">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D6B777_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Section: Our Story */}
            <div className="relative z-10 flex flex-col items-center mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-4 h-[1px] bg-gold-border" />
                <span className="font-serif text-xs sm:text-sm text-gold-champagne tracking-widest uppercase">Our Story</span>
                <span className="w-4 h-[1px] bg-gold-border" />
              </div>
              <p className="text-[8px] sm:text-[9px] text-text-secondary italic max-w-[190px] mb-2 leading-tight">
                Two hearts, one journey. A lifetime of memories in the making.
              </p>

              {/* Couple Photo in Frame */}
              <div className="relative p-1 bg-gradient-to-br from-gold-light via-gold-champagne to-gold-muted rounded-md shadow-md rotate-[-1deg] w-28 sm:w-32 aspect-[4/3] overflow-hidden mb-2">
                <img
                  src="/assets/couple.jpg"
                  alt="Ayesha & Hamza"
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Section: Events Schedule */}
            <div className="relative z-10 flex flex-col items-center mb-2">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-4 h-[1px] bg-gold-border" />
                <span className="font-serif text-[11px] sm:text-xs text-gold-champagne tracking-wider uppercase">Event Details</span>
                <span className="w-4 h-[1px] bg-gold-border" />
              </div>

              <div className="grid grid-cols-3 gap-1.5 w-full text-center">
                <div className="bg-background-emerald/70 border border-gold-border/30 rounded p-1">
                  <div className="w-4 h-4 mx-auto mb-0.5 text-gold-champagne flex items-center justify-center">
                    <Calendar size={11} />
                  </div>
                  <span className="text-[8px] font-serif block text-ivory">Nikah</span>
                  <span className="text-[7px] text-text-secondary">6:00 PM</span>
                </div>
                <div className="bg-background-emerald/70 border border-gold-border/30 rounded p-1">
                  <div className="w-4 h-4 mx-auto mb-0.5 text-gold-champagne flex items-center justify-center">
                    <Utensils size={11} />
                  </div>
                  <span className="text-[8px] font-serif block text-ivory">Dinner</span>
                  <span className="text-[7px] text-text-secondary">7:30 PM</span>
                </div>
                <div className="bg-background-emerald/70 border border-gold-border/30 rounded p-1">
                  <div className="w-4 h-4 mx-auto mb-0.5 text-gold-champagne flex items-center justify-center">
                    <Car size={11} />
                  </div>
                  <span className="text-[8px] font-serif block text-ivory">Rukhsati</span>
                  <span className="text-[7px] text-text-secondary">11:00 PM</span>
                </div>
              </div>
            </div>

            {/* Section: Dress Code & RSVP CTA */}
            <div className="relative z-10 mt-auto flex flex-col items-center pt-1 border-t border-gold-border/30">
              <div className="text-[8px] uppercase tracking-wider text-text-secondary">
                Dress Code: <span className="text-gold-champagne font-medium">Traditional Formal</span>
              </div>

              <div className="w-full mt-2">
                <span className="block text-[8px] text-text-secondary mb-1">
                  Kindly confirm presence by 10th Dec
                </span>
                <div className="w-full py-1.5 px-3 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted text-background-main font-semibold text-[9px] tracking-wider uppercase shadow-gold-sm">
                  Confirm Your Presence
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Home Indicator Bar */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/40 rounded-full z-20 pointer-events-none" />

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-gold-champagne/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-30">
          <span className="bg-black/80 backdrop-blur-md border border-gold-champagne text-gold-light text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-sans shadow-lg">
            Tap to Open Demo
          </span>
        </div>
      </div>
    </div>
  );
};
