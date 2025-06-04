
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ContentTypeData {
  label: string;
  percent: number;
  change: number;
  needsAttentionCount: number;
  performingCount: number;
}

const ContentTypePerformanceList = () => {
  const data: ContentTypeData[] = [
    { label: "Title", percent: 75, change: 2, needsAttentionCount: 42, performingCount: 78 },
    { label: "Hero Image", percent: 75, change: -1, needsAttentionCount: 47, performingCount: 73 },
    { label: "Description", percent: 77, change: 3, needsAttentionCount: 40, performingCount: 80 },
    { label: "Taxonomy", percent: 88, change: 5, needsAttentionCount: 23, performingCount: 97 },
    { label: "Enhanced Content", percent: 77, change: -2, needsAttentionCount: 41, performingCount: 79 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">Content Type Performance</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center">
                {item.change > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className="text-sm font-medium text-gray-900">{item.percent}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-brand-sage h-2 rounded-full" 
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{item.needsAttentionCount} SKUs need attention</span>
              <span>{item.performingCount} performing well</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentTypePerformanceList;
