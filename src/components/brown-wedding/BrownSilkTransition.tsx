import React, { useEffect, useState } from 'react';

interface BrownSilkTransitionProps {
  onTransitionEnd: () => void;
  durationMs?: number;
}

export const BrownSilkTransition: React.FC<BrownSilkTransitionProps> = ({
  onTransitionEnd,
  durationMs = 1800,
}) => {
  const [phase, setPhase] = useState<'sweeping' | 'clearing'>('sweeping');

  useEffect(() => {
    const clearTimer = setTimeout(() => {
      setPhase('clearing');
    }, durationMs * 0.55);

    const endTimer = setTimeout(() => {
      onTransitionEnd();
    }, durationMs);

    return () => {
      clearTimeout(clearTimer);
      clearTimeout(endTimer);
    };
  }, [durationMs, onTransitionEnd]);

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Wave 1: Flowing Dark Chocolate & Walnut Silk Ribbon */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          phase === 'sweeping' ? 'opacity-95' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(74, 46, 35, 0.95) 0%, rgba(36, 20, 15, 0.98) 70%, #170C08 100%)`,
        }}
      />

      {/* Wave 2: Sweeping Silk-like Gradient diagonal shape */}
      <div
        className="bw-silk-sweep absolute inset-y-0 -left-1/4 w-[150%] pointer-events-none"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 0%,
            rgba(36, 20, 15, 0.85) 25%,
            rgba(74, 46, 35, 0.95) 45%,
            rgba(184, 138, 85, 0.45) 50%,
            rgba(74, 46, 35, 0.95) 55%,
            rgba(36, 20, 15, 0.85) 75%,
            transparent 100%
          )`,
          filter: 'blur(10px)',
        }}
      />

      {/* Wave 3: Warm Antique Gold Sheen & Light Sweep */}
      <div
        className="bw-light-sweep absolute -top-1/2 -bottom-1/2 -left-full w-[200%] pointer-events-none"
        style={{
          background: `linear-gradient(
            75deg,
            transparent 35%,
            rgba(255, 241, 220, 0.15) 46%,
            rgba(212, 168, 106, 0.45) 50%,
            rgba(184, 138, 85, 0.25) 54%,
            transparent 65%
          )`,
          mixBlendMode: 'screen',
        }}
      />
    </div>
  );
};
