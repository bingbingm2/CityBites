'use client';

import { useState } from 'react';

const VIBE_OPTIONS = [
  { value: 'street-food', label: '🥙 Street Food', emoji: '🥙' },
  { value: 'coffee-culture', label: '☕ Coffee Culture', emoji: '☕' },
  { value: 'seafood', label: '🦐 Seafood', emoji: '🦐' },
  { value: 'night-markets', label: '🌙 Night Markets', emoji: '🌙' },
  { value: 'cozy', label: '🕯️ Cozy & Intimate', emoji: '🕯️' },
  { value: 'local-only', label: '📍 Local Only', emoji: '📍' },
  { value: 'pastry', label: '🥐 Pastry & Bakery', emoji: '🥐' },
  { value: 'wine', label: '🍷 Wine & Aperitivo', emoji: '🍷' },
];

interface Props {
  onSubmit: (city: string, hours: number, vibeTags: string[]) => void;
  isLoading: boolean;
}

export default function JourneyForm({ onSubmit, isLoading }: Props) {
  const [city, setCity] = useState('');
  const [hours, setHours] = useState(5);
  const [vibeTags, setVibeTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setVibeTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSubmit(city.trim(), hours, vibeTags);
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="card" style={{ padding: '32px' }}>
        {/* City Input */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">
            🏙️ Destination City
          </label>
          <input
            type="text"
            className="input text-lg"
            placeholder="e.g., Rome, San Francisco, Tokyo..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={{ padding: '16px 20px' }}
          />
        </div>

        {/* Hours Slider */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-2">
            ⏱️ Hours Available
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={12}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="flex-1"
            />
            <div
              className="text-2xl font-bold min-w-[80px] text-center"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-warm))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {hours}h
            </div>
          </div>
          <div
            className="flex justify-between text-xs mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <span>Quick bite</span>
            <span>Full day feast</span>
          </div>
        </div>

        {/* Vibe Tags */}
        <div className="mb-8">
          <label className="block text-sm font-semibold mb-3">
            ✨ Vibe (optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {VIBE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`tag ${vibeTags.includes(option.value) ? 'active' : ''}`}
                onClick={() => toggleTag(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary w-full justify-center text-lg py-4"
          disabled={isLoading || !city.trim()}
          style={{
            opacity: isLoading || !city.trim() ? 0.6 : 1,
            cursor: isLoading || !city.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? (
            <>
              <span
                className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                style={{ animation: 'spin-slow 1s linear infinite' }}
              />
              Planning your journey...
            </>
          ) : (
            <>🚀 Start Tasting</>
          )}
        </button>
      </div>

      {/* Example prompt */}
      <p
        className="text-center text-sm mt-6"
        style={{ color: 'var(--text-muted)' }}
      >
        Try: &quot;5 hours in Rome&quot; with Street Food + Local Only vibes
      </p>
    </form>
  );
}
