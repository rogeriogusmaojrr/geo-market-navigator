
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Check, Layers } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// This is just for demo purposes - in a real application, you would use environment variables
// and proper API key management
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2xidHZ1NGExMDJyajNwcGRhZGg4dTZmbCJ9.VCT8M9S9F0z1fQArY5gM2g';

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  showLayerControls?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ 
  center = [-74.5, 40], 
  zoom = 4,
  showLayerControls = true, 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [layersVisible, setLayersVisible] = useState({
    sales: true,
    stores: true,
    territories: true,
    heatmap: false,
  });

  useEffect(() => {
    if (!mapContainer.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: center,
      zoom: zoom,
      attributionControl: false,
    });

    // Add custom controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
    map.current.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Add dummy markers for demo
    const addDummyMarkers = () => {
      if (!map.current) return;
      
      // Add store locations (random positions around initial center)
      for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#1E88E5';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 0 2px rgba(0,0,0,0.1)';
        
        const lat = center[1] + (Math.random() * 10 - 5);
        const lng = center[0] + (Math.random() * 10 - 5);
        
        new mapboxgl.Marker(el)
          .setLngLat([lng, lat])
          .addTo(map.current);
      }
    };

    // Set up map layers after style is loaded
    map.current.on('load', () => {
      addDummyMarkers();
      
      // For a real application, you would add GeoJSON layers from your API
      // This is just a placeholder example
      map.current?.addSource('territories', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'North Region', sales: 1250000 },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-76, 41], [-74, 41], [-74, 43], [-76, 43], [-76, 41]
                ]]
              }
            },
            {
              type: 'Feature',
              properties: { name: 'South Region', sales: 980000 },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-76, 38], [-74, 38], [-74, 40], [-76, 40], [-76, 38]
                ]]
              }
            }
          ]
        }
      });

      map.current?.addLayer({
        id: 'territories-fill',
        type: 'fill',
        source: 'territories',
        paint: {
          'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'sales'],
            500000, '#C5E1A5',
            1000000, '#66BB6A',
            1500000, '#2E7D32'
          ],
          'fill-opacity': 0.6
        }
      });

      map.current?.addLayer({
        id: 'territories-line',
        type: 'line',
        source: 'territories',
        paint: {
          'line-color': '#388E3C',
          'line-width': 1
        }
      });
    });

    // Cleanup function
    return () => {
      map.current?.remove();
    };
  }, [center, zoom]);

  // Toggle layer visibility based on checkbox state
  useEffect(() => {
    if (!map.current) return;
    
    // Example of how you would toggle real layers
    // In a full application, replace with your actual layer IDs
    const layers = {
      'territories-fill': layersVisible.territories,
      'territories-line': layersVisible.territories,
      // Add other layers here
    };

    map.current.once('idle', () => {
      Object.entries(layers).forEach(([layerId, isVisible]) => {
        if (map.current?.getLayer(layerId)) {
          const visibility = isVisible ? 'visible' : 'none';
          map.current.setLayoutProperty(layerId, 'visibility', visibility);
        }
      });
    });
  }, [layersVisible]);

  const toggleLayer = (layerName: keyof typeof layersVisible) => {
    setLayersVisible(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-md" />

      {/* Layer controls */}
      {showLayerControls && (
        <Card className="absolute top-3 right-3 z-10 w-64 shadow-md">
          <CardHeader className="py-3 px-4">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Layers size={16} /> Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="py-2 px-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sales-layer" 
                  checked={layersVisible.sales}
                  onCheckedChange={() => toggleLayer('sales')}
                />
                <Label htmlFor="sales-layer" className="text-sm">Sales Data</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="stores-layer" 
                  checked={layersVisible.stores}
                  onCheckedChange={() => toggleLayer('stores')}
                />
                <Label htmlFor="stores-layer" className="text-sm">Store Locations</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="territories-layer" 
                  checked={layersVisible.territories}
                  onCheckedChange={() => toggleLayer('territories')}
                />
                <Label htmlFor="territories-layer" className="text-sm">Sales Territories</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="heatmap-layer" 
                  checked={layersVisible.heatmap}
                  onCheckedChange={() => toggleLayer('heatmap')}
                />
                <Label htmlFor="heatmap-layer" className="text-sm">Performance Heatmap</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MapComponent;
