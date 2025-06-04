
import React, { useState } from 'react';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapData } from '../hooks/useMapData';
import MapControls from './maps/MapControls';
import MapLegend from './maps/MapLegend';
import DataPointsOverlay from './maps/DataPointsOverlay';

const INITIAL_VIEW_STATE = {
  longitude: 55.3,
  latitude: 25.2,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

interface ScatterMapProps {
  mapboxToken: string;
}

export default function ScatterMap({ mapboxToken }: ScatterMapProps) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [view, setView] = useState<'distribution' | 'availability'>('distribution');
  const [dateIndex, setDateIndex] = useState([0]);
  
  // First get the dateList and then determine the selected date
  const { dateList, currentPoints } = useMapData(view, '');
  const selectedDate: string = dateList[dateIndex[0]] || '';
  
  // Now get the actual data with the selected date
  const { currentPoints: actualPoints } = useMapData(view, selectedDate);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-4">Geographic Distribution Map</h3>
      
      <MapControls
        view={view}
        onViewChange={setView}
        dateIndex={dateIndex}
        onDateIndexChange={setDateIndex}
        dateList={dateList}
        selectedDate={selectedDate}
      />

      {/* Map Container */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Map
          {...viewState}
          onMove={({ viewState: vs }) => setViewState(vs)}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={mapboxToken}
          style={{ width: '100%', height: '100%' }}
        >
          <DataPointsOverlay points={actualPoints} />
        </Map>
      </div>

      <MapLegend view={view} />
    </div>
  );
}
