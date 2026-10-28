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
      className={`group relative bg-[#121217] rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col ${
        isSelected
          ? 'border-gold-champagne shadow-[0_15px_40px_rgba(214,183,119,0.35)] -translate-y-2'
          : 'border-gold-border/40 hover:border-gold-champagne/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_45px_rgba(214,183,119,0.2)] hover:-translate-y-1.5'
      }`}
      style={{
        boxShadow: isSelected
          ? '0 0 0 1px rgba(214, 183, 119, 0.4), 0 20px 45px rgba(0,0,0,0.8), 0 0 25px rgba(214, 183, 119, 0.25)'
          : undefined,
      }}
    >
      {/* Badge */}
      {template.badge && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/75 backdrop-blur-md text-gold-light border border-gold-border/70 shadow-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-champagne animate-pulse" />
            <span>{template.badge}</span>
          </span>
        </div>
      )}

      {/* Image Container with hover reveal & inner luxury bevel */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black/80">
        <img
          src={template.image}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Inner delicate gold frame border */}
        <div className="absolute inset-2 rounded-xl border border-gold-border/20 pointer-events-none group-hover:border-gold-champagne/40 transition-colors" />

        {/* Gradient overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-black/20 to-transparent opacity-90" />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <button
            onClick={() => onPreview(template)}
            className="w-full max-w-[210px] py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FFF1DC] via-[#D4A86A] to-[#B88A55] text-background-main font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <Eye size={14} />
            <span>Preview Invitation</span>
          </button>
          
          <button
            onClick={() => onSelect(template)}
            className="w-full max-w-[210px] py-2.5 px-4 rounded-full border border-gold-champagne/80 bg-black/50 backdrop-blur-md text-gold-light font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-champagne/20 active:scale-95 transition-all shadow-md"
          >
            <Sparkles size={14} className="text-gold-champagne" />
            <span>Use This Design</span>
          </button>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-[#121217] border-t border-gold-border/20">
        <div>
          <div className="flex items-center justify-between text-xs text-gold-champagne/90 mb-1.5">
            <span className="uppercase tracking-[0.2em] font-sans text-[10px] font-semibold text-gold-light/90">
              {template.category}
            </span>
            <div className="flex gap-1.5">
              {template.tags.slice(0, 2).map((tag, i) => (
                <span key={i} className="text-[9px] uppercase tracking-wider text-text-muted px-1.5 py-0.5 rounded bg-black/40 border border-gold-border/20">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-ivory tracking-wide mb-1.5 group-hover:text-gold-light transition-colors">
            {template.name}
          </h3>

          <p className="text-text-secondary text-xs line-clamp-2 font-light leading-relaxed mb-4">
            {template.description}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-gold-border/25 flex items-center justify-between gap-2">
          <button
            onClick={() => onPreview(template)}
            className="text-xs uppercase tracking-wider text-text-secondary hover:text-gold-champagne flex items-center gap-1.5 transition-colors py-1.5 font-sans"
          >
            <Eye size={13} className="text-gold-champagne" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => onSelect(template)}
            className={`text-xs uppercase tracking-wider px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-sans ${
              isSelected
                ? 'bg-gold-champagne text-background-main font-semibold shadow-gold-sm'
                : 'border border-gold-border/70 text-gold-champagne hover:bg-gold-champagne/15'
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
