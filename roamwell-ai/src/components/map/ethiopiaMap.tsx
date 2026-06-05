'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { regions } from '@/lib/data';
import { useWellnessStore } from '@/lib/store';

// Fix Leaflet default icon issue in Next.js
if (typeof window !== 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

// Use `as const` to make TypeScript infer literal types for the GeoJSON structure
const ethiopiaGeoJSON = {
  type: 'FeatureCollection' as const,
  features: [
    { type: 'Feature' as const, properties: { name: 'Addis Ababa', regionId: 'addis-ababa' }, geometry: { type: 'Polygon' as const, coordinates: [[[38.6, 8.9], [38.9, 8.9], [38.9, 9.2], [38.6, 9.2], [38.6, 8.9]]] } },
    { type: 'Feature' as const, properties: { name: 'Oromia', regionId: 'oromia' }, geometry: { type: 'Polygon' as const, coordinates: [[[36.0, 6.5], [40.0, 6.5], [40.0, 10.0], [36.0, 10.0], [36.0, 6.5]]] } },
    { type: 'Feature' as const, properties: { name: 'Amhara', regionId: 'amhara' }, geometry: { type: 'Polygon' as const, coordinates: [[[36.5, 10.0], [39.5, 10.0], [39.5, 13.0], [36.5, 13.0], [36.5, 10.0]]] } },
    { type: 'Feature' as const, properties: { name: 'Tigray', regionId: 'tigray' }, geometry: { type: 'Polygon' as const, coordinates: [[[37.0, 13.0], [39.5, 13.0], [39.5, 15.0], [37.0, 15.0], [37.0, 13.0]]] } },
    { type: 'Feature' as const, properties: { name: 'Afar', regionId: 'afar' }, geometry: { type: 'Polygon' as const, coordinates: [[[39.5, 10.0], [42.0, 10.0], [42.0, 13.0], [39.5, 13.0], [39.5, 10.0]]] } },
    { type: 'Feature' as const, properties: { name: 'Somali', regionId: 'somali' }, geometry: { type: 'Polygon' as const, coordinates: [[[40.0, 6.5], [44.0, 6.5], [44.0, 10.0], [40.0, 10.0], [40.0, 6.5]]] } },
    { type: 'Feature' as const, properties: { name: 'SNNPR', regionId: 'snnpr' }, geometry: { type: 'Polygon' as const, coordinates: [[[35.0, 6.5], [38.0, 6.5], [38.0, 8.5], [35.0, 8.5], [35.0, 6.5]]] } },
    { type: 'Feature' as const, properties: { name: 'Gambella', regionId: 'gambella' }, geometry: { type: 'Polygon' as const, coordinates: [[[33.5, 7.0], [35.0, 7.0], [35.0, 9.0], [33.5, 9.0], [33.5, 7.0]]] } },
    { type: 'Feature' as const, properties: { name: 'Sidama', regionId: 'sidama' }, geometry: { type: 'Polygon' as const, coordinates: [[[37.5, 6.5], [38.5, 6.5], [38.5, 7.5], [37.5, 7.5], [37.5, 6.5]]] } },
  ],
} as const;

export default function EthiopiaMap() {
  const { selectedRegion, setSelectedRegion } = useWellnessStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground rounded-lg">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-border shadow-lg z-0">
      <MapContainer
        center={[9.0, 39.0]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        key="ethiopia-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={ethiopiaGeoJSON}
          style={(feature) => {
            const regionId = feature?.properties?.regionId;
            const isSelected = selectedRegion === regionId;
            return {
              color: isSelected ? '#16a34a' : '#84cc16',
              weight: isSelected ? 3 : 1.5,
              fillOpacity: isSelected ? 0.4 : 0.2,
              fillColor: isSelected ? '#16a34a' : '#84cc16',
            };
          }}
          onEachFeature={(feature, layer) => {
            const regionId = feature.properties?.regionId;
            const region = regions.find((r) => r.id === regionId);
            if (region) {
              layer.on('click', () => setSelectedRegion(regionId));
              layer.bindPopup(`
                <div class="p-2 font-sans">
                  <h3 class="font-bold text-lg">${region.name}</h3>
                  <p class="text-sm text-gray-600 mb-2">${region.amharicName || ''}</p>
                  <p class="text-xs font-semibold text-gray-700">Top Risks: ${region.risks.slice(0, 2).map(r => r.name).join(', ')}</p>
                </div>
              `);
            }
          }}
        />
      </MapContainer>
    </div>
  );
}