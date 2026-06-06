'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { regions, zoneHealthData } from '@/lib/data';
import { useWellnessStore } from '@/lib/store';
import ethiopiaGeoJSON from '@/lib/ethiopia-region.json';

if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

function getColorByDiseaseCount(diseaseCount: number) {
  if (diseaseCount <= 2) return { color: '#fda4af', fillColor: '#fda4af', fillOpacity: 0.5, weight: 1.5 };
  if (diseaseCount <= 3) return { color: '#fb7185', fillColor: '#fb7185', fillOpacity: 0.6, weight: 2 };
  if (diseaseCount <= 4) return { color: '#f43f5e', fillColor: '#f43f5e', fillOpacity: 0.7, weight: 2.5 };
  if (diseaseCount <= 5) return { color: '#be123c', fillColor: '#be123c', fillOpacity: 0.8, weight: 3 };
  return { color: '#881337', fillColor: '#881337', fillOpacity: 0.9, weight: 3.5 };
}

const normalizeString = (str: string) => str.toLowerCase().replace(/[-\s]/g, '');

export default function EthiopiaMap() {
  const { selectedRegion, setSelectedRegion, setSelectedZone } = useWellnessStore();
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
    <div className="h-full flex flex-col gap-4">
      <div className="bg-card/90 backdrop-blur rounded-lg border border-border p-3 shadow-md text-xs">
        <h3 className="font-semibold text-foreground mb-2">Zone Risk Level (by Disease Count)</h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-pink-300" style={{ backgroundColor: '#fda4af' }}></div>
            <span>Low (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-rose-400" style={{ backgroundColor: '#fb7185' }}></div>
            <span>Medium (3)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-rose-500" style={{ backgroundColor: '#f43f5e' }}></div>
            <span>High (4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-rose-700" style={{ backgroundColor: '#be123c' }}></div>
            <span>Very High (5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border border-rose-900" style={{ backgroundColor: '#881337' }}></div>
            <span>Extreme (6+)</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-card/80 backdrop-blur rounded-lg border border-border shadow-sm overflow-hidden">
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
            data={ethiopiaGeoJSON as any}
            style={(feature: any) => {
              const shapeName = feature.properties?.shapeName || '';
              const zoneData = zoneHealthData[shapeName];
              if (zoneData) {
                const diseaseCount = zoneData.risks.length;
                return getColorByDiseaseCount(diseaseCount);
              }
              return { color: '#84cc16', fillColor: '#84cc16', weight: 1.5, fillOpacity: 0.2 };
            }}
            onEachFeature={(feature: any, layer: any) => {
              const shapeName = feature.properties?.shapeName || '';
              const zoneData = zoneHealthData[shapeName];
              if (zoneData) {
                const diseaseCount = zoneData.risks.length;
                layer.on('click', () => {
                  const normalizedParentRegion = normalizeString(zoneData.parentRegion);
                  const region = regions.find(r =>
                    normalizeString(r.name) === normalizedParentRegion ||
                    normalizeString(r.id) === normalizedParentRegion
                  );
                  if (region) setSelectedRegion(region.id);
                  setSelectedZone(shapeName);
                });
                layer.bindPopup(`
                  <div class="p-2 font-sans min-w-[200px]">
                    <h3 class="font-bold text-lg mb-1">${zoneData.displayName}</h3>
                    <p class="text-sm text-gray-600 mb-2">${zoneData.parentRegion} Region</p>
                    <div class="mt-2">
                      <p class="text-xs font-semibold text-gray-700 mb-1">
                        Total Health Risks: <span class="text-rose-600">${diseaseCount}</span>
                      </p>
                      <p class="text-xs text-gray-600">
                        Top Risks: ${zoneData.risks.slice(0, 2).map(r => r.name).join(', ')}
                      </p>
                    </div>
                  </div>
                `);
              }
            }}
          />
        </MapContainer>
      </div>
    </div>
  );
}