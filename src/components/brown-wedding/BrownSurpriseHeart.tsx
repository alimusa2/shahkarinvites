import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { brownAudio } from './BrownAudioController';

interface BrownSurpriseHeartProps {
  hiddenMessage?: string;
}

export const BrownSurpriseHeart: React.FC<BrownSurpriseHeartProps> = ({
  hiddenMessage = "May this sacred union be blessed with eternal love, harmony, and peace throughout all the years ahead.",
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    // Audio chime effect
    brownAudio.playSealBreakSound();

    // Subtle gold particle burst
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 40,
        spread: 60,
        startVelocity: 16,
        origin: { x: originX, y: originY },
        colors: ['#B88A55', '#D4A86A', '#FFF1DC', '#E8D7BD', '#5C3A2D'],
        ticks: 80,
        gravity: 0.85,
        shapes: ['circle'],
        scalar: 0.8,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleReveal();
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full max-w-sm mx-auto my-8 px-4 text-center select-none"
    >
      <div className="relative p-6 rounded-2xl bg-[#24140F]/90 border border-[#B88A55]/40 shadow-2xl backdrop-blur-sm overflow-hidden">
        {/* Ambient Candlelight Warm Glow behind */}
        <div
          className="bw-candle-glow absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(184, 138, 85, 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Section Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#382118] border border-[#B88A55]/30 mb-4">
          <Sparkles size={11} className="text-[#D4A86A]" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#E8D7BD] font-sans">
            A Wedding Blessing
          </span>
        </div>

        {/* Interactive Element: Antique Gold Wax Seal / Pop-up Heart */}
        {!isRevealed ? (
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleReveal}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              className="group relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#D4A86A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#24140F]"
              style={{
                background: 'radial-gradient(circle at 35% 30%, #E2BE87 0%, #B88A55 45%, #7D5323 85%, #42250E 100%)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), 0 0 20px rgba(184, 138, 85, 0.35)',
                border: '1.5px solid rgba(255, 241, 220, 0.5)',
              }}
              aria-expanded={isRevealed}
              aria-label="Tap to unlock wedding blessing message"
            >
              {/* Outer pulsing ring */}
              <div
                className="absolute -inset-2 rounded-full border border-[#D4A86A]/40 animate-ping pointer-events-none"
                style={{ animationDuration: '3s' }}
              />

              {/* Heart Icon with golden glow */}
              <Heart
                size={28}
                className="text-[#FFF1DC] fill-[#FFF1DC] drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </button>

            <p className="text-xs text-[#E8D7BD]/80 font-serif tracking-wide mt-3 italic">
              Tap the golden seal to reveal a special wedding prayer
            </p>
          </div>
        ) : (
          /* Revealed Wedding Blessing Note */
          <div className="flex flex-col items-center animate-fade-in py-2">
            <div className="w-10 h-10 rounded-full bg-[#382118] border border-[#B88A55]/50 flex items-center justify-center mb-3 shadow-md">
              <Heart size={18} className="text-[#D4A86A] fill-[#D4A86A]" />
            </div>

            <p className="bw-font-serif text-base sm:text-lg text-[#FFF1DC] font-normal leading-relaxed italic max-w-xs drop-shadow">
              "{hiddenMessage}"
            </p>

            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#B88A55] to-transparent my-3" />

            <span className="bw-font-script text-2xl text-[#D4A86A]">
              With Love &amp; Prayers
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
