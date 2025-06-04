
import React, { useState } from 'react';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_VIEW_STATE = {
  longitude: 55.3,
  latitude: 25.2,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

interface AvailabilityMapProps {
  selectedDate: string;
  mapboxToken: string;
}

export default function AvailabilityMap({ selectedDate, mapboxToken }: AvailabilityMapProps) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Map
        {...viewState}
        onMove={({ viewState: vs }) => setViewState(vs)}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={mapboxToken}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded shadow">
        <p className="text-sm text-gray-600">Availability Map for {selectedDate}</p>
        <p className="text-xs text-gray-500">Heatmap visualization coming soon</p>
      </div>
    </div>
  );
}
