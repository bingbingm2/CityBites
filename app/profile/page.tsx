'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types';
import TasteLevelBadge from '@/components/TasteLevelBadge';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="w-10 h-10 border-2 rounded-full"
          style={{
            borderColor: 'var(--accent-primary)',
            borderTopColor: 'transparent',
            animation: 'spin-slow 1s linear infinite',
          }}
        />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-muted)' }}>Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(123, 104, 238, 0.08) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6 pt-12 pb-20">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="text-5xl mb-4">👨‍🍳</div>
          <h1 className="text-3xl font-bold mb-2">Your Taste Profile</h1>
          <p
            className="text-lg font-medium"
            style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-warm))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {profile.tasteIdentity}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Journeys', value: profile.journeys.length, icon: '🗺️' },
            { label: 'Restaurants', value: profile.totalRestaurants, icon: '🍽️' },
            { label: 'Dishes Tried', value: profile.totalDishes, icon: '⭐' },
          ].map((stat) => (
            <div key={stat.label} className="card text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div
                className="text-2xl font-bold"
                style={{ color: 'var(--accent-primary)' }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Past Journeys */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-lg font-semibold mb-4">Past Journeys</h2>

          {profile.journeys.length === 0 ? (
            <div className="card text-center" style={{ padding: '40px 20px' }}>
              <div className="text-3xl mb-3">🌍</div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                No journeys yet. Start your first taste adventure!
              </p>
              <Link href="/journey" className="btn-primary">
                🍽️ Plan a Journey
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {profile.journeys.map((journey) => (
                <Link
                  key={journey.id}
                  href={`/journey/${journey.id}`}
                  className="card flex items-center justify-between no-underline group"
                  style={{ padding: '16px 20px' }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
                        {journey.city}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background:
                            journey.status === 'completed'
                              ? 'rgba(32, 212, 162, 0.1)'
                              : 'rgba(255, 107, 53, 0.1)',
                          color:
                            journey.status === 'completed'
                              ? 'var(--accent-teal)'
                              : 'var(--accent-primary)',
                        }}
                      >
                        {journey.status === 'completed' ? '✓ Done' : journey.status}
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {journey.hours}h · {journey.stops.length} stops ·{' '}
                      {journey.userLogs.length} logged ·{' '}
                      {new Date(journey.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    {journey.level.level > 0 && (
                      <TasteLevelBadge level={journey.level} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
