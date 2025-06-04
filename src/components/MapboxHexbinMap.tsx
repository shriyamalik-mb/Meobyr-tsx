
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MapboxHexbinMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [token, setToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [error, setError] = useState('');

  const handleTokenSubmit = () => {
    if (!token.trim()) {
      setError('Please enter a valid Mapbox token');
      return;
    }
    
    // Validate token format (Mapbox tokens start with 'pk.')
    if (!token.startsWith('pk.')) {
      setError('Invalid token format. Mapbox tokens should start with "pk."');
      return;
    }
    
    setError('');
    setIsTokenSet(true);
  };

  useEffect(() => {
    if (!isTokenSet || map.current) return;
    
    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [-74.5, 40],
        zoom: 9
      });

      // Add navigation control (the +/- zoom buttons)
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    } catch (err) {
      setError('Failed to initialize map. Please check your token.');
      setIsTokenSet(false);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isTokenSet, token]);

  if (!isTokenSet) {
    return (
      <div className="w-full h-96 bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-brand-navy mb-2">Mapbox Configuration Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              To display the map, please enter your Mapbox public token. You can get one from{' '}
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
            Initialize Map
          </Button>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-96 rounded-lg shadow-md" />;
};

export default MapboxHexbinMap;
