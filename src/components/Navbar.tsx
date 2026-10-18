import React, { useState, useEffect } from 'react';
import { GoldEmblem } from './GoldEmblem';
import { Menu, X, Sparkles, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCustomizer }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background-main/90 backdrop-blur-md border-b border-gold-border/40 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-gold-champagne/50 rounded-sm"
          aria-label="Cardiva Home"
        >
          <GoldEmblem size={34} />
          <div className="flex flex-col">
            <span className="font-serif text-2xl sm:text-3xl tracking-wide font-normal text-ivory group-hover:text-gold-light transition-colors">
              Cardiva
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-muted/80 -mt-1 hidden sm:block">
              Haute Invitation Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-gold-champagne transition-colors focus:outline-none"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-gold-champagne transition-colors focus:outline-none"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection('templates')}
            className="hover:text-gold-champagne transition-colors focus:outline-none"
          >
            Templates
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hover:text-gold-champagne transition-colors focus:outline-none"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-gold-champagne transition-colors focus:outline-none"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-gold-champagne transition-colors focus:outline-none"
          >
            Contact
          </button>
        </nav>

        {/* CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/invitation/demo"
            className="text-xs uppercase tracking-wider text-gold-champagne/90 hover:text-gold-light border border-gold-border/60 hover:border-gold-champagne px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5"
          >
            <Sparkles size={13} className="text-gold-champagne" />
            <span>Live Demo</span>
          </Link>

          <button
            onClick={onOpenCustomizer}
            className="text-xs uppercase tracking-wider font-medium text-background-main bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted hover:brightness-110 px-5 py-2.5 rounded-full transition-all shadow-gold-sm hover:shadow-gold-md"
          >
            Create Your Invitation
          </button>
        </div>

        {/* Mobile Action & Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/invitation/demo"
            className="text-[11px] uppercase tracking-wider text-gold-champagne border border-gold-border/80 px-2.5 py-1.5 rounded-full flex items-center gap-1"
          >
            <Sparkles size={11} />
            <span>Demo</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-11 h-11 flex items-center justify-center text-ivory hover:text-gold-champagne focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background-secondary/95 backdrop-blur-xl border-b border-gold-border/40 px-6 py-6 transition-all duration-300">
          <div className="flex flex-col space-y-4 text-base font-serif tracking-wide text-ivory">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-left py-2 hover:text-gold-champagne border-b border-gold-border/10"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 hover:text-gold-champagne border-b border-gold-border/10"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('templates')}
              className="text-left py-2 hover:text-gold-champagne border-b border-gold-border/10"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 hover:text-gold-champagne border-b border-gold-border/10"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2 hover:text-gold-champagne border-b border-gold-border/10"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left py-2 hover:text-gold-champagne border-b border-gold-border/10"
            >
              Contact
            </button>

            <div className="pt-4 flex flex-col gap-3">
              <Link
                to="/invitation/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-full border border-gold-champagne/80 text-gold-champagne text-xs uppercase tracking-widest font-sans flex items-center justify-center gap-2"
              >
                <Sparkles size={14} />
                <span>Experience Full Invitation Demo</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer?.();
                }}
                className="w-full text-center py-3 rounded-full bg-gradient-to-r from-gold-light via-gold-champagne to-gold-muted text-background-main font-medium text-xs uppercase tracking-widest font-sans shadow-gold-sm"
              >
                Create Your Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
