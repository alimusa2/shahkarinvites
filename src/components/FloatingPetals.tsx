import React from 'react';

export const FloatingPetals: React.FC = () => {
  // Pre-calculated random offsets for 10 gentle floating petals
  const petals = [
    { left: '10%', delay: '0s', duration: '12s', size: 14 },
    { left: '25%', delay: '2s', duration: '14s', size: 18 },
    { left: '40%', delay: '5s', duration: '11s', size: 12 },
    { left: '60%', delay: '1s', duration: '15s', size: 16 },
    { left: '75%', delay: '3.5s', duration: '13s', size: 14 },
    { left: '90%', delay: '6s', duration: '16s', size: 20 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: p.left,
            top: '-20px',
            animation: `petalFall ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.7 }}
          >
            {/* Soft ivory rose petal */}
            <path
              d="M15 0 C25 10 30 25 15 40 C0 25 5 10 15 0 Z"
              fill="url(#petalGrad)"
            />
            <defs>
              <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#F5F0E6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D6B777" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
