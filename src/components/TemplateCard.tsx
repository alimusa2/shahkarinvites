import React from 'react';
import { InvitationTemplate } from '../data/templates';
import { Eye, Sparkles, Check } from 'lucide-react';

interface TemplateCardProps {
  template: InvitationTemplate;
  onPreview: (template: InvitationTemplate) => void;
  onSelect: (template: InvitationTemplate) => void;
  isSelected?: boolean;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onPreview,
  onSelect,
  isSelected = false,
}) => {
  return (
    <div
      className={`group relative bg-background-card rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col ${
        isSelected
          ? 'border-gold-champagne shadow-gold-md -translate-y-2'
          : 'border-gold-border/30 hover:border-gold-champagne/70 hover:shadow-gold-sm hover:-translate-y-1.5'
      }`}
    >
      {/* Badge */}
      {template.badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-background-main/80 backdrop-blur-md text-gold-light border border-gold-border/60 shadow">
            {template.badge}
          </span>
        </div>
      )}

      {/* Image Container with hover reveal */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black/60">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background-card via-transparent to-transparent opacity-80" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-background-main/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={() => onPreview(template)}
            className="w-full max-w-[200px] py-2.5 px-4 rounded-full bg-gold-champagne text-background-main font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all"
          >
            <Eye size={14} />
            <span>Preview Invitation</span>
          </button>
          
          <button
            onClick={() => onSelect(template)}
            className="w-full max-w-[200px] py-2.5 px-4 rounded-full border border-gold-champagne text-gold-light font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-champagne/20 transition-all"
          >
            <Sparkles size={14} />
            <span>Use This Design</span>
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-background-card">
        <div>
          <div className="flex items-center justify-between text-xs text-gold-champagne/90 mb-1">
            <span className="uppercase tracking-widest font-sans text-[10px]">
              {template.category}
            </span>
            <div className="flex gap-1">
              {template.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="text-[9px] text-text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-ivory tracking-wide mb-1 group-hover:text-gold-light transition-colors">
            {template.name}
          </h3>

          <p className="text-text-secondary text-xs line-clamp-2 font-light leading-relaxed mb-4">
            {template.description}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-gold-border/20 flex items-center justify-between gap-2">
          <button
            onClick={() => onPreview(template)}
            className="text-xs uppercase tracking-wider text-text-secondary hover:text-gold-champagne flex items-center gap-1.5 transition-colors py-1.5"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>

          <button
            onClick={() => onSelect(template)}
            className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              isSelected
                ? 'bg-gold-champagne text-background-main font-semibold'
                : 'border border-gold-border text-gold-champagne hover:bg-gold-champagne/10'
            }`}
          >
            {isSelected ? (
              <>
                <Check size={12} strokeWidth={3} />
                <span>Selected</span>
              </>
            ) : (
              <span>Select</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
