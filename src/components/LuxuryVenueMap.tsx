import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Compass,
  Copy,
  Check,
  ExternalLink,
  Car,
  Layers,
  Plus,
  Minus,
  Sparkles,
  Share2,
} from 'lucide-react';

interface LuxuryVenueMapProps {
  venue: string;
  city: string;
  country: string;
  mapQuery: string;
  themeAccent?: string;
}

export const LuxuryVenueMap: React.FC<LuxuryVenueMapProps> = ({
  venue,
  city,
  country,
  mapQuery,
  themeAccent = '#D6B777',
}) => {
  const [mapMode, setMapMode] = useState<'bespoke' | 'satellite'>('bespoke');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [activeLandmark, setActiveLandmark] = useState<string | null>(null);

  const coordinates = '31.5204° N, 74.3587° E';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(mapQuery || `${venue}, ${city}, ${country}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText('31.5204, 74.3587');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2500);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 1.75));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  return (
    <div className="w-full text-left">
      {/* Interactive Map Canvas Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-gold-border/60 shadow-2xl bg-[#06150e] group select-none">
        {/* Subtle Ambient Vignette & Texture */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#06150e]/30 to-[#040e0a]/90 pointer-events-none z-10" />

        {/* Top Control Bar Over Map */}
        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between gap-2 pointer-events-none">
          {/* Mode Switcher Pill */}
          <div className="flex items-center p-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-border/50 shadow-lg pointer-events-auto">
            <button
              type="button"
              onClick={() => setMapMode('bespoke')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                mapMode === 'bespoke'
                  ? 'bg-gradient-to-r from-gold-champagne to-gold-light text-background-main font-semibold shadow-sm'
                  : 'text-gold-light/70 hover:text-gold-light'
              }`}
            >
              <Sparkles size={11} />
              <span>Haute Map</span>
            </button>
            <button
              type="button"
              onClick={() => setMapMode('satellite')}
              className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                mapMode === 'satellite'
                  ? 'bg-gradient-to-r from-gold-champagne to-gold-light text-background-main font-semibold shadow-sm'
                  : 'text-gold-light/70 hover:text-gold-light'
              }`}
            >
              <Layers size={11} />
              <span>Satellite Live</span>
            </button>
          </div>

          {/* Luxury Compass Rose */}
          <div className="w-9 h-9 rounded-full bg-black/80 backdrop-blur-md border border-gold-border/50 flex items-center justify-center text-gold-champagne shadow-lg pointer-events-auto group/compass relative">
            <Compass size={18} className="text-gold-champagne animate-spin-slow" />
            <span className="absolute -top-1 font-serif text-[9px] font-bold text-gold-light">N</span>
          </div>
        </div>

        {/* ================= VIEW 1: BESPOKE HAUTE CARTOGRAPHY ================= */}
        {mapMode === 'bespoke' && (
          <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#06150e] flex items-center justify-center cursor-grab active:cursor-grabbing">
            {/* Scalable Vector Map Layer */}
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative w-full h-full min-w-[500px] flex items-center justify-center"
            >
              <svg
                viewBox="0 0 600 400"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Subtle Grid Pattern */}
                  <pattern id="goldGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="rgba(214, 183, 119, 0.08)"
                      strokeWidth="0.8"
                    />
                    <circle cx="0" cy="0" r="1" fill="rgba(214, 183, 119, 0.25)" />
                  </pattern>

                  {/* Gold Road Glow */}
                  <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Linear Gradient for Main Arterial Boulevard */}
                  <linearGradient id="goldRoadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D6B777" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#F5E4B8" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#B39352" stopOpacity="0.85" />
                  </linearGradient>

                  {/* Radial Beacon Gradient */}
                  <radialGradient id="beaconGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D6B777" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#D6B777" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#D6B777" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Background Grid */}
                <rect width="600" height="400" fill="url(#goldGrid)" />

                {/* Stylized River / Garden Canal Parkway */}
                <path
                  d="M -50 80 C 120 140, 280 20, 420 110 C 510 170, 580 130, 650 160"
                  stroke="#0f3b28"
                  strokeWidth="38"
                  strokeLinecap="round"
                  opacity="0.75"
                />
                <path
                  d="M -50 80 C 120 140, 280 20, 420 110 C 510 170, 580 130, 650 160"
                  stroke="#175038"
                  strokeWidth="8"
                  strokeLinecap="round"
                  opacity="0.6"
                />

                {/* Secondary Avenues Grid */}
                <path
                  d="M 60 0 L 140 400 M 240 0 L 220 400 M 460 0 L 400 400 M 0 280 L 600 240 M 0 160 L 600 180"
                  stroke="rgba(214, 183, 119, 0.22)"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                />

                {/* Primary Gold Artery 1 (Main Boulevard Gulberg) */}
                <path
                  d="M -20 340 C 150 310, 240 230, 300 200 C 380 160, 470 120, 620 90"
                  stroke="url(#goldRoadGrad)"
                  strokeWidth="7"
                  filter="url(#goldGlow)"
                  strokeLinecap="round"
                />
                {/* Road center marking */}
                <path
                  d="M -20 340 C 150 310, 240 230, 300 200 C 380 160, 470 120, 620 90"
                  stroke="#0a1f16"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                />

                {/* Primary Gold Artery 2 (Grand Palace Access Expressway) */}
                <path
                  d="M 300 200 L 300 30"
                  stroke="url(#goldRoadGrad)"
                  strokeWidth="5"
                  filter="url(#goldGlow)"
                  strokeLinecap="round"
                />

                {/* Radial Venue Radar Pulse Rings */}
                <circle cx="300" cy="200" r="110" fill="url(#beaconGlow)" />
                <circle
                  cx="300"
                  cy="200"
                  r="75"
                  stroke="rgba(214, 183, 119, 0.3)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="300"
                  cy="200"
                  r="45"
                  stroke="rgba(214, 183, 119, 0.5)"
                  strokeWidth="1.5"
                />

                {/* Venue Perimeter Estate Boundary */}
                <rect
                  x="245"
                  y="145"
                  width="110"
                  height="110"
                  rx="16"
                  fill="rgba(13, 44, 30, 0.85)"
                  stroke="#D6B777"
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                />

                {/* Subtle Decorative Architectural Flourishes */}
                <circle cx="245" cy="145" r="3" fill="#D6B777" />
                <circle cx="355" cy="145" r="3" fill="#D6B777" />
                <circle cx="245" cy="255" r="3" fill="#D6B777" />
                <circle cx="355" cy="255" r="3" fill="#D6B777" />

                {/* Road Name Labels (Stylized typography) */}
                <text
                  x="120"
                  y="330"
                  fill="rgba(214, 183, 119, 0.7)"
                  fontSize="9"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                  transform="rotate(-12, 120, 330)"
                >
                  MAIN BOULEVARD GULBERG
                </text>
                <text
                  x="308"
                  y="90"
                  fill="rgba(214, 183, 119, 0.7)"
                  fontSize="8"
                  fontFamily="sans-serif"
                  letterSpacing="2"
                  transform="rotate(90, 308, 90)"
                >
                  PALACE ROYAL AVENUE
                </text>
              </svg>

              {/* Landmark 1: Airport Indicator */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                onClick={() => setActiveLandmark('airport')}
                className="absolute top-8 left-8 z-20 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-border/40 text-[10px] text-gold-light/90 flex items-center gap-1.5 shadow-md hover:border-gold-champagne transition-all"
              >
                <span>✈️</span>
                <span>Int'l Airport (18m)</span>
              </motion.button>

              {/* Landmark 2: VIP Valet Gate 1 */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                onClick={() => setActiveLandmark('valet')}
                className="absolute bottom-8 left-12 z-20 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-border/40 text-[10px] text-gold-light/90 flex items-center gap-1.5 shadow-md hover:border-gold-champagne transition-all"
              >
                <Car size={11} className="text-gold-champagne" />
                <span>Gate 1 • VIP Valet</span>
              </motion.button>

              {/* Landmark 3: Ring Road Access */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                onClick={() => setActiveLandmark('highway')}
                className="absolute top-10 right-8 z-20 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold-border/40 text-[10px] text-gold-light/90 flex items-center gap-1.5 shadow-md hover:border-gold-champagne transition-all"
              >
                <span>🛣️</span>
                <span>Ring Road (6m)</span>
              </motion.button>

              {/* ================= CENTRAL VENUE BEACON PIN ================= */}
              <div className="absolute z-20 flex flex-col items-center pointer-events-auto">
                {/* Pulsing Beacon Waves */}
                <div className="absolute -top-1 w-14 h-14 rounded-full bg-gold-champagne/30 animate-ping pointer-events-none" />
                <div className="absolute -top-3 w-18 h-18 rounded-full bg-gold-champagne/15 animate-pulse pointer-events-none" />

                {/* Floating Gold Palace Crest Badge */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                  className="relative p-2.5 rounded-2xl bg-gradient-to-b from-[#1c3829] to-[#0c1f15] border-2 border-gold-champagne shadow-[0_0_25px_rgba(214,183,119,0.5)] flex items-center justify-center text-gold-light mb-1.5"
                >
                  <span className="text-lg">🏰</span>
                </motion.div>

                {/* Venue Label Plaque */}
                <div className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-md border border-gold-champagne/80 shadow-2xl text-center">
                  <span className="font-serif text-xs font-semibold text-gold-light tracking-wide block">
                    {venue}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-gold-champagne font-medium block">
                    Royal Banquet Suite
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Zoom Controls in Bottom Left */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-gold-border/50 shadow-lg">
              <button
                type="button"
                onClick={handleZoomIn}
                className="w-7 h-7 rounded-lg hover:bg-gold-champagne/20 text-gold-champagne flex items-center justify-center transition-colors"
                title="Zoom In"
              >
                <Plus size={14} />
              </button>
              <span className="text-[10px] font-mono text-gold-light/80 px-1">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomOut}
                className="w-7 h-7 rounded-lg hover:bg-gold-champagne/20 text-gold-champagne flex items-center justify-center transition-colors"
                title="Zoom Out"
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: HIGH-RESOLUTION LIVE SATELLITE RADAR ================= */}
        {mapMode === 'satellite' && (
          <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-black">
            <iframe
              title="Live Satellite Venue Map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery || `${venue}, ${city}, ${country}`)}&t=k&z=16&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Subtle luxury edge glow */}
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-gold-border/40" />
          </div>
        )}

        {/* Bottom Right Floating Open Navigation Pill */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery || `${venue}, ${city}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/85 hover:bg-gold-champagne hover:text-background-main backdrop-blur-md border border-gold-champagne/70 text-[11px] text-gold-light font-medium tracking-wide transition-all shadow-xl active:scale-95 pointer-events-auto"
        >
          <Navigation size={13} className="text-gold-champagne group-hover:text-background-main" />
          <span>Launch Directions</span>
          <ExternalLink size={11} />
        </a>
      </div>

      {/* ================= VENUE CONCIERGE & LOGISTICS DETAILS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-left">
        {/* Venue Address Card with 1-Click Copy */}
        <div className="p-4 rounded-2xl bg-background-main/70 border border-gold-border/30 hover:border-gold-champagne/60 transition-colors shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gold-champagne/10 border border-gold-border/30 text-gold-champagne shrink-0 mt-0.5">
              <MapPin size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-champagne font-semibold block mb-0.5">
                Official Venue Address
              </span>
              <p className="text-xs text-ivory/90 leading-relaxed font-serif line-clamp-2">
                {mapQuery}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="text-[11px] text-gold-light hover:text-gold-champagne font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedAddress ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
                </button>
                <span className="text-gold-border/40">•</span>
                <button
                  type="button"
                  onClick={handleCopyCoords}
                  className="text-[10px] font-mono text-text-secondary hover:text-gold-light transition-colors"
                >
                  {copiedCoords ? 'Coords Copied!' : coordinates}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Valet & Guest Arrival Logistics Card */}
        <div className="p-4 rounded-2xl bg-background-main/70 border border-gold-border/30 hover:border-gold-champagne/60 transition-colors shadow-md">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-gold-champagne/10 border border-gold-border/30 text-gold-champagne shrink-0 mt-0.5">
              <Car size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold-champagne font-semibold block mb-0.5">
                Valet & Arrival Concierge
              </span>
              <p className="text-xs text-ivory/90 leading-relaxed">
                Complimentary VIP Valet parking service stationed at the West Portico Gate.
              </p>
              <span className="text-[10px] text-emerald-400/90 font-medium block mt-1">
                ✓ Dedicated Guest Assistance • Climate Controlled Entry
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* One-Tap Navigation App Triggers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
        {/* Google Maps Route */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 px-4 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-gold-sm"
        >
          <Navigation size={14} />
          <span>Google Maps Route</span>
          <ExternalLink size={12} />
        </motion.a>

        {/* Apple Maps Route */}
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={`https://maps.apple.com/?daddr=${encodeURIComponent(mapQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 px-4 rounded-full bg-background-main/80 hover:bg-background-main border border-gold-border/60 hover:border-gold-champagne text-gold-light font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Compass size={14} className="text-gold-champagne" />
          <span>Apple Maps Route</span>
          <ExternalLink size={12} />
        </motion.a>
      </div>
    </div>
  );
};
