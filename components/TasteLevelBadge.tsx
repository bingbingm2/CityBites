'use client';

import { TasteLevel } from '@/lib/types';

interface Props {
  level: TasteLevel;
  city?: string;
}

const LEVEL_COLORS = [
  { bg: 'rgba(107, 107, 128, 0.1)', border: 'rgba(107, 107, 128, 0.2)', text: '#6b6b80' },
  { bg: 'rgba(255, 179, 71, 0.1)', border: 'rgba(255, 179, 71, 0.3)', text: '#ffb347' },
  { bg: 'rgba(255, 107, 53, 0.1)', border: 'rgba(255, 107, 53, 0.3)', text: '#ff6b35' },
  { bg: 'rgba(123, 104, 238, 0.1)', border: 'rgba(123, 104, 238, 0.3)', text: '#7b68ee' },
];

export default function TasteLevelBadge({ level, city }: Props) {
  const colors = LEVEL_COLORS[level.level] || LEVEL_COLORS[0];

  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
      style={{
        background: colors.bg,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Level Stars */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3].map((star) => (
          <span
            key={star}
            className="text-lg"
            style={{
              opacity: star <= level.level ? 1 : 0.2,
              filter: star <= level.level ? 'none' : 'grayscale(1)',
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      {/* Label */}
      <div>
        <div className="font-semibold text-sm" style={{ color: colors.text }}>
          {level.label}
        </div>
        {city && (
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {city}
          </div>
        )}
      </div>
    </div>
  );
}
