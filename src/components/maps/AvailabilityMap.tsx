
// import React, { useState } from 'react';
// import { Map } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const INITIAL_VIEW_STATE = {
//   longitude: 55.3,
//   latitude: 25.2,
//   zoom: 9,
//   pitch: 0,
//   bearing: 0,
// };

// interface AvailabilityMapProps {
//   selectedDate: string;
//   mapboxToken: string;
// }

// export default function AvailabilityMap({ selectedDate, mapboxToken }: AvailabilityMapProps) {
//   const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//       <Map
//         {...viewState}
//         onMove={({ viewState: vs }) => setViewState(vs)}
//         mapStyle="mapbox://styles/mapbox/light-v11"
//         mapboxAccessToken={mapboxToken}
//         style={{ position: 'absolute', width: '100%', height: '100%' }}
//       />
//       <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded shadow">
//         <p className="text-sm text-gray-600">Availability Map for {selectedDate}</p>
//         <p className="text-xs text-gray-500">Heatmap visualization coming soon</p>
//       </div>
//     </div>
//   );
// }

// src/components/AvailabilityMap.tsx
import React, { useState, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { availabilityData, AvailabilityRecord, AvailabilityPoint } from '../../data/availabilityData';
import type { MapViewState } from '@deck.gl/core';

const INITIAL_VIEW_STATE: MapViewState = {
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
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  // Find the record matching selectedDate
  const recordForDate = useMemo<AvailabilityRecord | undefined>(() => {
    return availabilityData.find((rec) => rec.date === selectedDate);
  }, [selectedDate]);

  // Extract points array (or empty if no record)
  const points: AvailabilityPoint[] = recordForDate ? recordForDate.values : [];

  // Build a DeckGL HeatmapLayer from those points
  const heatmapLayer = useMemo(() => {
    return new HeatmapLayer<AvailabilityPoint>({
      id: 'availability-heatmap',
      data: points,
      getPosition: (d) => [d.lng, d.lat],
      getWeight: (d) => d.value,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.1,
    });
  }, [points]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        viewState={viewState}
        controller={true}
        layers={[heatmapLayer]}
        onViewStateChange={({ viewState: newViewState }) => setViewState(newViewState)}
      >
        <Map
          viewState={viewState}
          onMove={({ viewState: newViewState }) => setViewState(newViewState)}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={mapboxToken}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      </DeckGL>

      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded shadow">
        <p className="text-sm text-gray-600">Availability Map for {selectedDate}</p>
      </div>
    </div>
  );
}