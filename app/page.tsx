'use client';

import Link from 'next/link';

const FEATURED_CITIES = [
  { name: 'Rome', emoji: '🇮🇹', tag: 'Eternal flavors' },
  { name: 'San Francisco', emoji: '🇺🇸', tag: 'Bay to plate' },
  { name: 'Tokyo', emoji: '🇯🇵', tag: 'Coming soon' },
  { name: 'Mexico City', emoji: '🇲🇽', tag: 'Coming soon' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 20%, rgba(255, 107, 53, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(123, 104, 238, 0.1) 0%, transparent 50%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in"
              style={{
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                color: 'var(--accent-primary)',
              }}
            >
              <span>✨</span>
              AI-Powered Taste Journeys
            </div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl font-bold leading-tight mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Experience a city
              <br />
              through{' '}
              <span
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent-primary), var(--accent-warm), var(--accent-rose))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                food
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up"
              style={{
                color: 'var(--text-secondary)',
                animationDelay: '0.2s',
                lineHeight: 1.7,
              }}
            >
              Skip the tourist traps. CityBites finds what locals really eat,
              explains the culture behind every bite, and plans your perfect
              walking food itinerary.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Link href="/journey" className="btn-primary text-lg px-8 py-4 animate-pulse-glow">
                🍽️ Start Your Taste Journey
              </Link>
              <Link href="/profile" className="btn-secondary">
                View My Profile →
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div
            className="mt-24 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <h2
              className="text-center text-sm font-semibold mb-12 tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  icon: '🏙️',
                  title: 'Choose Your City',
                  desc: 'Tell us where you are and how long you have',
                },
                {
                  step: '02',
                  icon: '🔍',
                  title: 'We Discover',
                  desc: 'AI finds non-touristy spots, reads menus, explains dishes',
                },
                {
                  step: '03',
                  icon: '🗺️',
                  title: 'Walk & Eat',
                  desc: 'Follow your personalized walking food route',
                },
                {
                  step: '04',
                  icon: '⭐',
                  title: 'Level Up',
                  desc: 'Log what you ate and build your taste identity',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="card text-center"
                  style={{ background: 'var(--bg-card)' }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div
                    className="text-xs font-bold mb-2"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    STEP {item.step}
                  </div>
                  <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Cities */}
          <div
            className="mt-20 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <h2
              className="text-center text-sm font-semibold mb-8 tracking-widest uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Featured Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {FEATURED_CITIES.map((city) => (
                <Link
                  key={city.name}
                  href={city.tag.includes('Coming') ? '#' : '/journey'}
                  className="card text-center no-underline group"
                  style={{
                    opacity: city.tag.includes('Coming') ? 0.5 : 1,
                    cursor: city.tag.includes('Coming') ? 'default' : 'pointer',
                  }}
                >
                  <div className="text-3xl mb-2">{city.emoji}</div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {city.name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {city.tag}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
