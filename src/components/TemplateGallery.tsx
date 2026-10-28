import React, { useState } from 'react';
import { TEMPLATES, InvitationTemplate } from '../data/templates';
import { TemplateCard } from './TemplateCard';
import { useNavigate } from 'react-router-dom';

interface TemplateGalleryProps {
  onSelectTemplate: (template: InvitationTemplate) => void;
  selectedTemplateId?: string;
}

const CATEGORIES = ['All Designs', 'Wedding & Walima', 'Nikah & Reception', 'Baraat & Royal', 'Mehndi & Mayun'];

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
  selectedTemplateId = 'emerald-elegance',
}) => {
  const [activeCategory, setActiveCategory] = useState('All Designs');
  const navigate = useNavigate();

  const filteredTemplates = activeCategory === 'All Designs'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0]));

  const handlePreview = (template: InvitationTemplate) => {
    if (template.id === 'brown-luxury') {
      navigate('/cards/brown-wedding');
      return;
    }
    navigate(`/invitation/demo?theme=${template.id}`);
  };

  return (
    <section id="templates" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
            <span className="text-xs uppercase tracking-[0.25em] text-gold-champagne font-medium">
              Curated Atelier
            </span>
            <span className="w-6 h-[1px] bg-gold-champagne/60" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ivory tracking-tight mb-4">
            Crafted for Every Occasion
          </h2>
          <p className="text-text-secondary text-sm sm:text-base font-light">
            Find a design that reflects your celebration. Each theme is fully customizable with your wedding colors, couple story, and event schedule.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gold-champagne text-background-main shadow-gold-sm font-semibold'
                  : 'bg-background-card/80 text-text-secondary border border-gold-border/30 hover:border-gold-champagne/60 hover:text-ivory'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={handlePreview}
              onSelect={onSelectTemplate}
              isSelected={selectedTemplateId === template.id}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
