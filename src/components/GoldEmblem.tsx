import React from 'react';

interface GoldEmblemProps {
  size?: number;
  className?: string;
}

export const GoldEmblem: React.FC<GoldEmblemProps> = ({ size = 36, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 hover:rotate-45 ${className}`}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3E5AB" />
          <stop offset="50%" stopColor="#D6B777" />
          <stop offset="100%" stopColor="#A98A4F" />
        </linearGradient>
      </defs>
      {/* Outer intricate circle */}
      <circle cx="50" cy="50" r="46" stroke="url(#goldGrad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="50" cy="50" r="42" stroke="url(#goldGrad)" strokeWidth="1.2" />
      {/* 8-pointed star / Mughal rosette */}
      <path
        d="M50 15 L58 35 L78 35 L62 48 L68 68 L50 55 L32 68 L38 48 L22 35 L42 35 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
      />
      <circle cx="50" cy="50" r="14" fill="url(#goldGrad)" opacity="0.15" />
      <circle cx="50" cy="50" r="8" fill="url(#goldGrad)" />
      {/* Stylized C monogram */}
      <path
        d="M52 46 C50 44 47 45 47 50 C47 55 50 56 52 54"
        stroke="#0B0D0A"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
