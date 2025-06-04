
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface MapControlsProps {
  view: 'distribution' | 'availability';
  onViewChange: (view: 'distribution' | 'availability') => void;
  dateIndex: number[];
  onDateIndexChange: (value: number[]) => void;
  dateList: string[];
  selectedDate: string;
}

export default function MapControls({
  view,
  onViewChange,
  dateIndex,
  onDateIndexChange,
  dateList,
  selectedDate
}: MapControlsProps) {
  return (
    <>
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <Button
          onClick={() => onViewChange('distribution')}
          variant={view === 'distribution' ? 'default' : 'outline'}
          className={view === 'distribution' ? 'bg-brand-sage hover:bg-brand-sage/90' : ''}
        >
          Distribution
        </Button>
        <Button
          onClick={() => onViewChange('availability')}
          variant={view === 'availability' ? 'default' : 'outline'}
          className={view === 'availability' ? 'bg-brand-sage hover:bg-brand-sage/90' : ''}
        >
          Availability
        </Button>
      </div>

      {/* Date Slider for Availability View */}
      {view === 'availability' && (
        <div className="mb-4 p-4 bg-brand-light rounded-lg">
          <div className="mb-2">
            <Slider
              value={dateIndex}
              onValueChange={onDateIndexChange}
              max={dateList.length - 1}
              min={0}
              step={1}
              className="w-full"
            />
          </div>
          <div className="text-center text-sm text-gray-600">
            Showing availability for: <strong>{selectedDate || 'No date selected'}</strong>
          </div>
        </div>
      )}
    </>
  );
}
