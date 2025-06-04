
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

// interface DistributionMapProps {
//   mapboxToken: string;
// }

// export default function DistributionMap({ mapboxToken }: DistributionMapProps) {
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
//         <p className="text-sm text-gray-600">Distribution Map - Heatmap visualization coming soon</p>
//       </div>
//     </div>
//   );
// }

// src/components/DistributionMap.tsx

import React, { useState, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { distributionData, DistributionPoint } from '../../data/distributionData';
import type { MapViewState } from '@deck.gl/core';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 55.3,
  latitude: 25.2,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

interface DistributionMapProps {
  mapboxToken: string;
}

export default function DistributionMap({ mapboxToken }: DistributionMapProps) {
  const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

  const heatmapLayer = useMemo(() => {
    return new HeatmapLayer<DistributionPoint>({
      id: 'distribution-heatmap',
      data: distributionData,
      getPosition: (d) => [d.lng, d.lat],
      getWeight: (d) => d.value,
      radiusPixels: 60,
      intensity: 1,
      threshold: 0.1,
    });
  }, []);

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
        <p className="text-sm text-gray-600">Distribution Heatmap</p>
      </div>
    </div>
  );
}