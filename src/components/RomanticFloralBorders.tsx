import React from 'react';
import { motion } from 'framer-motion';

export const RomanticFloralBorders: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      <style>{`
        @keyframes romanticSwayLeft {
          0%, 100% {
            transform: rotate(0deg) translateY(0px) scale(1);
          }
          50% {
            transform: rotate(1.2deg) translateY(6px) scale(1.015);
          }
        }
        @keyframes romanticSwayRight {
          0%, 100% {
            transform: rotate(0deg) translateY(0px) scale(1);
          }
          50% {
            transform: rotate(-1.2deg) translateY(5px) scale(1.015);
          }
        }
        @keyframes fairyTwinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.25);
          }
        }
      `}</style>

      {/* SVG Definitions for Luxury Roses & Golden Botanicals */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          {/* Ivory Rose Petal Radial Gradient */}
          <radialGradient id="roseIvoryGrad" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="45%" stopColor="#F7EFE3" />
            <stop offset="75%" stopColor="#EADECC" />
            <stop offset="100%" stopColor="#C9B496" />
          </radialGradient>

          {/* Rose Inner Core Gradient */}
          <radialGradient id="roseCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0C9A6" />
            <stop offset="50%" stopColor="#C7A779" />
            <stop offset="100%" stopColor="#9C7A4A" />
          </radialGradient>

          {/* Champagne Gold Leaf Gradient */}
          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E4B8" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#D6B777" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#A88746" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#7A5D28" stopOpacity="0.65" />
          </linearGradient>

          {/* Emerald Vine Gradient */}
          <linearGradient id="emeraldVineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E523A" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#133D29" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0B2619" stopOpacity="0.6" />
          </linearGradient>

          {/* Delicate Baby's Breath Bud */}
          <radialGradient id="gypsoGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#F5EEDB" />
            <stop offset="100%" stopColor="#D4C2A3" />
          </radialGradient>

          {/* Fairy Light Glow Filter */}
          <filter id="fairyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ================= LEFT FLORAL BORDER ================= */}
      <div
        className="fixed top-0 bottom-0 left-0 w-32 sm:w-48 md:w-64 lg:w-80 pointer-events-none z-10"
        style={{
          animation: 'romanticSwayLeft 9s ease-in-out infinite',
          transformOrigin: 'top left',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
        }}
      >
        <svg
          viewBox="0 0 320 1000"
          preserveAspectRatio="none"
          className="w-full h-full opacity-90 filter drop-shadow-[0_0_12px_rgba(214,183,119,0.25)]"
        >
          {/* Ambient Botanical Backdrop Glow */}
          <path
            d="M 0 0 Q 180 300 60 600 T 0 1000 L 0 0 Z"
            fill="rgba(14, 48, 33, 0.45)"
          />

          {/* Main Trailing Gold-Emerald Vine */}
          <path
            d="M 0 40 Q 140 180 80 360 T 110 650 T 30 980"
            stroke="url(#emeraldVineGrad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 0 60 Q 120 220 70 380 T 95 670 T 20 950"
            stroke="url(#goldLeafGrad)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* TOP FLORAL BOUQUET CLUSTER (Near Top Left of Cards) */}
          <g transform="translate(45, 110)">
            {/* Golden Leaves Fan */}
            <path d="M 0 0 C 35 -30, 75 -20, 95 -4" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 40 -15, 85 5, 100 28" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 25 -45, 55 -65, 80 -60" fill="url(#goldLeafGrad)" opacity="0.8" />
            <path d="M 0 0 C -10 -50, 15 -80, 45 -85" fill="url(#goldLeafGrad)" opacity="0.7" />

            {/* Sprigs of Baby's Breath */}
            <circle cx="85" cy="-35" r="4" fill="url(#gypsoGrad)" />
            <circle cx="105" cy="-20" r="3.5" fill="url(#gypsoGrad)" />
            <circle cx="95" cy="5" r="4" fill="url(#gypsoGrad)" />
            <circle cx="115" cy="22" r="3" fill="url(#gypsoGrad)" />
            <circle cx="70" cy="-60" r="3" fill="url(#gypsoGrad)" />

            {/* Large Blooming Ivory English Rose */}
            <g transform="translate(25, 10)">
              {/* Outer Petals */}
              <circle cx="0" cy="0" r="42" fill="url(#roseIvoryGrad)" />
              <path d="M -35 -20 C -45 15, -15 45, 10 40 C 35 35, 45 5, 30 -30 C 15 -45, -20 -40, -35 -20 Z" fill="url(#roseIvoryGrad)" />
              {/* Mid Layer Petals */}
              <path d="M -22 -15 C -30 10, -10 30, 8 28 C 24 24, 30 2, 20 -22 C 8 -32, -15 -28, -22 -15 Z" fill="#F4EADB" />
              <path d="M -16 -10 C -22 8, -6 20, 5 18 C 16 16, 20 2, 14 -14 C 5 -22, -10 -20, -16 -10 Z" fill="#E8D8BF" />
              {/* Rose Heart Center */}
              <circle cx="0" cy="0" r="10" fill="url(#roseCoreGrad)" />
              <path d="M -4 -3 C -6 2, -1 6, 2 5 C 6 4, 6 -1, 3 -4 C 0 -6, -3 -5, -4 -3 Z" fill="#8C6A3C" />
            </g>

            {/* Smaller Complementary Rosebud */}
            <g transform="translate(68, -45) scale(0.65)">
              <circle cx="0" cy="0" r="30" fill="url(#roseIvoryGrad)" />
              <circle cx="0" cy="0" r="8" fill="url(#roseCoreGrad)" />
            </g>
          </g>

          {/* MID-BODY FLORAL CLUSTER (Framing Card Content) */}
          <g transform="translate(65, 430)">
            {/* Elegant Golden Eucalyptus Leaves */}
            <path d="M 0 0 C 45 -25, 90 -10, 110 15" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 50 15, 95 35, 115 65" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 30 -50, 65 -75, 90 -70" fill="url(#goldLeafGrad)" opacity="0.85" />

            {/* Baby's breath sprinkles */}
            <circle cx="100" cy="-5" r="3.5" fill="url(#gypsoGrad)" />
            <circle cx="118" cy="18" r="4" fill="url(#gypsoGrad)" />
            <circle cx="95" cy="45" r="3" fill="url(#gypsoGrad)" />

            {/* Medium Open Ivory Rose */}
            <g transform="translate(35, 15)">
              <circle cx="0" cy="0" r="36" fill="url(#roseIvoryGrad)" />
              <path d="M -26 -16 C -34 10, -12 32, 8 28 C 26 24, 32 4, 22 -22 C 10 -32, -16 -28, -26 -16 Z" fill="#F3E7D5" />
              <circle cx="0" cy="0" r="8.5" fill="url(#roseCoreGrad)" />
            </g>

            {/* Soft Bud */}
            <g transform="translate(75, 55) scale(0.55)">
              <circle cx="0" cy="0" r="28" fill="url(#roseIvoryGrad)" />
              <circle cx="0" cy="0" r="7" fill="url(#roseCoreGrad)" />
            </g>
          </g>

          {/* LOWER FLORAL CLUSTER (Near Venue & Schedule Sections) */}
          <g transform="translate(40, 760)">
            {/* Extended Golden Foliage */}
            <path d="M 0 0 C 35 -30, 80 -25, 105 -5" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 45 20, 85 45, 100 80" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 20 -55, 45 -85, 75 -85" fill="url(#goldLeafGrad)" opacity="0.75" />

            {/* Ivory Garden Rose */}
            <g transform="translate(30, 20)">
              <circle cx="0" cy="0" r="40" fill="url(#roseIvoryGrad)" />
              <path d="M -28 -18 C -36 12, -14 34, 10 30 C 28 26, 34 4, 24 -24 C 12 -34, -18 -30, -28 -18 Z" fill="#F4EADB" />
              <circle cx="0" cy="0" r="9.5" fill="url(#roseCoreGrad)" />
            </g>

            <circle cx="90" cy="-20" r="4" fill="url(#gypsoGrad)" />
            <circle cx="110" cy="0" r="3.5" fill="url(#gypsoGrad)" />
            <circle cx="85" cy="55" r="4" fill="url(#gypsoGrad)" />
          </g>

          {/* Romantic Glowing Fairy Light Orbs (Fireflies) */}
          <circle cx="120" cy="80" r="5" fill="#FFE899" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 4.5s ease-in-out infinite' }} />
          <circle cx="155" cy="180" r="4" fill="#FFDF73" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 5.5s ease-in-out infinite 1.5s' }} />
          <circle cx="130" cy="390" r="5" fill="#FFE899" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 4.8s ease-in-out infinite 0.7s' }} />
          <circle cx="165" cy="520" r="4.5" fill="#FFF2B8" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 6.2s ease-in-out infinite 2.2s' }} />
          <circle cx="125" cy="710" r="5" fill="#FFE899" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 5s ease-in-out infinite 1.1s' }} />
          <circle cx="145" cy="880" r="4" fill="#FFDF73" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 4.2s ease-in-out infinite 2.8s' }} />
        </svg>
      </div>

      {/* ================= RIGHT FLORAL BORDER (Mirrored with Asymmetric Offsets) ================= */}
      <div
        className="fixed top-0 bottom-0 right-0 w-32 sm:w-48 md:w-64 lg:w-80 pointer-events-none z-10"
        style={{
          animation: 'romanticSwayRight 10.5s ease-in-out infinite',
          transformOrigin: 'top right',
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
        }}
      >
        <svg
          viewBox="0 0 320 1000"
          preserveAspectRatio="none"
          className="w-full h-full opacity-90 scale-x-[-1] filter drop-shadow-[0_0_12px_rgba(214,183,119,0.25)]"
        >
          {/* Ambient Backdrop */}
          <path
            d="M 0 0 Q 180 300 60 600 T 0 1000 L 0 0 Z"
            fill="rgba(14, 48, 33, 0.45)"
          />

          {/* Main Vine */}
          <path
            d="M 0 70 Q 150 200 90 390 T 115 680 T 25 990"
            stroke="url(#emeraldVineGrad)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 0 90 Q 130 240 75 410 T 100 700 T 15 960"
            stroke="url(#goldLeafGrad)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* TOP RIGHT FLORAL CLUSTER (Offset vertically for organic natural balance) */}
          <g transform="translate(50, 160)">
            <path d="M 0 0 C 40 -25, 80 -15, 100 8" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 45 15, 90 30, 105 55" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 30 -40, 60 -60, 85 -55" fill="url(#goldLeafGrad)" opacity="0.8" />

            <circle cx="95" cy="-20" r="4" fill="url(#gypsoGrad)" />
            <circle cx="110" cy="10" r="3.5" fill="url(#gypsoGrad)" />
            <circle cx="80" cy="-45" r="3" fill="url(#gypsoGrad)" />

            <g transform="translate(30, 15)">
              <circle cx="0" cy="0" r="44" fill="url(#roseIvoryGrad)" />
              <path d="M -35 -20 C -45 15, -15 45, 10 40 C 35 35, 45 5, 30 -30 C 15 -45, -20 -40, -35 -20 Z" fill="url(#roseIvoryGrad)" />
              <path d="M -22 -15 C -30 10, -10 30, 8 28 C 24 24, 30 2, 20 -22 C 8 -32, -15 -28, -22 -15 Z" fill="#F4EADB" />
              <circle cx="0" cy="0" r="10" fill="url(#roseCoreGrad)" />
            </g>

            <g transform="translate(75, -35) scale(0.6)">
              <circle cx="0" cy="0" r="30" fill="url(#roseIvoryGrad)" />
              <circle cx="0" cy="0" r="8" fill="url(#roseCoreGrad)" />
            </g>
          </g>

          {/* MID RIGHT CLUSTER */}
          <g transform="translate(60, 490)">
            <path d="M 0 0 C 45 -25, 90 -10, 110 15" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 50 15, 95 35, 115 65" fill="url(#goldLeafGrad)" />

            <circle cx="100" cy="-5" r="3.5" fill="url(#gypsoGrad)" />
            <circle cx="115" cy="20" r="4" fill="url(#gypsoGrad)" />

            <g transform="translate(32, 12)">
              <circle cx="0" cy="0" r="38" fill="url(#roseIvoryGrad)" />
              <path d="M -26 -16 C -34 10, -12 32, 8 28 C 26 24, 32 4, 22 -22 C 10 -32, -16 -28, -26 -16 Z" fill="#F3E7D5" />
              <circle cx="0" cy="0" r="9" fill="url(#roseCoreGrad)" />
            </g>
          </g>

          {/* LOWER RIGHT CLUSTER */}
          <g transform="translate(45, 820)">
            <path d="M 0 0 C 35 -30, 80 -25, 105 -5" fill="url(#goldLeafGrad)" />
            <path d="M 0 0 C 45 20, 85 45, 100 80" fill="url(#goldLeafGrad)" />

            <g transform="translate(28, 18)">
              <circle cx="0" cy="0" r="42" fill="url(#roseIvoryGrad)" />
              <path d="M -28 -18 C -36 12, -14 34, 10 30 C 28 26, 34 4, 24 -24 C 12 -34, -18 -30, -28 -18 Z" fill="#F4EADB" />
              <circle cx="0" cy="0" r="10" fill="url(#roseCoreGrad)" />
            </g>

            <circle cx="95" cy="-15" r="4" fill="url(#gypsoGrad)" />
            <circle cx="112" cy="5" r="3.5" fill="url(#gypsoGrad)" />
          </g>

          {/* Fairy Lights (Twinkling Fireflies) */}
          <circle cx="125" cy="110" r="4.5" fill="#FFE899" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 5s ease-in-out infinite 0.5s' }} />
          <circle cx="160" cy="240" r="4" fill="#FFDF73" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 4.8s ease-in-out infinite 2s' }} />
          <circle cx="135" cy="450" r="5" fill="#FFE899" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 6s ease-in-out infinite 1s' }} />
          <circle cx="170" cy="580" r="4.5" fill="#FFF2B8" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 5.2s ease-in-out infinite 2.5s' }} />
          <circle cx="130" cy="770" r="5" fill="#FFE899" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 4.6s ease-in-out infinite 1.8s' }} />
          <circle cx="150" cy="920" r="4" fill="#FFDF73" filter="url(#fairyGlow)" style={{ animation: 'fairyTwinkle 5.8s ease-in-out infinite 0.2s' }} />
        </svg>
      </div>
    </div>
  );
};
