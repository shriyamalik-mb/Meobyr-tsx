
import React from 'react';
import { useMap } from 'react-map-gl';
import { ExtendedDistributionPoint, AvailabilityPoint } from '../../hooks/useMapData';

interface DataPointsOverlayProps {
  points: (ExtendedDistributionPoint | AvailabilityPoint)[];
}

export default function DataPointsOverlay({ points }: DataPointsOverlayProps) {
  const { current: map } = useMap();

  if (!map) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {points.map((point, index) => {
        // Use mapbox's project method to convert lat/lng to screen coordinates
        const projected = map.project([point.lng, point.lat]);
        
        const rgba = point.color;
        const color = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] / 255})`;
        
        const locationName = 'locationName' in point ? point.locationName : 'Location';
        
        return (
          <div
            key={`${point.lat}-${point.lng}-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-auto"
            style={{
              left: `${projected.x}px`,
              top: `${projected.y}px`,
              width: '16px',
              height: '16px',
              backgroundColor: color,
              border: '2px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            title={`${locationName}: ${point.value.toFixed(2)}`}
          />
        );
      })}
    </div>
  );
}
