
import React from 'react';

interface HeatmapPlaceholderProps {
  label: string;
}

const HeatmapPlaceholder = ({ label }: HeatmapPlaceholderProps) => {
  return (
    <div className="bg-gray-200 rounded-lg p-8 flex items-center justify-center border-2 border-dashed border-gray-400 min-h-[300px]">
      <div className="text-center text-gray-600">
        <p className="font-medium">{label}</p>
      </div>
    </div>
  );
};

export default HeatmapPlaceholder;
