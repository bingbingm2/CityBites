'use client';

import { Stop, Restaurant } from '@/lib/types';

const TYPE_ICONS: Record<string, string> = {
  coffee: '☕',
  snack: '🥨',
  brunch: '🥞',
  lunch: '🍝',
  'afternoon-tea': '🍰',
  dinner: '🍷',
  'late-bite': '🌙',
};

interface Props {
  stops: Stop[];
  restaurants: Restaurant[];
  onSelectStop: (stop: Stop) => void;
  selectedStopId?: string;
}

export default function TimelineView({ stops, restaurants, onSelectStop, selectedStopId }: Props) {
  return (
    <div className="space-y-0">
      {stops.map((stop, index) => {
        const restaurant = restaurants.find((r) => r.id === stop.restaurantId);
        const isSelected = selectedStopId === stop.restaurantId;
        const icon = TYPE_ICONS[stop.type] || '🍽️';

        return (
          <div key={index}>
            {/* Stop Card */}
            <div
              className="flex items-start gap-4 cursor-pointer transition-all duration-200 p-4 rounded-xl"
              style={{
                background: isSelected ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                border: isSelected
                  ? '1px solid rgba(255, 107, 53, 0.3)'
                  : '1px solid transparent',
              }}
              onClick={() => onSelectStop(stop)}
            >
              {/* Timeline Line & Dot */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                      : 'var(--bg-card)',
                    border: '2px solid',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  }}
                >
                  {icon}
                </div>
                {index < stops.length - 1 && (
                  <div
                    className="w-0.5 flex-1 min-h-[40px]"
                    style={{
                      background: 'linear-gradient(to bottom, var(--border-subtle), transparent)',
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                {/* Time Block */}
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {stop.timeBlock}
                  <span
                    className="ml-2 px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: 'rgba(255, 107, 53, 0.1)',
                      color: 'var(--accent-warm)',
                    }}
                  >
                    {stop.type.replace('-', ' ')}
                  </span>
                </div>

                {/* Restaurant Name */}
                <h4 className="font-semibold text-base mb-1">
                  {restaurant?.name || 'Unknown Restaurant'}
                </h4>

                {/* Why This Stop */}
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  {stop.whyThisStop}
                </p>

                {/* Signature Dishes Preview */}
                {stop.signatureDishes.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {stop.signatureDishes.slice(0, 3).map((dish, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {dish.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Walk Time */}
                {stop.walkToNextMins && (
                  <div
                    className="flex items-center gap-1 mt-2 text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    🚶 {stop.walkToNextMins} min walk to next stop
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
