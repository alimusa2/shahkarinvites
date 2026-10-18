import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../data/templates';
import { useNavigate } from 'react-router-dom';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTemplateId?: string;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  defaultTemplateId = 'emerald-elegance',
}) => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(defaultTemplateId);
  const [brideName, setBrideName] = useState('Ayesha');
  const [groomName, setGroomName] = useState('Hamza');
  const [venue, setVenue] = useState('The Grand Palace, Lahore');
  const [date, setDate] = useState('2026-12-20');

  if (!isOpen) return null;

  const handleLaunchInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    // Pass custom params via state or URL search parameters
    const params = new URLSearchParams({
      theme: selectedTheme,
      bride: brideName || 'Ayesha',
      groom: groomName || 'Hamza',
      venue: venue || 'The Grand Palace, Lahore',
      date: date || '2026-12-20',
    });
    navigate(`/invitation/demo?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-background-card rounded-3xl border border-gold-champagne/40 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-gold-border/40 flex items-center justify-center text-text-secondary hover:text-ivory hover:border-gold-champagne transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold-border/40 text-[10px] uppercase tracking-widest text-gold-champagne mb-2">
            <Sparkles size={11} />
            <span>Interactive Studio</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-tight">
            Personalize Your Invitation
          </h3>
          <p className="text-text-secondary text-xs sm:text-sm font-light mt-1">
            Preview how your names and venue look inside our animated digital stationery.
          </p>
        </div>

        <form onSubmit={handleLaunchInvitation} className="space-y-5">
          {/* Couple Names */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5 font-sans">
                Bride’s Name
              </label>
              <input
                type="text"
                required
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Ayesha"
                className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5 font-sans">
                Groom’s Name
              </label>
              <input
                type="text"
                required
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="Hamza"
                className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all"
              />
            </div>
          </div>

          {/* Venue & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5 font-sans">
                Venue &amp; City
              </label>
              <input
                type="text"
                required
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="The Grand Palace, Lahore"
                className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1.5 font-sans">
                Celebration Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne transition-all"
              />
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-text-secondary mb-2.5 font-sans">
              Choose Design Palette
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TEMPLATES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedTheme === t.id
                      ? 'border-gold-champagne bg-gold-champagne/15 text-ivory shadow-sm'
                      : 'border-gold-border/30 bg-background-main/60 text-text-secondary hover:border-gold-border hover:text-ivory'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-gold-border/60 shrink-0"
                    style={{ backgroundColor: t.theme.cardBg }}
                  />
                  <div className="truncate">
                    <span className="block text-xs font-serif truncate">{t.name}</span>
                    <span className="block text-[9px] text-gold-champagne/70 truncate">{t.category.split('&')[0]}</span>
                  </div>
                  {selectedTheme === t.id && (
                    <Check size={12} className="text-gold-champagne ml-auto shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-sm flex items-center justify-center gap-2"
            >
              <span>Experience Custom Invitation Live</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
