import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  MapPin,
  Calendar,
  Copy,
  Check,
  Navigation,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  ExternalLink,
  Car,
  Compass,
} from 'lucide-react';
import { DEMO_INVITATION, type InvitationData } from '../data/demoInvitation';
import { TEMPLATES } from '../data/templates';
import { ambientSound } from '../utils/audio';
import { downloadCalendarIcs, getGoogleCalendarUrl } from '../utils/calendar';
import { RSVPSection } from './RSVPSection';
import { FloatingPetals } from './FloatingPetals';
import { RomanticFloralBorders } from './RomanticFloralBorders';
import { LuxuryVenueMap } from './LuxuryVenueMap';
import { Link } from 'react-router-dom';

interface InvitationExperienceProps {
  customData?: Partial<InvitationData>;
  templateId?: string;
  onReplayEnvelope: () => void;
}

export const InvitationExperience: React.FC<InvitationExperienceProps> = ({
  customData,
  templateId = 'emerald-elegance',
  onReplayEnvelope,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const selectedTemplate = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const data: InvitationData = { ...DEMO_INVITATION, ...customData };

  // Countdown timer logic
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const difference = data.targetTimestamp - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data.targetTimestamp]);

  const toggleSound = () => {
    const status = ambientSound.toggle();
    setIsPlayingAudio(status);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${data.brideName} & ${data.groomName}'s Wedding Invitation`,
      text: `You are cordially invited to celebrate the wedding of ${data.brideName} & ${data.groomName} at ${data.venue}, ${data.city}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const getWhatsAppShareLink = () => {
    const text = encodeURIComponent(
      `*A Special Wedding Invitation*\n\nTogether with their families, *${data.brideName} & ${data.groomName}* request the pleasure of your company at their wedding celebration on ${data.dateDisplay.dayName}, ${data.dateDisplay.month} ${data.dateDisplay.day}, ${data.dateDisplay.year} at ${data.venue}, ${data.city}.\n\nOpen your interactive digital card here:\n${window.location.href}`
    );
    return `https://api.whatsapp.com/send?text=${text}`;
  };

  // Reusable scroll reveal configuration
  const cardAnimation = {
    initial: { opacity: 0, y: 45, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.85, ease: 'easeOut' as const },
  };

  return (
    <div
      className="relative min-h-[100dvh] w-full text-ivory overflow-x-hidden safe-pb"
      style={{ backgroundColor: selectedTemplate.theme.bg }}
    >
      <FloatingPetals />
      <RomanticFloralBorders />

      {/* Floating Top Controls Header */}
      <div className="fixed top-4 inset-x-0 z-40 max-w-xl mx-auto px-4 flex items-center justify-between pointer-events-none">
        {/* Back Link */}
        <Link
          to="/"
          className="pointer-events-auto h-9 px-3 rounded-full bg-black/60 backdrop-blur-md border border-gold-border/60 text-gold-light hover:text-white flex items-center gap-1.5 text-xs shadow-lg transition-colors"
          title="Back to Cardiva"
        >
          <ArrowLeft size={13} />
          <span className="font-serif">Cardiva</span>
        </Link>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Replay Envelope */}
          <button
            onClick={onReplayEnvelope}
            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-gold-border/60 text-gold-champagne hover:text-gold-light flex items-center justify-center text-xs shadow-lg transition-colors"
            title="Replay Envelope Opening"
            aria-label="Replay Envelope"
          >
            <RotateCcw size={14} />
          </button>

          {/* Audio Ambience Toggle */}
          <button
            onClick={toggleSound}
            className={`h-9 px-3.5 rounded-full border flex items-center gap-2 text-xs shadow-lg transition-all ${
              isPlayingAudio
                ? 'bg-gold-champagne text-background-main font-semibold border-gold-light shadow-gold-sm animate-pulse'
                : 'bg-black/60 backdrop-blur-md border-gold-border/60 text-gold-light hover:text-white'
            }`}
            title="Toggle Ambient Wedding Harmony"
            aria-label="Toggle Sound"
          >
            {isPlayingAudio ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span className="text-[11px] uppercase tracking-wider hidden sm:inline">
              {isPlayingAudio ? 'Sound On' : 'Play Music'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Centered Invitation Viewport */}
      <div className="max-w-xl mx-auto min-h-screen px-4 pt-20 pb-28 relative z-20">
        
        {/* ================= SCENE 2: MAIN INVITATION CARD ================= */}
        <motion.div
          {...cardAnimation}
          className="relative rounded-3xl p-6 sm:p-10 text-center border shadow-2xl overflow-hidden mb-12"
          style={{
            backgroundColor: selectedTemplate.theme.cardBg,
            borderColor: selectedTemplate.theme.border,
          }}
        >
          {/* Background Card Artwork Texture */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url('${selectedTemplate.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

          {/* Card Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Islamic Calligraphy */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gold-champagne text-base sm:text-xl font-arabic tracking-widest mb-3 opacity-95"
            >
              {data.bismillahText}
            </motion.div>
            <p className="text-[9px] uppercase tracking-[0.25em] text-text-secondary font-sans mb-6">
              {data.bismillahEnglish}
            </p>

            {/* Families Announcement */}
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold-light font-medium mb-5">
              {data.parentsText}
            </p>

            {/* Couple Names */}
            <div className="my-2">
              <motion.h1
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory tracking-wide leading-none"
              >
                {data.brideName}
              </motion.h1>
              <div className="font-serif italic text-2xl sm:text-3xl text-gold-champagne my-2">
                &amp;
              </div>
              <motion.h1
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory tracking-wide leading-none"
              >
                {data.groomName}
              </motion.h1>
            </div>

            {/* Ornamental Divider */}
            <div className="flex items-center gap-3 my-6 text-gold-champagne/60">
              <span className="w-12 h-[1px] bg-gold-border" />
              <span className="text-xs">⚜</span>
              <span className="w-12 h-[1px] bg-gold-border" />
            </div>

            {/* Request Invitation Line */}
            <p className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-text-secondary mb-1">
              {data.invitationText}
            </p>
            <p className="font-serif italic text-lg sm:text-xl text-gold-light mb-8">
              {data.occasion}
            </p>

            {/* Date Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-sm rounded-2xl bg-black/40 border border-gold-border/60 p-4 mb-6 shadow-inner"
            >
              <div className="flex items-center justify-around text-center">
                <div>
                  <span className="block text-[9px] tracking-widest text-text-muted uppercase">Day</span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-gold-champagne tracking-wider">
                    {data.dateDisplay.dayName}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-gold-border/40" />
                <div>
                  <span className="block text-[9px] tracking-widest text-text-muted uppercase">Date</span>
                  <span className="font-serif text-lg sm:text-2xl font-bold text-ivory tracking-wider">
                    {data.dateDisplay.month} {data.dateDisplay.day}, {data.dateDisplay.year}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-gold-border/40" />
                <div>
                  <span className="block text-[9px] tracking-widest text-text-muted uppercase">Time</span>
                  <span className="font-serif text-sm sm:text-base font-semibold text-gold-champagne tracking-wider">
                    {data.dateDisplay.time}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Venue Headline */}
            <div className="flex items-center justify-center gap-1.5 text-ivory mb-1">
              <MapPin size={15} className="text-gold-champagne shrink-0" />
              <span className="font-serif text-lg sm:text-xl tracking-wide">{data.venue}</span>
            </div>
            <p className="text-xs text-text-secondary tracking-widest uppercase">
              {data.city}, {data.country}
            </p>
          </div>
        </motion.div>

        {/* ================= SCENE 3: OUR STORY ================= */}
        <motion.div
          {...cardAnimation}
          className="relative rounded-3xl p-6 sm:p-8 bg-background-card/80 border border-gold-border/30 text-center mb-12 shadow-xl hover:border-gold-champagne/50 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Our Journey
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mb-3">
            Our Story
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-gold-light max-w-md mx-auto mb-6 leading-relaxed">
            "{data.storyQuote}"
          </p>

          {/* Couple Photograph in Gold Frame with 3D Float on Scroll */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -0.5 }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' as const }}
            className="relative max-w-sm mx-auto mb-6 p-2 rounded-2xl bg-gradient-to-br from-gold-light via-gold-champagne to-gold-muted shadow-2xl cursor-pointer"
          >
            <div className="overflow-hidden rounded-xl aspect-[4/3] bg-black">
              <img
                src={data.coupleImage}
                alt={`${data.brideName} and ${data.groomName}`}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Polaroid caption */}
            <div className="pt-2 pb-1 text-center font-serif italic text-background-main font-semibold text-sm">
              {data.brideName} &amp; {data.groomName} • Always &amp; Forever
            </div>
          </motion.div>

          <p className="text-xs sm:text-sm text-text-secondary font-light max-w-md mx-auto leading-relaxed">
            {data.storyParagraph}
          </p>
        </motion.div>

        {/* ================= SCENE 4: EVENT SCHEDULE ================= */}
        <motion.div
          {...cardAnimation}
          className="relative rounded-3xl p-6 sm:p-8 bg-background-card/80 border border-gold-border/30 text-center mb-12 shadow-xl hover:border-gold-champagne/50 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Program
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mb-6">
            Celebration Schedule
          </h2>

          <div className="space-y-4 max-w-md mx-auto">
            {data.schedule.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02, x: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 * (idx + 1), ease: 'easeOut' as const }}
                className="flex items-center justify-between p-4 rounded-2xl bg-background-main/60 border border-gold-border/30 hover:border-gold-champagne/70 transition-all cursor-pointer"
              >
                <div className="text-left">
                  <span className="font-serif text-base sm:text-lg text-ivory block">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-text-secondary font-light">
                    {item.description}
                  </span>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1.5 rounded-full bg-gold-champagne/15 border border-gold-champagne/40 text-gold-light text-xs font-semibold tracking-wider">
                    {item.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================= SCENE 5: VENUE & LOCATION MAP ================= */}
        <motion.div
          {...cardAnimation}
          className="relative rounded-3xl p-6 sm:p-8 bg-background-card/80 border border-gold-border/30 text-center mb-12 shadow-xl hover:border-gold-champagne/50 transition-colors overflow-hidden"
        >
          {/* Subtle gold ambient glow */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-24 bg-gold-champagne/10 blur-2xl pointer-events-none" />

          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Celebration Venue
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mb-1">
            {data.venue}
          </h2>
          <p className="text-xs text-gold-champagne/80 tracking-widest uppercase mb-6 font-medium">
            {data.city}, {data.country}
          </p>

          {/* Bespoke Interactive Haute Venue Map */}
          <LuxuryVenueMap
            venue={data.venue}
            city={data.city}
            country={data.country}
            mapQuery={data.mapQuery}
            themeAccent={selectedTemplate.theme.accent}
          />

          {/* Live Countdown Box */}
          <div className="mt-6 p-4 rounded-2xl bg-background-main/70 border border-gold-border/40">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-champagne block mb-2 font-medium">
              Counting Down to the Big Day
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-black/40 rounded-xl p-2 border border-gold-border/20">
                <span className="font-serif text-xl sm:text-2xl font-bold text-ivory block">{timeLeft.days}</span>
                <span className="text-[9px] uppercase tracking-wider text-text-muted">Days</span>
              </div>
              <div className="bg-black/40 rounded-xl p-2 border border-gold-border/20">
                <span className="font-serif text-xl sm:text-2xl font-bold text-ivory block">{timeLeft.hours}</span>
                <span className="text-[9px] uppercase tracking-wider text-text-muted">Hours</span>
              </div>
              <div className="bg-black/40 rounded-xl p-2 border border-gold-border/20">
                <span className="font-serif text-xl sm:text-2xl font-bold text-ivory block">{timeLeft.minutes}</span>
                <span className="text-[9px] uppercase tracking-wider text-text-muted">Mins</span>
              </div>
              <div className="bg-black/40 rounded-xl p-2 border border-gold-border/20">
                <span className="font-serif text-xl sm:text-2xl font-bold text-gold-champagne block">{timeLeft.seconds}</span>
                <span className="text-[9px] uppercase tracking-wider text-text-muted">Secs</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= SCENE 6: DRESS CODE ================= */}
        <motion.div
          {...cardAnimation}
          className="relative rounded-3xl p-6 sm:p-8 bg-background-card/80 border border-gold-border/30 text-center mb-12 shadow-xl hover:border-gold-champagne/50 transition-colors"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Attire
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-ivory tracking-wide mb-2">
            Dress Code
          </h2>
          <p className="font-serif text-xl text-gold-champagne italic mb-2">
            {data.dressCode}
          </p>
          <p className="text-xs text-text-secondary font-light max-w-sm mx-auto">
            {data.dressCodeNote}
          </p>
        </motion.div>

        {/* ================= SCENE 7: RSVP FORM ================= */}
        <motion.div {...cardAnimation}>
          <RSVPSection deadline={data.rsvpDeadline} />
        </motion.div>

        {/* ================= SCENE 8: FINAL SHARING & ACTIONS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center pt-8 border-t border-gold-border/30"
        >
          <div className="text-gold-champagne text-sm font-arabic mb-2">⚜</div>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory mb-1">
            Your Presence Will Make Our Day Complete
          </h3>
          <p className="font-serif italic text-lg text-gold-light mb-8">
            {data.brideName} &amp; {data.groomName}
          </p>

          {/* Functional Actions Grid */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
            {/* WhatsApp Share */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={getWhatsAppShareLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-full bg-emerald-950/80 border border-emerald-500/60 hover:bg-emerald-900/60 text-emerald-300 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <MessageCircle size={15} className="text-emerald-400" />
              <span>Share WhatsApp</span>
            </motion.a>

            {/* Native Share / Copy Link */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShare}
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-full bg-background-card border border-gold-border/60 hover:border-gold-champagne text-gold-light text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              {copiedLink ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </motion.button>
          </div>

          {/* Add to Calendar Options */}
          <div className="p-4 rounded-2xl bg-background-main/60 border border-gold-border/30 max-w-md mx-auto mb-8 text-center">
            <span className="text-[10px] uppercase tracking-wider text-text-secondary block mb-3">
              Add Event to Your Calendar
            </span>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => downloadCalendarIcs()}
                className="py-2 px-4 rounded-full border border-gold-border text-xs text-gold-champagne hover:bg-gold-champagne/10 transition-colors flex items-center gap-1.5"
              >
                <Calendar size={13} />
                <span>Download .ICS file</span>
              </button>

              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-full border border-gold-border text-xs text-gold-champagne hover:bg-gold-champagne/10 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink size={13} />
                <span>Google Calendar</span>
              </a>
            </div>
          </div>

          {/* Toast Notification when link copied */}
          {copiedLink && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-gold-champagne text-background-main font-semibold text-xs tracking-wide shadow-xl flex items-center gap-2 animate-bounce">
              <Check size={14} strokeWidth={3} />
              <span>Invitation link copied to clipboard!</span>
            </div>
          )}

          {/* Bottom Cardiva Watermark */}
          <div className="text-center pt-6">
            <p className="text-[11px] text-text-muted">
              Made with care by{' '}
              <Link to="/" className="text-gold-champagne hover:underline font-serif">
                Cardiva
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
