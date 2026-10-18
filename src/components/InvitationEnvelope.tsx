import React, { useState, useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEMPLATES } from '../data/templates';

interface InvitationEnvelopeProps {
  onOpenComplete: () => void;
  brideName?: string;
  groomName?: string;
  themeId?: string;
}

export const InvitationEnvelope: React.FC<InvitationEnvelopeProps> = ({
  onOpenComplete,
  brideName = 'Ayesha',
  groomName = 'Hamza',
  themeId = 'emerald-elegance',
}) => {
  // Stage sequence: 'idle' -> 'glowing' -> 'flap-opening' -> 'card-rising' -> 'card-expanding' -> 'completed'
  const [stage, setStage] = useState<'idle' | 'glowing' | 'flap-opening' | 'card-rising' | 'card-expanding' | 'completed'>('idle');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const envelopeRef = useRef<HTMLDivElement>(null);

  const selectedTemplate = TEMPLATES.find((t) => t.id === themeId) || TEMPLATES[0];

  // Gentle interactive 3D parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stage !== 'idle') return;
    const rect = envelopeRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x: Math.max(-8, Math.min(8, y)), y: Math.max(-8, Math.min(8, x)) });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleOpen = () => {
    if (stage !== 'idle') return;

    // Step 1: The wax seal subtly glows (0ms)
    setStage('glowing');

    // Trigger subtle golden micro-sparkles
    if (envelopeRef.current) {
      const rect = envelopeRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 30,
        spread: 45,
        startVelocity: 12,
        origin: { x: originX, y: originY },
        colors: ['#D6B777', '#F3E5AB', '#A98A4F', '#ffffff'],
        ticks: 60,
        gravity: 0.9,
        shapes: ['circle'],
        scalar: 0.7,
      });
    }

    // Step 2 & 3: Flap opens in 3D & warm golden light appears inside (350ms)
    setTimeout(() => {
      setStage('flap-opening');
    }, 350);

    // Step 4: Invitation card rises smoothly from envelope (850ms)
    setTimeout(() => {
      setStage('card-rising');
    }, 850);

    // Step 5: Card moves toward the viewer with subtle scale & opacity transition (1650ms)
    setTimeout(() => {
      setStage('card-expanding');
    }, 1650);

    // Step 6: Refined transition reveals the existing complete wedding invitation (2150ms)
    setTimeout(() => {
      setStage('completed');
      setTimeout(onOpenComplete, 350);
    }, 2150);
  };

  const isFlapOpen = stage === 'flap-opening' || stage === 'card-rising' || stage === 'card-expanding' || stage === 'completed';
  const isCardRising = stage === 'card-rising' || stage === 'card-expanding' || stage === 'completed';
  const isCardExpanding = stage === 'card-expanding' || stage === 'completed';

  return (
    <div
      className={`relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#050E09] via-[#091D13] to-[#040906] overflow-hidden select-none transition-all duration-700 ${
        stage === 'completed' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Cinematic Golden Ambient Lighting & Floating Bokeh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] h-[340px] sm:h-[680px] bg-gold-champagne/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#D6B777_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      {/* Delicate Decorative Botanical Garland in Corners */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-emerald-950/40 to-transparent pointer-events-none flex justify-between px-4 sm:px-10 opacity-70">
        <span className="text-gold-champagne/40 text-xl font-serif">❦</span>
        <span className="text-gold-champagne/40 text-xl font-serif">❦</span>
      </div>

      {/* Header Eyebrow & Title */}
      <div className="text-center mb-6 sm:mb-8 relative z-20 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-border/60 bg-black/50 backdrop-blur-md mb-3 shadow-gold-sm">
          <Sparkles size={12} className="text-gold-champagne animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold-light font-medium">
            Cardiva Haute Invitations
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory tracking-tight drop-shadow-md">
          A Special Invitation Awaits
        </h2>
        <p className="text-text-secondary text-xs sm:text-sm font-light mt-1.5">
          For the wedding celebration of{' '}
          <span className="text-gold-champagne font-medium font-serif italic text-sm sm:text-base">
            {brideName} &amp; {groomName}
          </span>
        </p>
      </div>

      {/* Realistic 3D Emerald Envelope Container */}
      <div
        ref={envelopeRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpen}
        className="relative w-[min(92vw,440px)] h-[min(62vw,285px)] max-h-[285px] cursor-pointer group perspective-1000 my-3 touch-manipulation transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleOpen();
        }}
        aria-label="Open wedding invitation envelope"
      >
        {/* Soft Golden Ambient Glow behind Envelope */}
        <div className="absolute -inset-4 bg-gradient-to-r from-gold-champagne/10 via-emerald-500/10 to-gold-champagne/10 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* 1. Envelope Back Base & Ornate Gold Silk Interior Lining */}
        <div className="absolute inset-0 rounded-2xl bg-[#06140D] border border-gold-champagne/50 shadow-2xl overflow-hidden z-0">
          {/* Step 3: Warm golden light inside the envelope */}
          <div
            className={`absolute inset-0 bg-gradient-to-b from-[#2E200C] via-[#1B291D] to-[#0A1810] p-4 flex flex-col items-center justify-start transition-opacity duration-700 ${
              isFlapOpen ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {/* Golden Damask Pattern */}
            <div className="w-full h-full border border-gold-border/30 rounded-xl bg-[radial-gradient(#D6B777_1.2px,transparent_1.2px)] [background-size:14px_14px] opacity-40" />

            {/* Step 3: Warm radiant inner glow */}
            <div
              className={`absolute top-0 inset-x-8 h-24 bg-gold-champagne/30 rounded-full blur-xl transition-opacity duration-700 ${
                isFlapOpen ? 'opacity-100 scale-110' : 'opacity-0 scale-75'
              }`}
            />
          </div>
        </div>

        {/* 2. Step 4 & 5: The Wedding Card Rising & Moving Toward Viewer */}
        <div
          className={`absolute left-3.5 right-3.5 sm:left-5 sm:right-5 top-3 h-[min(56vw,255px)] rounded-xl border border-gold-champagne shadow-2xl p-4 flex flex-col items-center justify-between text-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 overflow-hidden ${
            isCardExpanding
              ? '-translate-y-48 sm:-translate-y-60 scale-[1.14] opacity-100 shadow-gold-lg'
              : isCardRising
              ? '-translate-y-40 sm:-translate-y-50 scale-[1.04] opacity-100 shadow-gold-md'
              : 'translate-y-0 opacity-90 scale-95'
          }`}
          style={{
            backgroundImage: `url('${selectedTemplate.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Card inner dark gradient for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/85 rounded-xl" />

          {/* Card Details */}
          <div className="relative z-10 w-full pt-1">
            <div className="text-gold-light text-xs sm:text-sm font-arabic tracking-wider mb-1 opacity-90 drop-shadow">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-gold-light/90 block font-sans">
              Together with their families
            </span>
          </div>

          <div className="relative z-10 my-auto py-1">
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide leading-tight drop-shadow-md">
              {brideName}
            </h3>
            <span className="font-serif italic text-base sm:text-lg text-gold-champagne my-0.5 block">
              &amp;
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide leading-tight drop-shadow-md">
              {groomName}
            </h3>
          </div>

          <div className="relative z-10 w-full pb-1 border-t border-gold-border/60 pt-1.5 flex items-center justify-center gap-2 text-gold-champagne text-[9px] uppercase tracking-widest font-sans">
            <Sparkles size={10} />
            <span>{isCardRising ? 'Unfolding Wedding Suite...' : 'Save The Date'}</span>
            <Sparkles size={10} />
          </div>
        </div>

        {/* 3. Envelope Pocket Layers (Front side & bottom folds) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Left Wing Fold */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#071E13] via-[#092618] to-[#0A2D1D] shadow-lg"
            style={{
              clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
              borderLeft: '1.5px solid rgba(214, 183, 119, 0.4)',
            }}
          />

          {/* Right Wing Fold */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#071E13] via-[#092618] to-[#0A2D1D] shadow-lg"
            style={{
              clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)',
              borderRight: '1.5px solid rgba(214, 183, 119, 0.4)',
            }}
          />

          {/* Bottom Pocket Fold with subtle drop shadow */}
          <div
            className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[#05180F] via-[#092518] to-[#0B2C1C]"
            style={{
              clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
              borderBottom: '2px solid rgba(214, 183, 119, 0.5)',
              filter: 'drop-shadow(0 -4px 6px rgba(0,0,0,0.5))',
            }}
          />

          {/* Gold Filigree Badge on Front Pocket */}
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-2.5 text-gold-champagne/70 text-[9px] font-serif tracking-[0.2em]">
            <span>⚜</span>
            <span className="uppercase font-sans font-medium text-[8px] sm:text-[9px]">Cardiva Haute Atelier</span>
            <span>⚜</span>
          </div>
        </div>

        {/* 4. Step 2: Envelope Top Flap (Opens using convincing CSS 3D rotation) */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 z-30 origin-top transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform-style-preserve-3d ${
            isFlapOpen ? '-rotate-x-180' : 'rotate-x-0'
          }`}
          style={{ transformOrigin: 'top center' }}
        >
          {/* Outside Flap Face */}
          <div
            className="w-full h-full bg-gradient-to-b from-[#0A2D1D] via-[#082417] to-[#061C12] rounded-t-2xl shadow-xl flex items-center justify-center relative backface-hidden"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              borderTop: '1.5px solid rgba(214, 183, 119, 0.5)',
            }}
          >
            {/* Flap gold piping line along the V-edge */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, transparent 48%, rgba(214, 183, 119, 0.6) 50%, transparent 52%)',
              }}
            />
          </div>

          {/* Inside Flap Face (revealed after flipping 180 degrees) */}
          <div
            className="w-full h-full bg-gradient-to-t from-[#203122] to-[#2B3F2D] rounded-t-2xl shadow-inner flex items-center justify-center absolute inset-0 [transform:rotateX(180deg)] backface-hidden"
            style={{
              clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)',
              borderBottom: '1px solid rgba(214, 183, 119, 0.4)',
            }}
          >
            <div className="w-full h-full bg-[radial-gradient(#D6B777_1px,transparent_1px)] [background-size:12px_12px] opacity-35" />
          </div>
        </div>

        {/* 5. Horizontal Gold Silk Ribbon Sash */}
        <div
          className={`absolute top-[48%] -translate-y-1/2 inset-x-0 h-6 sm:h-7 bg-gradient-to-r from-[#8C6D34]/30 via-[#D6B777]/60 to-[#8C6D34]/30 border-y border-gold-champagne/70 z-35 transition-all duration-500 pointer-events-none flex items-center justify-between px-6 ${
            stage !== 'idle' ? 'opacity-0 scale-x-125' : 'opacity-100 scale-x-100'
          }`}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold-light" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-light" />
        </div>

        {/* 6. Step 1: Wax Seal Subtly Glows and Unlocks */}
        <div
          className={`absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out ${
            stage !== 'idle' && stage !== 'glowing'
              ? 'opacity-0 scale-150 rotate-12 pointer-events-none'
              : 'opacity-100 scale-100 group-hover:scale-110'
          }`}
        >
          {/* Subtle Golden Glow aura (Step 1) */}
          <div
            className={`absolute -inset-3 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted blur-md transition-opacity duration-300 pointer-events-none ${
              stage === 'glowing' ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-75'
            }`}
          />

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#7D0C13] via-[#9E141E] to-[#54070B] border-2 border-gold-champagne shadow-2xl flex items-center justify-center relative shadow-black/90">
            {/* Concentric engraved wax rim */}
            <div className="absolute inset-1 rounded-full border border-gold-champagne/40" />

            {/* Inner embossed stamp */}
            <div className="w-9 h-9 rounded-full bg-[#821017] flex items-center justify-center shadow-inner border border-red-950/40">
              <span className="font-serif text-lg sm:text-xl font-bold text-gold-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                C
              </span>
            </div>

            {/* Specular wax gloss reflection */}
            <div className="absolute top-1.5 left-2.5 w-3.5 h-2 bg-white/35 rounded-full blur-[0.6px]" />
          </div>
        </div>

      </div>

      {/* "Tap to Open" Action Button */}
      <div className="mt-8 relative z-20 flex flex-col items-center">
        <button
          onClick={handleOpen}
          disabled={stage !== 'idle'}
          className="px-9 py-3.5 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-xs uppercase tracking-widest shadow-gold-md hover:shadow-gold-lg transition-all duration-300 flex items-center gap-2 group/btn active:scale-95"
        >
          <Sparkles size={14} className="transition-transform group-hover/btn:rotate-45" />
          <span>{stage !== 'idle' ? 'Opening Invitation...' : 'Tap to Open'}</span>
        </button>

        <span className="text-[11px] text-text-muted mt-3 italic">
          Touch or click the envelope to reveal the wedding stationery
        </span>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-4 text-center text-[10px] text-gold-champagne/60 tracking-widest uppercase font-sans">
        Pakistani Digital Wedding Stationery
      </div>
    </div>
  );
};
