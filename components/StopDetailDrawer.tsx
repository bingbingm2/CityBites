'use client';

import { Stop, Restaurant, Dish } from '@/lib/types';
import { useState } from 'react';

interface Props {
  stop: Stop;
  restaurant: Restaurant;
  onLog: (restaurantId: string, dishNames: string[]) => void;
  isLogged: boolean;
}

export default function StopDetailDrawer({ stop, restaurant, onLog, isLogged }: Props) {
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [showLogSuccess, setShowLogSuccess] = useState(false);

  const toggleDish = (name: string) => {
    setSelectedDishes((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const handleLog = () => {
    if (selectedDishes.length === 0) return;
    onLog(restaurant.id, selectedDishes);
    setShowLogSuccess(true);
    setTimeout(() => setShowLogSuccess(false), 3000);
  };

  return (
    <div className="card animate-slide-in-right" style={{ padding: '24px' }}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold">{restaurant.name}</h3>
          {isLogged && (
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: 'rgba(32, 212, 162, 0.1)',
                color: 'var(--accent-teal)',
                border: '1px solid rgba(32, 212, 162, 0.2)',
              }}
            >
              ✓ Logged
            </span>
          )}
        </div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {restaurant.neighborhood} · {restaurant.address}
        </p>
      </div>

      {/* Why This Stop */}
      <div
        className="p-3 rounded-xl mb-4"
        style={{
          background: 'rgba(255, 107, 53, 0.05)',
          border: '1px solid rgba(255, 107, 53, 0.1)',
        }}
      >
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {stop.whyThisStop}
        </p>
      </div>

      {/* Signature Dishes */}
      <h4 className="text-sm font-semibold mb-3">🌟 Signature Dishes</h4>
      <div className="space-y-3 mb-6">
        {stop.signatureDishes.map((dish: Dish, i: number) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden transition-all duration-200"
            style={{
              background: 'var(--bg-secondary)',
              border: selectedDishes.includes(dish.name)
                ? '1px solid var(--accent-primary)'
                : '1px solid var(--border-subtle)',
            }}
          >
            {/* Dish Image */}
            {dish.imageUrl && (
              <div className="relative h-32 overflow-hidden">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {dish.price && (
                  <span
                    className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background: 'rgba(0,0,0,0.7)',
                      color: 'var(--accent-warm)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {dish.price}
                  </span>
                )}
              </div>
            )}

            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h5 className="font-semibold text-sm">{dish.name}</h5>
                {!dish.imageUrl && dish.price && (
                  <span className="text-xs font-medium" style={{ color: 'var(--accent-warm)' }}>
                    {dish.price}
                  </span>
                )}
              </div>

              {dish.explanation && (
                <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {dish.explanation}
                </p>
              )}

              {dish.whyCityUnique && (
                <div
                  className="text-xs p-2 rounded-lg mb-2"
                  style={{
                    background: 'rgba(123, 104, 238, 0.08)',
                    color: 'var(--accent-cool)',
                  }}
                >
                  🏙️ {dish.whyCityUnique}
                </div>
              )}

              {dish.orderingTip && (
                <div className="text-xs" style={{ color: 'var(--accent-warm)' }}>
                  💡 {dish.orderingTip}
                </div>
              )}

              {/* Log checkbox */}
              {!isLogged && (
                <button
                  className="mt-2 text-xs px-3 py-1.5 rounded-full transition-all"
                  style={{
                    background: selectedDishes.includes(dish.name)
                      ? 'var(--accent-primary)'
                      : 'var(--bg-card)',
                    color: selectedDishes.includes(dish.name)
                      ? 'white'
                      : 'var(--text-secondary)',
                    border: `1px solid ${
                      selectedDishes.includes(dish.name)
                        ? 'var(--accent-primary)'
                        : 'var(--border-subtle)'
                    }`,
                  }}
                  onClick={() => toggleDish(dish.name)}
                >
                  {selectedDishes.includes(dish.name) ? '✓ Selected' : '+ I ate this'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Log Button */}
      {!isLogged && (
        <button
          className="btn-primary w-full justify-center"
          onClick={handleLog}
          disabled={selectedDishes.length === 0}
          style={{
            opacity: selectedDishes.length === 0 ? 0.5 : 1,
            cursor: selectedDishes.length === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          📝 Log {selectedDishes.length} dish{selectedDishes.length !== 1 ? 'es' : ''} to my journey
        </button>
      )}

      {showLogSuccess && (
        <div
          className="mt-3 p-3 rounded-xl text-center text-sm animate-fade-in"
          style={{
            background: 'rgba(32, 212, 162, 0.1)',
            border: '1px solid rgba(32, 212, 162, 0.2)',
            color: 'var(--accent-teal)',
          }}
        >
          ✓ Dishes logged! Your taste level may have updated.
        </div>
      )}
    </div>
  );
}
