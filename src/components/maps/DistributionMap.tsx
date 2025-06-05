//////////////////////////////////////
// map with no points showing
//////////////////////////////////////
//src/components/maps/DistributionMap.tsx

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

//////////////////////////////////////
// heat map design
//////////////////////////////////////

// src/components/DistributionMap.tsx

// import React, { useState, useMemo } from 'react';
// import DeckGL from '@deck.gl/react';
// import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// import { Map } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { distributionData, DistributionPoint } from '../../data/distributionData';
// import type { ViewState } from '@deck.gl/core';

// const INITIAL_VIEW_STATE: ViewState = {
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
//   const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW_STATE);

//   const heatmapLayer = useMemo(() => {
//     return new HeatmapLayer<DistributionPoint>({
//       id: 'distribution-heatmap',
//       data: distributionData,
//       getPosition: (d) => [d.lng, d.lat],
//       getWeight: (d) => d.value,
//       radiusPixels: 60,
//       intensity: 1,
//       threshold: 0.1,
//     });
//   }, []);

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//       <DeckGL
//         viewState={viewState}
//         controller={true}
//         layers={[heatmapLayer]}
//         onViewStateChange={({ viewState: newViewState }) => setViewState(newViewState)}
//       >
//         <Map
//           viewState={viewState}
//           onMove={({ viewState: newViewState }) => setViewState(newViewState)}
//           mapStyle="mapbox://styles/mapbox/light-v11"
//           mapboxAccessToken={mapboxToken}
//           style={{ position: 'absolute', width: '100%', height: '100%' }}
//         />
//       </DeckGL>

//       <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-2 rounded shadow">
//         <p className="text-sm text-gray-600">Distribution Heatmap</p>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////
// scatter plot design
//////////////////////////////////////

// import React, { useState, useMemo } from 'react';
// import { DeckGL } from '@deck.gl/react';
// import { ScatterplotLayer } from '@deck.gl/layers';
// import { Map } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { distributionData } from '../../data/distributionData';
// import { getIntensityColor } from '../../utils/colorScaleAvail';

// const INITIAL_VIEW_STATE = {
//   longitude: 55.3,
//   latitude: 25.2,
//   zoom: 9,
//   pitch: 0,
//   bearing: 0,
// };

// interface DataPoint {
//   position: [number, number];
//   value: number;
// }

// export default function DistributionMap() {
//   const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

//   // Prepare data: each { position: [lng, lat], value }
//   const data = useMemo(
//     () =>
//       distributionData.map((pt) => ({
//         position: [pt.lng, pt.lat] as [number, number],
//         value: pt.value, // 0–1
//       })),
//     []
//   );

//   // ScatterplotLayer: flat circles, colored by value
//   const scatterLayer = useMemo(
//     () =>
//       new ScatterplotLayer({
//         id: 'distribution-scatter-layer',
//         data,
//         pickable: true,
//         radiusUnits: 'meters',
//         getPosition: (d: DataPoint) => d.position,
//         getFillColor: (d: DataPoint) => getIntensityColor(d.value),
//         getRadius: 2000, // 2 km radius each; adjust as needed
//         opacity: 0.8,
//         onHover: ({ object, x, y }) => {
//           /* 
//             object.value is the intensity; 
//             you could show a tooltip at (x, y) if desired.
//           */
//         },
//       }),
//     [data]
//   );

//   return (
//     <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//       <DeckGL
//         viewState={viewState}
//         onViewStateChange={({ viewState: vs }) => setViewState(vs)}
//         controller={true}
//         layers={[scatterLayer]}
//         style={{ position: 'absolute', width: '100%', height: '100%' }}
//       >
//         <Map
//           {...viewState}
//           onMove={({ viewState: vs }) => setViewState(vs)}
//           mapStyle="mapbox://styles/mapbox/light-v11"
//           mapboxAccessToken={ import.meta.env.VITE_MAPBOX_TOKEN}
//           style={{ position: 'absolute', width: '100%', height: '100%' }}
//         />
//       </DeckGL>
//     </div>
//   );
// }

//////////////////////////////////////
// scatter plot with hover
//////////////////////////////////////

import React, { useState, useMemo } from 'react';
import { DeckGL } from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { distributionData } from '../../data/distributionData';
import { getIntensityColor } from '../../utils/colorScaleAvail';

const INITIAL_VIEW_STATE = {
  longitude: 55.3,
  latitude: 25.2,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

interface DataPoint {
  position: [number, number];
  value: number;
  location: string;
}

export default function DistributionMap() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [hoverInfo, setHoverInfo] = useState<{
    object: DataPoint;
    x: number;
    y: number;
  } | null>(null);

  // Prepare data: each { position: [lng, lat], value }
  const data = useMemo(
    () =>
      distributionData.map((pt, index) => ({
        position: [pt.lng, pt.lat] as [number, number],
        value: pt.value, // 0–1
        location: pt.name || `Location ${index + 1}`, // Use pt.name if available, otherwise fallback
      })),
    []
  );

  // ScatterplotLayer: flat circles, colored by value
  const scatterLayer = useMemo(
    () =>
      new ScatterplotLayer({
        id: 'distribution-scatter-layer',
        data,
        pickable: true,
        radiusUnits: 'meters',
        getPosition: (d: DataPoint) => d.position,
        getFillColor: (d: DataPoint) => getIntensityColor(d.value),
        getRadius: 2000, // 2 km radius each; adjust as needed
        opacity: 0.8,
        onHover: ({ object, x, y }) => {
          setHoverInfo(object && x !== undefined && y !== undefined ? { object, x, y } : null);
        },
      }),
    [data]
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => setViewState(vs)}
        controller={true}
        layers={[scatterLayer]}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      >
        <Map
          {...viewState}
          onMove={({ viewState: vs }) => setViewState(vs)}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        />
      </DeckGL>
      
      {/* Hover Tooltip */}
      {hoverInfo && (
        <div
          style={{
            position: 'absolute',
            left: hoverInfo.x,
            top: hoverInfo.y,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            marginTop: '-8px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          <div><strong>{hoverInfo.object.location}</strong></div>
          <div>Intensity: {(hoverInfo.object.value * 100).toFixed(1)}%</div>
        </div>
      )}
    </div>
  );
}