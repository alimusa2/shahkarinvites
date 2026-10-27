import React, { useMemo } from 'react';

interface BrownFloatingPetalsProps {
  count?: number;
}

export const BrownFloatingPetals: React.FC<BrownFloatingPetalsProps> = ({ count = 12 }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${(i * (100 / count) + (i % 3) * 7) % 96}%`,
      delay: `${(i * 1.3) % 9}s`,
      duration: `${11 + (i % 6) * 2.2}s`,
      size: 14 + (i % 5) * 3,
      opacity: 0.55 + (i % 4) * 0.1,
      sway: 30 + (i % 4) * 15,
      type: i % 2 === 0 ? 'ivory' : 'champagne',
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="bw-petal absolute"
          style={{
            left: p.left,
            top: '-30px',
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.35}
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 0 C26 12 30 26 15 40 C0 26 4 12 15 0 Z"
              fill={p.type === 'ivory' ? 'url(#bwIvoryPetal)' : 'url(#bwChampagnePetal)'}
            />
            <defs>
              <linearGradient id="bwIvoryPetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#F7F0E5" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#E8D7BD" stopOpacity="0.45" />
              </linearGradient>
              <linearGradient id="bwChampagnePetal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2DE" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#E8D7BD" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B88A55" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
