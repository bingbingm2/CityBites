'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Restaurant, Stop } from '@/lib/types';

interface Props {
  restaurants: Restaurant[];
  stops: Stop[];
  selectedStopId?: string;
}

export default function MapViewClient({ restaurants, stops, selectedStopId }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || restaurants.length === 0) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Create map
    const map = L.map(mapRef.current, {
      zoomControl: true,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Tile layer (dark theme)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Get stop restaurant IDs for ordering
    const stopRestaurantIds = stops.map((s) => s.restaurantId);

    // Add markers for each restaurant
    const markers: L.Marker[] = [];
    restaurants.forEach((restaurant) => {
      const stopIndex = stopRestaurantIds.indexOf(restaurant.id);
      const isStop = stopIndex !== -1;
      const isSelected = restaurant.id === selectedStopId;

      // Create custom icon
      const iconHtml = `
        <div style="
          width: ${isSelected ? '36px' : '28px'};
          height: ${isSelected ? '36px' : '28px'};
          border-radius: 50%;
          background: ${isSelected ? 'linear-gradient(135deg, #ff6b35, #e85d26)' : isStop ? '#ff6b35' : '#6b6b80'};
          border: 2px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.3)'};
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: ${isSelected ? '14px' : '11px'};
          font-weight: bold;
          box-shadow: ${isSelected ? '0 0 20px rgba(255, 107, 53, 0.5)' : '0 2px 8px rgba(0,0,0,0.3)'};
          transition: all 0.3s;
        ">
          ${isStop ? stopIndex + 1 : '•'}
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
        className: '',
      });

      const marker = L.marker([restaurant.lat, restaurant.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: system-ui; min-width: 150px;">
            <strong style="font-size: 14px;">${restaurant.name}</strong>
            <div style="font-size: 12px; opacity: 0.7; margin-top: 4px;">${restaurant.neighborhood}</div>
            <div style="font-size: 12px; opacity: 0.7; margin-top: 2px;">${restaurant.address}</div>
          </div>`,
          { className: 'custom-popup' }
        );

      markers.push(marker);
    });

    // Draw route polyline through stop locations
    if (stops.length > 1) {
      const routeCoords: [number, number][] = stops
        .map((stop) => {
          const r = restaurants.find((rest) => rest.id === stop.restaurantId);
          return r ? [r.lat, r.lng] as [number, number] : null;
        })
        .filter(Boolean) as [number, number][];

      L.polyline(routeCoords, {
        color: '#ff6b35',
        weight: 3,
        opacity: 0.6,
        dashArray: '10, 10',
      }).addTo(map);
    }

    // Fit bounds
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.15));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [restaurants, stops, selectedStopId]);

  return (
    <div
      ref={mapRef}
      className="rounded-2xl overflow-hidden"
      style={{
        height: '400px',
        border: '1px solid var(--border-subtle)',
      }}
    />
  );
}
