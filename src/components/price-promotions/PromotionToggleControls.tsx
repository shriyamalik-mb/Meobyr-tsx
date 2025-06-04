
import React from 'react';
import { Button } from '@/components/ui/button';

interface PromotionToggleControlsProps {
  viewToggle: {
    options: [string, string];
    active: string;
    onChange: (value: string) => void;
  };
  comparisonToggle: {
    options: [string, string];
    active: string;
    onChange: (value: string) => void;
  };
}

const PromotionToggleControls = ({ viewToggle, comparisonToggle }: PromotionToggleControlsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        {viewToggle.options.map((option) => (
          <Button
            key={option}
            variant={viewToggle.active === option ? "default" : "ghost"}
            size="sm"
            className={`rounded-none ${viewToggle.active === option ? 'bg-brand-sage text-white' : 'bg-white text-gray-700'}`}
            onClick={() => viewToggle.onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
      
      <div className="flex rounded-lg border border-gray-200 overflow-hidden">
        {comparisonToggle.options.map((option) => (
          <Button
            key={option}
            variant={comparisonToggle.active === option ? "default" : "ghost"}
            size="sm"
            className={`rounded-none ${comparisonToggle.active === option ? 'bg-brand-brick text-white' : 'bg-white text-gray-700'}`}
            onClick={() => comparisonToggle.onChange(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PromotionToggleControls;
