
import React from 'react';

interface PlatformDetailCardProps {
  platform: string;
  overallScore: { value: number; delta: string };
  executionScore: { value: number; delta: string };
  qualityScore: { value: number; delta: string };
  contentScores: Array<{ field: string; score: number; delta: string }>;
}

// Reusable circular KPI component
const KpiCircle = ({ title, value, delta, size = "medium" }: { title: string; value: number; delta: string; size?: string }) => {
  const sizeClasses = size === "small" ? "w-16 h-16" : size === "medium" ? "w-20 h-20" : "w-24 h-24";
  const textSizeClasses = size === "small" ? "text-lg" : size === "medium" ? "text-xl" : "text-2xl";
  
  return (
    <div className="text-center">
      <p className="text-sm font-medium text-gray-700 mb-4">{title}</p>
      <div className={`relative ${sizeClasses} mx-auto`}>
        <svg className={`${sizeClasses} transform -rotate-90`}>
          <circle cx="50%" cy="50%" r="40%" stroke="#E5E7EB" strokeWidth="8" fill="none" />
          <circle
            cx="50%" cy="50%" r="40%"
            stroke="#577399" strokeWidth="8" fill="none"
            strokeDasharray={`${value * 2.51} 251`} strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${textSizeClasses} font-bold text-brand-navy`}>{value}%</span>
          <span className={`text-xs ${delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{delta}</span>
        </div>
      </div>
    </div>
  );
};

const ContentFieldBar = ({ field, score, delta }: { field: string; score: number; delta: string }) => (
  <div className="flex items-center justify-between mb-3">
    <span className="text-sm text-gray-700 w-32">{field}</span>
    <div className="flex-1 mx-4">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-brand-sage h-2 rounded-full" 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
    <span className={`text-xs w-8 ${delta.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {delta}
    </span>
  </div>
);

const PlatformDetailCard = ({ platform, overallScore, executionScore, qualityScore, contentScores }: PlatformDetailCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-brand-light">
      <h3 className="text-xl font-bold text-brand-navy mb-6">{platform}</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCircle 
          title="Overall Score" 
          value={overallScore.value} 
          delta={overallScore.delta} 
          size="medium" 
        />
        <KpiCircle 
          title="Execution Score" 
          value={executionScore.value} 
          delta={executionScore.delta} 
          size="medium" 
        />
        <KpiCircle 
          title="Quality Score" 
          value={qualityScore.value} 
          delta={qualityScore.delta} 
          size="medium" 
        />
      </div>
      
      <div>
        <h4 className="font-medium text-brand-navy mb-3">Content Field Breakdown</h4>
        {contentScores.map((content, index) => (
          <ContentFieldBar key={index} {...content} />
        ))}
      </div>
    </div>
  );
};

export default PlatformDetailCard;
