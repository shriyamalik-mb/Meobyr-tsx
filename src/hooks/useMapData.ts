
import { useMemo } from 'react';
import { distributionData, DistributionPoint } from '../data/distributionData';
import { availabilityData, AvailabilityRecord } from '../data/availabilityData';
import { coordinates, LatLng } from '../data/coordinates';
import { getIntensityColor } from '../utils/colorScale';

export interface ExtendedDistributionPoint extends DistributionPoint {
  color: [number, number, number, number];
  locationName?: string;
}

export interface AvailabilityPoint {
  lat: number;
  lng: number;
  value: number;
  color: [number, number, number, number];
  locationName: string;
}

export const useMapData = (view: 'distribution' | 'availability', selectedDate: string) => {
  // Get sorted dates for availability data
  const dateList = useMemo(() => {
    const allDates = availabilityData.map((rec: AvailabilityRecord) => rec.date);
    const unique = Array.from(new Set(allDates));
    unique.sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime());
    return unique;
  }, []);

  // Prepare distribution data
  const distributionPoints = useMemo((): ExtendedDistributionPoint[] => {
    return distributionData.map((point: DistributionPoint) => ({
      ...point,
      color: getIntensityColor(point.value),
    }));
  }, []);

  // Prepare availability data for selected date
  const availabilityPoints = useMemo((): AvailabilityPoint[] => {
    if (!selectedDate) return [];
    
    const record = availabilityData.find((rec: AvailabilityRecord) => rec.date === selectedDate);
    if (!record) return [];

    return Object.entries(record.values)
      .map(([locationName, intensity]: [string, number]) => {
        const coord: LatLng | undefined = coordinates[locationName];
        if (!coord || typeof intensity !== 'number') return null;
        
        return {
          lat: coord.lat,
          lng: coord.lng,
          value: intensity,
          color: getIntensityColor(intensity),
          locationName,
        };
      })
      .filter((point): point is AvailabilityPoint => point !== null);
  }, [selectedDate]);

  const currentPoints: (ExtendedDistributionPoint | AvailabilityPoint)[] = 
    view === 'distribution' ? distributionPoints : availabilityPoints;

  return {
    dateList,
    distributionPoints,
    availabilityPoints,
    currentPoints
  };
};
