
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { distributionData } from '@/data/distributionData';
import { availabilityData } from '@/data/availabilityData';
import { coordinates } from '@/data/coordinates';

// Helper function to get availability points for a given date index
function getAvailabilityPointsForDate(index: number) {
  const dayRecord = availabilityData[index];
  if (!dayRecord) return [];
  return Object.entries(dayRecord.values).reduce((acc: any[], [locName, val]) => {
    const coord = coordinates[locName as keyof typeof coordinates];
    if (coord) {
      acc.push({ lat: coord.lat, lng: coord.lng, value: val, name: locName });
    }
    return acc;
  }, []);
}

const HeatmapVisualization = () => {
  const [mode, setMode] = useState<'distribution' | 'availability'>('distribution');
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);

  // Get availability points for current date
  const availabilityPoints = useMemo(
    () => getAvailabilityPointsForDate(selectedDateIndex),
    [selectedDateIndex]
  );

  // Determine current data based on mode
  const currentData = mode === 'availability' ? availabilityPoints : distributionData;

  // Get color based on value
  const getColor = (value: number) => {
    if (value >= 0.8) return '#6B8E23'; // brand-sage
    if (value >= 0.6) return '#D2691E'; // brand-brick
    if (value >= 0.4) return '#4682B4'; // blue
    if (value >= 0.2) return '#9370DB'; // purple
    return '#8B5A3C'; // brown
  };

  // Calculate map bounds
  const bounds = useMemo(() => {
    if (currentData.length === 0) return null;
    
    const lats = currentData.map(d => d.lat);
    const lngs = currentData.map(d => d.lng);
    
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs)
    };
  }, [currentData]);

  // Convert lat/lng to SVG coordinates
  const getPosition = (lat: number, lng: number) => {
    if (!bounds) return { x: 0, y: 0 };
    
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
    const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
    
    return { x, y };
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-brand-navy">Geographic Distribution Heatmap</h3>
        
        {/* Mode Toggle */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <Button
            variant={mode === 'distribution' ? "default" : "ghost"}
            size="sm"
            className={`rounded-none ${mode === 'distribution' ? 'bg-brand-sage text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setMode('distribution')}
          >
            Distribution
          </Button>
          <Button
            variant={mode === 'availability' ? "default" : "ghost"}
            size="sm"
            className={`rounded-none ${mode === 'availability' ? 'bg-brand-sage text-white' : 'bg-white text-gray-700'}`}
            onClick={() => setMode('availability')}
          >
            Availability
          </Button>
        </div>
      </div>

      {/* Date Slider for Availability Mode */}
      {mode === 'availability' && (
        <div className="mb-4 p-3 bg-brand-light rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-brand-navy">
              Date: {availabilityData[selectedDateIndex]?.date || '2025-05-01'}
            </span>
            <input
              type="range"
              min={0}
              max={availabilityData.length - 1}
              value={selectedDateIndex}
              onChange={(e) => setSelectedDateIndex(Number(e.target.value))}
              className="flex-1"
            />
          </div>
        </div>
      )}

      {/* Heatmap Visualization */}
      <div className="relative bg-brand-cream rounded-lg p-4" style={{ height: '400px' }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          {currentData.map((point, index) => {
            const position = getPosition(point.lat, point.lng);
            const radius = Math.max(2, point.value * 4);
            
            return (
              <g key={index}>
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={radius}
                  fill={getColor(point.value)}
                  opacity={0.7}
                  className="transition-all duration-200 hover:opacity-1"
                />
                <title>
                  {point.name || `Point ${index + 1}`}: {(point.value * 100).toFixed(0)}%
                </title>
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border">
          <h4 className="text-xs font-semibold text-brand-navy mb-2">Value Range</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6B8E23' }}></div>
              <span className="text-xs">80-100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#D2691E' }}></div>
              <span className="text-xs">60-79%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4682B4' }}></div>
              <span className="text-xs">40-59%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#9370DB' }}></div>
              <span className="text-xs">20-39%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B5A3C' }}></div>
              <span className="text-xs">0-19%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-brand-light rounded-lg">
          <div className="text-lg font-bold text-brand-navy">
            {currentData.length}
          </div>
          <div className="text-sm text-gray-600">Total Locations</div>
        </div>
        <div className="p-3 bg-brand-light rounded-lg">
          <div className="text-lg font-bold text-brand-navy">
            {currentData.length > 0 ? ((currentData.reduce((sum, p) => sum + p.value, 0) / currentData.length) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600">Average {mode === 'availability' ? 'Availability' : 'Distribution'}</div>
        </div>
        <div className="p-3 bg-brand-light rounded-lg">
          <div className="text-lg font-bold text-brand-navy">
            {currentData.length > 0 ? (Math.max(...currentData.map(p => p.value)) * 100).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600">Highest Value</div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapVisualization;
