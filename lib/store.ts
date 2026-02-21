import { Journey, UserProfile } from './types';

// In-memory store — sufficient for hackathon demo
const journeys = new Map<string, Journey>();

export function getJourney(id: string): Journey | undefined {
  return journeys.get(id);
}

export function setJourney(journey: Journey): void {
  journeys.set(journey.id, journey);
}

export function updateJourney(id: string, update: Partial<Journey>): Journey | undefined {
  const existing = journeys.get(id);
  if (!existing) return undefined;
  const updated = { ...existing, ...update };
  journeys.set(id, updated);
  return updated;
}

export function getAllJourneys(): Journey[] {
  return Array.from(journeys.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getUserProfile(): UserProfile {
  const allJourneys = getAllJourneys();
  const totalRestaurants = allJourneys.reduce((sum, j) => sum + j.userLogs.length, 0);
  const totalDishes = allJourneys.reduce(
    (sum, j) => sum + j.userLogs.reduce((s, l) => s + l.dishes.length, 0),
    0
  );

  let tasteIdentity = 'Aspiring Foodie';
  if (totalRestaurants >= 10) tasteIdentity = 'Seasoned Taste Explorer';
  else if (totalRestaurants >= 5) tasteIdentity = 'Cultural Palate Adventurer';
  else if (totalRestaurants >= 1) tasteIdentity = 'Curious Flavor Seeker';

  return { journeys: allJourneys, tasteIdentity, totalRestaurants, totalDishes };
}
