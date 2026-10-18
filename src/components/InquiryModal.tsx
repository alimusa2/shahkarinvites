import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { PricingTier } from '../data/pricing';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier: PricingTier | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  selectedTier,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to local storage demo session
    const inquiryData = {
      name,
      phone,
      city,
      eventDate,
      tier: selectedTier?.name || 'General Inquiry',
      submittedAt: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('cardiva_inquiries') || '[]');
      existing.push(inquiryData);
      localStorage.setItem('cardiva_inquiries', JSON.stringify(existing));
    } catch {
      // fallback
    }
    setSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Salaam Cardiva! I would like to inquire about the ${selectedTier?.name || 'Cardiva'} invitation package for our upcoming wedding. Name: ${name || 'Guest'}.`
    );
    return `https://wa.me/923001234567?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-background-card rounded-3xl border border-gold-champagne/40 shadow-2xl p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full border border-gold-border/40 flex items-center justify-center text-text-secondary hover:text-ivory hover:border-gold-champagne transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-widest text-gold-champagne block mb-1">
                {selectedTier ? `Selected Package: ${selectedTier.name} (${selectedTier.pricePKR})` : 'Concierge Desk'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ivory tracking-tight">
                Order &amp; Inquiry Consultation
              </h3>
              <p className="text-text-secondary text-xs sm:text-sm font-light mt-1">
                Our Pakistani wedding stationery team will assist you with calligraphy, music selection, and RSVP setup.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Fatima Tariq"
                  className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Lahore / Karachi"
                    className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-text-secondary mb-1">
                  Estimated Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-background-main border border-gold-border/40 text-ivory text-sm focus:outline-none focus:border-gold-champagne transition-all"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 text-background-main font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-gold-sm flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  <span>Submit Inquiry</span>
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-emerald-500/60 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-300 text-xs uppercase tracking-widest font-medium transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} className="text-emerald-400" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </form>

            <div className="mt-4 flex items-start gap-2 text-[10px] text-text-muted">
              <AlertCircle size={12} className="shrink-0 mt-0.5 text-gold-champagne" />
              <span>Inquiry details are saved locally in this prototype. Payment gateway integration will be attached prior to production rollout.</span>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-serif text-2xl text-ivory tracking-wide mb-2">
              Inquiry Received!
            </h3>
            <p className="text-text-secondary text-sm font-light max-w-sm mx-auto mb-6">
              Thank you, <strong className="text-gold-light">{name}</strong>. Your inquiry for the <strong className="text-gold-light">{selectedTier?.name || 'Cardiva'}</strong> tier has been recorded. Our design team will contact you via WhatsApp shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-2.5 rounded-full border border-gold-border hover:border-gold-champagne text-gold-champagne text-xs uppercase tracking-widest"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
