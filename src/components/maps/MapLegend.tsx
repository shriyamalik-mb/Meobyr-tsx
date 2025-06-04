
import React from 'react';

interface MapLegendProps {
  view: 'distribution' | 'availability';
}

export default function MapLegend({ view }: MapLegendProps) {
  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="bg-brand-light p-3 rounded-lg">
        <h4 className="text-sm font-semibold text-brand-navy mb-2 text-center">
          {view === 'distribution' ? 'Distribution Intensity' : 'Availability Intensity'}
        </h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-600">Low (0.0)</span>
          <div className="flex space-x-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(255, 0, 0, 0.7)' }}></div>
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(255, 128, 0, 0.7)' }}></div>
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(255, 255, 0, 0.7)' }}></div>
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(128, 255, 0, 0.7)' }}></div>
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(0, 255, 0, 0.7)' }}></div>
          </div>
          <span className="text-xs text-gray-600">High (1.0)</span>
        </div>
      </div>
    </div>
  );
}
