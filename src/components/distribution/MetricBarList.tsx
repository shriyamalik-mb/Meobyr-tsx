
import React from 'react';

interface MetricBarListProps {
  title: string;
  data: Array<{ label: string; value: number }>;
}

const MetricBarList = ({ title, data }: MetricBarListProps) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-semibold text-brand-navy mb-4">{title}</h4>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-700">{item.label}</span>
                <span className="text-xs font-medium text-brand-navy">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand-brick h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricBarList;
