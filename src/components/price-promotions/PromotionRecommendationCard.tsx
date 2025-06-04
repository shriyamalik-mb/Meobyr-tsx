
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PromotionRecommendationCardProps {
  numberBadge: number;
  priorityLabel: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  categoryTag: string;
}

const PromotionRecommendationCard = ({ 
  numberBadge, 
  priorityLabel, 
  title, 
  description, 
  categoryTag 
}: PromotionRecommendationCardProps) => {
  const getPriorityColor = () => {
    switch (priorityLabel) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-brand-brick text-brand-cream rounded-full flex items-center justify-center text-sm font-bold">
              {numberBadge}
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor()}`}>
              {priorityLabel}
            </span>
          </div>
          <h3 className="font-semibold text-brand-navy mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          <span className="inline-block px-3 py-1 bg-brand-light text-brand-navy rounded-full text-xs font-medium">
            {categoryTag}
          </span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
      </div>
    </div>
  );
};

export default PromotionRecommendationCard;
