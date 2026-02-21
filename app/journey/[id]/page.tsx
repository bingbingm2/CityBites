'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Journey, ActionLogEntry, Stop } from '@/lib/types';
import LiveActionLog from '@/components/LiveActionLog';
import TimelineView from '@/components/TimelineView';
import MapView from '@/components/MapView';
import StopDetailDrawer from '@/components/StopDetailDrawer';
import TasteLevelBadge from '@/components/TasteLevelBadge';

type TabType = 'timeline' | 'map' | 'log';

export default function JourneyResultsPage() {
  const params = useParams();
  const id = params.id as string;

  const [journey, setJourney] = useState<Journey | null>(null);
  const [actionLogs, setActionLogs] = useState<ActionLogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('log');
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const hasStartedRef = useRef(false);

  // Fetch journey data
  const fetchJourney = useCallback(async () => {
    try {
      const res = await fetch(`/api/journey/${id}`);
      if (res.ok) {
        const data = await res.json();
        setJourney(data);
        return data;
      }
    } catch {
      // ignore
    }
    return null;
  }, [id]);

  // Start the orchestration run
  const startRun = useCallback(async () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    setIsRunning(true);
    setActiveTab('log');

    try {
      const res = await fetch('/api/journey/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ journeyId: id }),
      });

      if (!res.body) {
        setIsRunning(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'complete') {
                // Orchestration done — fetch final journey
                setIsRunning(false);
                const finalJourney = await fetchJourney();
                if (finalJourney && finalJourney.stops.length > 0) {
                  setActiveTab('timeline');
                }
              } else {
                setActionLogs((prev) => [...prev, data]);
              }
            } catch {
              // ignore parse errors
            }
          }
        }
      }
    } catch {
      setIsRunning(false);
    }

    setIsRunning(false);
    await fetchJourney();
  }, [id, fetchJourney]);

  // On mount: fetch journey, then start run if needed
  useEffect(() => {
    fetchJourney().then((j) => {
      if (j && j.status === 'created') {
        startRun();
      } else if (j && j.status === 'completed') {
        setActionLogs(j.actionLog || []);
        setActiveTab('timeline');
      }
    });
  }, [fetchJourney, startRun]);

  // Log dishes
  const handleLog = async (restaurantId: string, dishNames: string[]) => {
    try {
      const res = await fetch(`/api/journey/${id}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, dishNames }),
      });
      if (res.ok) {
        await fetchJourney();
      }
    } catch {
      // ignore
    }
  };

  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'timeline', label: 'Timeline', icon: '📍' },
    { key: 'map', label: 'Map', icon: '🗺️' },
    { key: 'log', label: 'Action Log', icon: '📋' },
  ];

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-12 h-12 border-3 rounded-full mx-auto mb-4"
            style={{
              borderColor: 'var(--accent-primary)',
              borderTopColor: 'transparent',
              animation: 'spin-slow 1s linear infinite',
            }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>Loading your journey...</p>
        </div>
      </div>
    );
  }

  const isCompleted = journey.status === 'completed';
  const loggedRestaurantIds = new Set(journey.userLogs.map((l) => l.restaurantId));
  const selectedRestaurant = selectedStop
    ? journey.restaurants.find((r) => r.id === selectedStop.restaurantId)
    : null;

  return (
    <div className="min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(255, 107, 53, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-8 pb-20">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold">
              {journey.city}
            </h1>
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: isCompleted
                  ? 'rgba(32, 212, 162, 0.1)'
                  : 'rgba(255, 107, 53, 0.1)',
                color: isCompleted ? 'var(--accent-teal)' : 'var(--accent-primary)',
                border: `1px solid ${
                  isCompleted ? 'rgba(32, 212, 162, 0.2)' : 'rgba(255, 107, 53, 0.2)'
                }`,
              }}
            >
              {isCompleted ? '✓ Ready' : isRunning ? 'Processing...' : journey.status}
            </span>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {journey.hours} hours · {journey.vibeTags.length > 0
              ? journey.vibeTags.join(', ')
              : 'All vibes'
            }
            {isCompleted && ` · ${journey.stops.length} stops`}
          </p>
        </div>

        {/* Level Badge */}
        {journey.level.level > 0 && (
          <div className="mb-6 animate-fade-in-up">
            <TasteLevelBadge level={journey.level} city={journey.city} />
          </div>
        )}

        {/* Tab Navigation */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-6"
          style={{ background: 'var(--bg-card)' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className="flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: activeTab === tab.key
                  ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))'
                  : 'transparent',
                color: activeTab === tab.key ? 'white' : 'var(--text-secondary)',
              }}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'log' && (
              <LiveActionLog logs={actionLogs} isRunning={isRunning} />
            )}

            {activeTab === 'timeline' && isCompleted && (
              <TimelineView
                stops={journey.stops}
                restaurants={journey.restaurants}
                onSelectStop={(stop) => setSelectedStop(stop)}
                selectedStopId={selectedStop?.restaurantId}
              />
            )}

            {activeTab === 'map' && isCompleted && (
              <MapView
                restaurants={journey.restaurants}
                stops={journey.stops}
                selectedStopId={selectedStop?.restaurantId}
              />
            )}

            {(activeTab === 'timeline' || activeTab === 'map') && !isCompleted && (
              <div
                className="card flex items-center justify-center"
                style={{ minHeight: '300px' }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">⏳</div>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Still building your taste journey...
                  </p>
                  <button
                    className="btn-secondary mt-3"
                    onClick={() => setActiveTab('log')}
                  >
                    View progress →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {selectedStop && selectedRestaurant ? (
              <StopDetailDrawer
                stop={selectedStop}
                restaurant={selectedRestaurant}
                onLog={handleLog}
                isLogged={loggedRestaurantIds.has(selectedStop.restaurantId)}
              />
            ) : (
              <div
                className="card flex items-center justify-center"
                style={{ minHeight: '200px' }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">👈</div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {isCompleted
                      ? 'Select a stop to see details'
                      : 'Details will appear here once ready'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
