import React from 'react';
import { GoldEmblem } from './GoldEmblem';
import { Heart, MessageCircle, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-gold-border/20 bg-background-secondary/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gold-border/15">
          
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <GoldEmblem size={32} />
              <span className="font-serif text-2xl tracking-wide text-ivory">Cardiva</span>
            </div>
            <p className="text-text-secondary text-sm font-light leading-relaxed max-w-sm mb-6">
              Transforming traditional Pakistani wedding stationery into interactive digital heirlooms. Crafted for Nikah, Baraat, Walima, and celebrations that matter.
            </p>
            <div className="flex items-center gap-2 text-xs text-gold-champagne/80 font-sans">
              <MapPin size={13} />
              <span>Lahore • Karachi • Islamabad • Worldwide Delivery</span>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-serif text-base text-ivory tracking-wide mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li>
                <button onClick={() => scrollTo('hero')} className="hover:text-gold-champagne transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('features')} className="hover:text-gold-champagne transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('templates')} className="hover:text-gold-champagne transition-colors">
                  Invitation Templates
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('how-it-works')} className="hover:text-gold-champagne transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pricing')} className="hover:text-gold-champagne transition-colors">
                  Pricing &amp; Packages
                </button>
              </li>
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h4 className="font-serif text-base text-ivory tracking-wide mb-4">Celebrations</h4>
            <ul className="space-y-2.5 text-xs text-text-secondary">
              <li><span className="hover:text-gold-champagne cursor-pointer">Nikah Invitations</span></li>
              <li><span className="hover:text-gold-champagne cursor-pointer">Baraat E-Cards</span></li>
              <li><span className="hover:text-gold-champagne cursor-pointer">Walima Receptions</span></li>
              <li><span className="hover:text-gold-champagne cursor-pointer">Mehndi &amp; Mayun</span></li>
              <li><span className="hover:text-gold-champagne cursor-pointer">Corporate &amp; VIP Events</span></li>
            </ul>
          </div>

          {/* Live Demo & Contact */}
          <div>
            <h4 className="font-serif text-base text-ivory tracking-wide mb-4">Experience</h4>
            <ul className="space-y-3 text-xs text-text-secondary">
              <li>
                <Link
                  to="/invitation/demo"
                  className="inline-flex items-center gap-1.5 text-gold-champagne hover:underline"
                >
                  <span>Interactive Wedding Demo</span>
                  <span>&rarr;</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 text-text-secondary hover:text-ivory transition-colors"
                >
                  <MessageCircle size={14} className="text-emerald-400" />
                  <span>WhatsApp Inquiry Desk</span>
                </button>
              </li>
              <li>
                <a
                  href="mailto:concierge@cardiva.pk"
                  className="inline-flex items-center gap-1.5 text-text-secondary hover:text-ivory transition-colors"
                >
                  <Mail size={14} className="text-gold-champagne" />
                  <span>concierge@cardiva.pk</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            &copy; 2026 Cardiva. All rights reserved. “Every Celebration Begins with an Invitation.”
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-text-secondary cursor-pointer">Privacy Policy</span>
            <span className="hover:text-text-secondary cursor-pointer">Terms of Service</span>
            <div className="flex items-center gap-1 text-gold-champagne/90">
              <span>Made with</span>
              <Heart size={12} className="text-red-500 fill-red-500" />
              <span>in Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
