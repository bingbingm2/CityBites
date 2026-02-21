# 🍕 CityBites — Taste Journey

**Experience a city through food, not tourist checklists.**

CityBites is an AI travel food companion. Enter a destination city and your available time, and it discovers locally representative restaurants, reads menus, explains dishes culturally, shows images, and composes a walking food itinerary with a map route. Log what you eat and level up your taste identity.

## ✨ Features

- **AI Food Discovery** — Finds non-touristy, locally loved restaurants
- **Menu Reading** — Fetches and parses restaurant menus
- **Cultural Explanations** — Why each dish represents the city's taste
- **Taste Itinerary** — Time-aware route (coffee → snack → brunch → dinner → late bite)
- **Interactive Map** — Leaflet map with walking route and stop pins
- **Live Action Log** — Real-time SSE-streamed progress updates
- **Gamification** — Log dishes, earn levels, build your Taste Identity
- **Mock-First** — Works out of the box with curated data for Rome & San Francisco

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
citybites/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout + Navbar
│   ├── globals.css                 # Design system
│   ├── journey/
│   │   ├── page.tsx                # Journey input form
│   │   └── [id]/page.tsx           # Journey results (timeline + map + log)
│   ├── profile/page.tsx            # Taste profile
│   └── api/
│       ├── journey/create/route.ts # POST — create journey
│       ├── journey/run/route.ts    # POST — orchestrate + SSE stream
│       ├── journey/[id]/route.ts   # GET — fetch journey
│       ├── journey/[id]/log/route.ts # POST — log eaten dishes
│       └── profile/route.ts        # GET — user profile
├── components/
│   ├── Navbar.tsx
│   ├── JourneyForm.tsx
│   ├── LiveActionLog.tsx
│   ├── TimelineView.tsx
│   ├── MapView.tsx / MapViewClient.tsx
│   ├── StopDetailDrawer.tsx
│   └── TasteLevelBadge.tsx
├── lib/
│   ├── types.ts                    # TypeScript interfaces
│   ├── schemas.ts                  # Zod validation
│   ├── store.ts                    # In-memory data store
│   ├── mock-data.ts                # Mock data for Rome + SF
│   └── mcp-tools/
│       ├── discover-restaurants.ts
│       ├── fetch-menu.ts
│       ├── extract-dishes.ts
│       ├── explain-dishes.ts
│       ├── find-dish-images.ts
│       ├── compose-itinerary.ts
│       └── compute-level.ts
└── .env.example
```

## 🍝 Demo Scenario

1. Open http://localhost:3000
2. Click **"Start Your Taste Journey"**
3. Enter **"Rome"** as city, set **5 hours**
4. Optionally select vibes: **Street Food**, **Local Only**
5. Click **"Start Tasting"**
6. Watch the **Live Action Log** stream progress in real time
7. Switch to **Timeline** tab to see your walking food route
8. Switch to **Map** tab to see pins and route
9. Click any stop to see dish details + cultural explanations
10. Click **"I ate this"** on dishes and log them
11. Visit **Profile** to see your Taste Identity level up

## 🔧 Environment Variables

All API keys are optional — the app works with built-in mock data.

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_PLACES_API_KEY` | No | Real restaurant discovery |
| `SERP_API_KEY` | No | Real dish image search |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | No | Mapbox tiles (uses free CartoDB by default) |

## 🏗️ Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** (Dark theme, glassmorphism)
- **Leaflet** (Free interactive maps)
- **Zod** (Input validation)
- **SSE** (Real-time streaming)
