
import React from 'react';
import { ShoppingCart, Award, Target } from 'lucide-react';

interface PromotionKpiCardProps {
  title: string;
  value: string;
  deltaText: string;
  iconName: 'shopping-cart' | 'award' | 'target';
}

const PromotionKpiCard = ({ title, value, deltaText, iconName }: PromotionKpiCardProps) => {
  const getIcon = () => {
    switch (iconName) {
      case 'shopping-cart':
        return <ShoppingCart className="w-6 h-6 text-brand-sage" />;
      case 'award':
        return <Award className="w-6 h-6 text-brand-sage" />;
      case 'target':
        return <Target className="w-6 h-6 text-brand-sage" />;
      default:
        return <ShoppingCart className="w-6 h-6 text-brand-sage" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-brand-navy mb-1">{value}</p>
          <p className="text-sm text-brand-sage">{deltaText}</p>
        </div>
        <div className="ml-4">
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

export default PromotionKpiCard;
