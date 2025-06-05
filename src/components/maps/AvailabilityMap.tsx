//////////////////////////////////////
// empty map with no points showing
//////////////////////////////////////

// src/components/maps/AvailabilityMap.tsx

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


//////////////////////////////////////
// heat map design
//////////////////////////////////////


// src/components/AvailabilityMap.tsx

// import React, { useState, useMemo } from 'react';
// import DeckGL from '@deck.gl/react';
// import { HeatmapLayer } from '@deck.gl/aggregation-layers';
// import { Map } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { availabilityData, AvailabilityRecord, AvailabilityPoint } from '../../data/availabilityData';
// import type { MapViewState } from '@deck.gl/core';

// const INITIAL_VIEW_STATE: MapViewState = {
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
//   const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);

//   // Find the record matching selectedDate
//   const recordForDate = useMemo<AvailabilityRecord | undefined>(() => {
//     return availabilityData.find((rec) => rec.date === selectedDate);
//   }, [selectedDate]);

//   // Extract points array (or empty if no record)
//   const points: AvailabilityPoint[] = recordForDate ? recordForDate.values : [];

//   // Build a DeckGL HeatmapLayer from those points
//   const heatmapLayer = useMemo(() => {
//     return new HeatmapLayer<AvailabilityPoint>({
//       id: 'availability-heatmap',
//       data: points,
//       getPosition: (d) => [d.lng, d.lat],
//       getWeight: (d) => d.value,
//       radiusPixels: 60,
//       intensity: 1,
//       threshold: 0.1,
//     });
//   }, [points]);

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
//         <p className="text-sm text-gray-600">Availability Map for {selectedDate}</p>
//       </div>
//     </div>
//   );
// }

//////////////////////////////////////
// Scatter plot design
//////////////////////////////////////

// import React, { useState, useMemo } from 'react';
// import { DeckGL } from '@deck.gl/react';
// import { ScatterplotLayer } from '@deck.gl/layers';
// import { Map } from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { availabilityData } from '../../data/availabilityData';
// import { coordinates } from '../../data/coordinates';
// import { getIntensityColor } from '../../utils/colorScaleAvail';

// const INITIAL_VIEW_STATE = {
//   longitude: 55.3,
//   latitude: 25.2,
//   zoom: 9,
//   pitch: 0,
//   bearing: 0,
// };

// interface AvailabilityMapProps {
//   selectedDate: string;
// }

// interface DataPoint {
//   position: [number, number];
//   value: number;
// }

// export default function AvailabilityMap({ selectedDate }: AvailabilityMapProps) {
//   const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

//   // Build data for exactly selectedDate
//   const data = useMemo(() => {
//     if (!selectedDate) return [];
//     const record = availabilityData.find((rec) => rec.date === selectedDate);
//     if (!record) return [];

//     return Object.entries(record.values)
//       .map(([locName, intensity]) => {
//         const coord = coordinates[locName];
//         if (!coord) return null;
//         return {
//           position: [coord.lng, coord.lat] as [number, number],
//           value: intensity, // 0–1
//         };
//       })
//       .filter((d): d is DataPoint => d !== null);
//   }, [selectedDate]);

//   const scatterLayer = useMemo(
//     () =>
//       new ScatterplotLayer({
//         id: 'availability-scatter-layer',
//         data,
//         pickable: true,
//         radiusUnits: 'meters',
//         getPosition: (d: DataPoint) => d.position,
//         getFillColor: (d: DataPoint) => getIntensityColor(d.value),
//         getRadius: 2000,
//         opacity: 0.8,
//         onHover: ({ object, x, y }) => {
//           /* 
//             object.value is the intensity at this location for selectedDate 
//             You could display a tooltip here if needed.
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
//           mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
//           style={{ position: 'absolute', width: '100%', height: '100%' }}
//         />
//       </DeckGL>
//     </div>
//   );
// }

//////////////////////////////////////
// Scatter plot design with hover
//////////////////////////////////////

import React, { useState, useMemo } from 'react';
import { DeckGL } from '@deck.gl/react';
import { ScatterplotLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { availabilityData } from '../../data/availabilityData';
import { coordinates } from '../../data/coordinates';
import { getIntensityColor } from '../../utils/colorScaleAvail';

const INITIAL_VIEW_STATE = {
  longitude: 55.3,
  latitude: 25.2,
  zoom: 9,
  pitch: 0,
  bearing: 0,
};

interface AvailabilityMapProps {
  selectedDate: string;
}

interface DataPoint {
  position: [number, number];
  value: number;
  location: string;
}

export default function AvailabilityMap({ selectedDate }: AvailabilityMapProps) {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [hoverInfo, setHoverInfo] = useState<{
    object: DataPoint;
    x: number;
    y: number;
  } | null>(null);

  // Build data for exactly selectedDate
  const data = useMemo(() => {
    if (!selectedDate) return [];
    const record = availabilityData.find((rec) => rec.date === selectedDate);
    if (!record) return [];

    return Object.entries(record.values)
      .map(([locName, intensity]) => {
        const coord = coordinates[locName];
        if (!coord) return null;
        return {
          position: [coord.lng, coord.lat] as [number, number],
          value: intensity, // 0–1
          location: locName,
        };
      })
      .filter((d): d is DataPoint => d !== null);
  }, [selectedDate]);

  const scatterLayer = useMemo(
    () =>
      new ScatterplotLayer({
        id: 'availability-scatter-layer',
        data,
        pickable: true,
        radiusUnits: 'meters',
        getPosition: (d: DataPoint) => d.position,
        getFillColor: (d: DataPoint) => getIntensityColor(d.value),
        getRadius: 2000,
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