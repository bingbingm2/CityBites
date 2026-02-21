'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import JourneyForm from '@/components/JourneyForm';

export default function JourneyPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (city: string, hours: number, vibeTags: string[]) => {
    setIsLoading(true);
    setError('');

    try {
      // Create journey
      const createRes = await fetch('/api/journey/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, hours, vibeTags }),
      });

      if (!createRes.ok) throw new Error('Failed to create journey');
      const { journeyId } = await createRes.json();

      // Navigate to results page (which will trigger the run)
      router.push(`/journey/${journeyId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-6 pt-12 pb-20">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Plan Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-warm))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Taste Journey
            </span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Tell us where you&apos;re headed and how long you have. We&apos;ll do the rest.
          </p>
        </div>

        <JourneyForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div
            className="mt-6 p-4 rounded-xl text-center text-sm"
            style={{
              background: 'rgba(255, 59, 48, 0.1)',
              border: '1px solid rgba(255, 59, 48, 0.2)',
              color: '#ff3b30',
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
