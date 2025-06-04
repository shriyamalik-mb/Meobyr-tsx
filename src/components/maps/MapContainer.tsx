
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DistributionMap from './DistributionMap';
import AvailabilityMap from './AvailabilityMap';
import { availabilityData } from '../../data/availabilityData.ts';
import { distributionData } from '../../data/distributionData.ts';

interface AvailabilityRecord {
  date: string;
  values: Record<string, number>;
}

export default function MapContainer() {
  const [view, setView] = useState<'distribution' | 'availability'>('distribution');
  const [token, setToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [error, setError] = useState('');

  const dateList = useMemo(() => {
    const allDates = (availabilityData as AvailabilityRecord[]).map((rec) => rec.date);
    const unique = Array.from(new Set(allDates));
    unique.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    return unique;
  }, []);

  const [dateIndex, setDateIndex] = useState(0);
  const selectedDate = dateList[dateIndex];

  const handleTokenSubmit = () => {
    if (!token.trim()) {
      setError('Please enter a valid Mapbox token');
      return;
    }
    
    if (!token.startsWith('pk.')) {
      setError('Invalid token format. Mapbox tokens should start with "pk."');
      return;
    }
    
    setError('');
    setIsTokenSet(true);
  };

  if (!isTokenSet) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-brand-navy mb-4">Geographic Distribution Heatmap</h3>
        <div className="w-full h-96 bg-brand-light rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="max-w-md w-full space-y-4">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-brand-navy mb-2">Mapbox Configuration Required</h4>
              <p className="text-sm text-gray-600 mb-4">
                To display the heatmap, please enter your Mapbox public token. You can get one from{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-brand-sage hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.your_token_here..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleTokenSubmit()}
              />
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
            
            <Button 
              onClick={handleTokenSubmit}
              className="w-full bg-brand-sage hover:bg-brand-sage/90"
            >
              Initialize Heatmap
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">Geographic Distribution Heatmap</h3>
      
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <Button
          onClick={() => setView('distribution')}
          variant={view === 'distribution' ? 'default' : 'outline'}
          className={view === 'distribution' ? 'bg-brand-sage hover:bg-brand-sage/90' : ''}
        >
          Distribution
        </Button>
        <Button
          onClick={() => setView('availability')}
          variant={view === 'availability' ? 'default' : 'outline'}
          className={view === 'availability' ? 'bg-brand-sage hover:bg-brand-sage/90' : ''}
        >
          Availability
        </Button>
      </div>

      {/* Date Slider for Availability View */}
      {view === 'availability' && (
        <div className="mb-4 p-4 bg-brand-light rounded-lg">
          <div className="text-center mb-2">
            <input
              type="range"
              min={0}
              max={dateList.length - 1}
              step={1}
              value={dateIndex}
              onChange={(e) => setDateIndex(Number(e.target.value))}
              className="w-full max-w-md"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            Showing availability for: <strong>{selectedDate}</strong>
          </div>
        </div>
      )}

      {/* Map Area */}
      <div className="w-full h-96 rounded-lg overflow-hidden">
        {view === 'distribution' ? (
          <DistributionMap mapboxToken={token} />
        ) : (
          <AvailabilityMap selectedDate={selectedDate} mapboxToken={token} />
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center">
        <div className="bg-brand-light p-3 rounded-lg">
          <h4 className="text-sm font-semibold text-brand-navy mb-2 text-center">
            {view === 'distribution' ? 'Distribution Intensity' : 'Availability Intensity'}
          </h4>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-600">Low</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FEEEE2' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FBB4AE' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F768A1' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#C51B8A' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#7A0177' }}></div>
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#49006A' }}></div>
            </div>
            <span className="text-xs text-gray-600">High</span>
          </div>
        </div>
      </div>
    </div>
  );
}
