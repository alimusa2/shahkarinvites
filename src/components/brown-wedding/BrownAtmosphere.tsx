import React from 'react';
import { BrownFloatingPetals } from './BrownFloatingPetals';

interface BrownAtmosphereProps {
  children?: React.ReactNode;
}

export const BrownAtmosphere: React.FC<BrownAtmosphereProps> = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen min-h-[100svh] overflow-hidden bg-[#170C08] flex flex-col items-center justify-center">
      {/* Deep Espresso & Walnut Vignette Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(74, 46, 35, 0.45) 0%, rgba(36, 20, 15, 0.85) 60%, #120906 100%),
            radial-gradient(circle at 20% 80%, rgba(184, 138, 85, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(184, 138, 85, 0.15) 0%, transparent 50%)
          `,
        }}
      />

      {/* Warm Candlelight Lantern Glows (Left & Right) */}
      <div
        className="bw-candle-glow absolute -left-16 sm:left-4 top-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full pointer-events-none blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 106, 0.22) 0%, rgba(184, 138, 85, 0.08) 50%, transparent 70%)',
        }}
      />
      <div
        className="bw-candle-glow absolute -right-16 sm:right-4 top-1/3 w-48 sm:w-72 h-48 sm:h-72 rounded-full pointer-events-none blur-3xl"
        style={{
          animationDelay: '1.7s',
          background: 'radial-gradient(circle, rgba(212, 168, 106, 0.22) 0%, rgba(184, 138, 85, 0.08) 50%, transparent 70%)',
        }}
      />

      {/* Floating Petals */}
      <BrownFloatingPetals count={14} />

      {/* Foreground Content */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
