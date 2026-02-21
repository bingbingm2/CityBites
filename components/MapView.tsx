'use client';

import { useEffect, useState } from 'react';
import { Restaurant, Stop } from '@/lib/types';

interface Props {
  restaurants: Restaurant[];
  stops: Stop[];
  selectedStopId?: string;
}

export default function MapView({ restaurants, stops, selectedStopId }: Props) {
  const [MapComponent, setMapComponent] = useState<React.ComponentType<Props> | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues with Leaflet
    import('./MapViewClient').then((mod) => {
      setMapComponent(() => mod.default);
    });
  }, []);

  if (!MapComponent) {
    return (
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{
          height: '400px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="text-center">
          <div className="text-3xl mb-2">🗺️</div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Loading map...
          </p>
        </div>
      </div>
    );
  }

  return <MapComponent restaurants={restaurants} stops={stops} selectedStopId={selectedStopId} />;
}
