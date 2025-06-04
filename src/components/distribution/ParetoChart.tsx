
import React, { useState } from 'react';

interface ParetoChartProps {
  title: string;
  items: Array<{ label: string; value: number; current?: number }>;
}

const ParetoChart = ({ title, items }: ParetoChartProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Sort items by current value (lowest first for opportunities/gaps)
  const sortedItems = [...items].sort((a, b) => (a.current || a.value) - (b.current || b.value));

  const getTooltipText = (item: { label: string; value: number; current?: number }, index: number) => {
    if (title.includes("Distribution Opportunities")) {
      const distributed = item.current || item.value;
      const opportunity = 100 - distributed;
      return `${distributed}% distributed, ${opportunity}% opportunity`;
    } else {
      const available = item.current || item.value;
      const gap = 100 - available;
      return `${available}% available, ${gap}% gap`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">{title}</h3>
      <div className="space-y-3">
        {sortedItems.map((item, index) => {
          const currentValue = item.current || item.value;
          const remainingValue = 100 - currentValue;
          
          return (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-gray-700">{item.label}</div>
                <div className="text-sm font-medium text-gray-900">
                  {currentValue}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 relative">
                <div 
                  className="bg-gray-500 h-2 rounded-l-full" 
                  style={{ width: `${currentValue}%` }}
                ></div>
                <div 
                  className="bg-red-500 h-2 rounded-r-full absolute top-0" 
                  style={{ 
                    left: `${currentValue}%`, 
                    width: `${remainingValue}%` 
                  }}
                ></div>
              </div>
              
              {/* Tooltip */}
              {hoveredItem === index && (
                <div className="absolute z-10 bg-black text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  {getTooltipText(item, index)}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParetoChart;
