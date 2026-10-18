import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Award, Heart } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onOpenCustomizer?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCustomizer }) => {
  const navigate = useNavigate();

  const handleOpenDemo = () => {
    navigate('/invitation/demo');
  };

  const scrollToTemplates = () => {
    const el = document.getElementById('templates');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Background Cinematic Lighting & Golden Bokeh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-champagne/10 via-emerald-950/20 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gold-muted/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating subtle gold particle specks */}
      <div className="absolute inset-0 bg-[radial-gradient(#D6B777_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-15 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, Actions */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-border/60 bg-gold-border/10 backdrop-blur-sm mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-champagne animate-pulse" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-gold-light font-medium">
                The Art of Digital Invitations
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight text-ivory mb-6 max-w-xl">
              Digital Invitations, <br />
              <span className="italic font-normal gold-text-gradient">
                Made Premium
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-text-secondary max-w-lg mb-8 leading-relaxed font-light">
              Beautifully crafted invitations that turn your special moments into unforgettable experiences. Designed for Pakistani weddings and milestone celebrations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenCustomizer}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-sm uppercase tracking-widest transition-all duration-300 shadow-gold-md hover:shadow-gold-lg flex items-center justify-center gap-2 group"
              >
                <span>Create Your Invitation</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={scrollToTemplates}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-gold-border/80 hover:border-gold-champagne text-gold-champagne hover:text-gold-light text-sm uppercase tracking-widest font-medium transition-all duration-300 bg-black/20 backdrop-blur-sm hover:bg-gold-champagne/10"
              >
                Explore Templates
              </button>
            </div>

            {/* Trust statement */}
            <p className="text-xs sm:text-sm text-text-muted italic flex items-center gap-2">
              <Sparkles size={14} className="text-gold-champagne shrink-0" />
              <span>Designed for weddings, celebrations, and moments that matter.</span>
            </p>

            {/* Mobile quick invitation launcher badge */}
            <div className="mt-6 lg:hidden w-full max-w-sm">
              <button
                onClick={handleOpenDemo}
                className="w-full py-2.5 px-4 rounded-xl border border-gold-border/60 bg-emerald-950/40 backdrop-blur-md flex items-center justify-between text-xs text-gold-light hover:border-gold-champagne transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Tap to open live wedding invitation</span>
                </span>
                <span className="text-gold-champagne font-semibold font-serif italic text-sm">Demo &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Realistic Smartphone Mockups */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            {/* Dual phone composition matching reference image */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-6 w-full max-w-lg lg:max-w-none">
              
              {/* Phone 1: Invitation Cover */}
              <div className="w-[180px] sm:w-[240px] md:w-[260px] h-[370px] sm:h-[490px] md:h-[530px] shrink-0 transform -rotate-1 sm:-rotate-2 transition-transform duration-500 hover:rotate-0">
                <PhoneMockup
                  variant="cover"
                  onClick={handleOpenDemo}
                />
              </div>

              {/* Phone 2: Details & Schedule & RSVP */}
              <div className="w-[180px] sm:w-[240px] md:w-[260px] h-[370px] sm:h-[490px] md:h-[530px] shrink-0 transform rotate-1 sm:rotate-2 translate-y-4 sm:translate-y-6 transition-transform duration-500 hover:rotate-0">
                <PhoneMockup
                  variant="details"
                  onClick={handleOpenDemo}
                />
              </div>
            </div>

            {/* Atmospheric glow behind phones */}
            <div className="absolute inset-0 bg-gold-champagne/10 filter blur-3xl -z-10 pointer-events-none rounded-full" />
          </div>

        </div>

        {/* Reference Image Matching Trust Bar */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-gold-border/20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="flex items-center justify-center gap-2.5 text-text-secondary text-xs sm:text-sm">
            <Award size={16} className="text-gold-champagne shrink-0" />
            <span className="tracking-wide">Premium Quality</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-text-secondary text-xs sm:text-sm">
            <Zap size={16} className="text-gold-champagne shrink-0" />
            <span className="tracking-wide">Fast &amp; Reliable</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-text-secondary text-xs sm:text-sm">
            <ShieldCheck size={16} className="text-gold-champagne shrink-0" />
            <span className="tracking-wide">Secure &amp; Private</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-text-secondary text-xs sm:text-sm">
            <Heart size={16} className="text-gold-champagne shrink-0" />
            <span className="tracking-wide">Made in Pakistan</span>
          </div>
        </div>

      </div>
    </section>
  );
};
