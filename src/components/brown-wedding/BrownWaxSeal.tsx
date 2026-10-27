import React from 'react';

interface BrownWaxSealProps {
  label?: string;
  onClick?: () => void;
  size?: number;
  initials?: string;
  className?: string;
}

export const BrownWaxSeal: React.FC<BrownWaxSealProps> = ({
  label = 'Open Invitation',
  onClick,
  size = 64,
  initials = 'Y&M',
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`bw-wax-seal relative rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 focus:outline-none ${className}`}
      style={{
        width: size,
        height: size,
        background: 'radial-gradient(circle at 35% 30%, #E2BE87 0%, #B88A55 45%, #7D5323 85%, #543414 100%)',
        border: '1.5px solid rgba(255, 235, 195, 0.4)',
      }}
      aria-label={label}
      title={label}
    >
      {/* Outer organic wax rim edge */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 8px rgba(36, 20, 15, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
      />

      {/* Inner embossed ring */}
      <div
        className="rounded-full flex items-center justify-center pointer-events-none"
        style={{
          width: size * 0.76,
          height: size * 0.76,
          border: '1px dashed rgba(255, 240, 215, 0.5)',
          background: 'radial-gradient(circle at 40% 35%, #CFA56B 0%, #9F733C 75%, #694119 100%)',
          boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.6)',
        }}
      >
        <span
          className="bw-font-script font-bold tracking-wider select-none text-center"
          style={{
            fontSize: size * 0.32,
            color: '#FFF2DE',
            textShadow: '0 -1px 1px rgba(60, 35, 12, 0.9), 0 1px 1px rgba(255, 255, 255, 0.5)',
          }}
        >
          {initials}
        </span>
      </div>

      {/* Subtle ribbon tail beneath */}
      <div
        className="absolute -bottom-2 -left-1 w-3 h-5 rotate-12 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #4A2E23, #24140F)',
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 85%)',
        }}
      />
      <div
        className="absolute -bottom-2 -right-1 w-3 h-5 -rotate-12 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #4A2E23, #24140F)',
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 20% 100%)',
        }}
      />
    </button>
  );
};
