import { Restaurant, Dish, Stop } from '../types';

const MEAL_TYPES: Stop['type'][] = [
  'coffee',
  'snack',
  'brunch',
  'lunch',
  'afternoon-tea',
  'dinner',
  'late-bite',
];

// Time block labels for different parts of the day
function getTimeSlots(hours: number, startHour: number = 10): string[] {
  const slots: string[] = [];
  let currentHour = startHour;

  for (let i = 0; i < Math.min(hours, 7); i++) {
    const h = currentHour % 24;
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const endH = (h + 1) % 24;
    const endPeriod = endH >= 12 ? 'PM' : 'AM';
    const displayEndHour = endH > 12 ? endH - 12 : endH === 0 ? 12 : endH;
    slots.push(`${displayHour}:00 ${period} – ${displayEndHour}:00 ${endPeriod}`);
    currentHour += Math.ceil(hours / Math.min(hours, 7));
  }

  return slots;
}

function getMealType(hourOfDay: number): Stop['type'] {
  if (hourOfDay < 9) return 'coffee';
  if (hourOfDay < 11) return 'brunch';
  if (hourOfDay < 13) return 'lunch';
  if (hourOfDay < 15) return 'snack';
  if (hourOfDay < 17) return 'afternoon-tea';
  if (hourOfDay < 21) return 'dinner';
  return 'late-bite';
}

function estimateWalkTime(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  // Rough walking estimate: 1 degree ≈ 111km, walking at 5km/h
  const dLat = Math.abs(lat2 - lat1);
  const dLng = Math.abs(lng2 - lng1);
  const distKm = Math.sqrt(dLat ** 2 + dLng ** 2) * 111;
  return Math.max(5, Math.round((distKm / 5) * 60));
}

interface ComposeInput {
  city: string;
  hours: number;
  restaurants: Restaurant[];
  explainedDishes: Record<string, Dish[]>;
  startTime?: string;
}

export async function composeItinerary(input: ComposeInput): Promise<{
  stops: Stop[];
  route: { coordinates: [number, number][] };
}> {
  const { hours, restaurants, explainedDishes, startTime } = input;

  // Determine how many stops based on hours
  const maxStops = Math.min(restaurants.length, Math.max(2, Math.floor(hours * 1.2)));
  const selectedRestaurants = restaurants.slice(0, maxStops);

  // Parse start time
  let startHour = 10;
  if (startTime) {
    const match = startTime.match(/(\d{1,2})/);
    if (match) startHour = parseInt(match[1]);
  }

  // Create stops with time progression
  const hoursPerStop = hours / maxStops;
  const stops: Stop[] = selectedRestaurants.map((restaurant, index) => {
    const currentHour = startHour + index * hoursPerStop;
    const mealType = getMealType(Math.floor(currentHour));

    const h = Math.floor(currentHour) % 24;
    const m = Math.round((currentHour % 1) * 60);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    const endCurrentHour = currentHour + hoursPerStop;
    const endH = Math.floor(endCurrentHour) % 24;
    const endPeriod = endH >= 12 ? 'PM' : 'AM';
    const displayEndHour = endH > 12 ? endH - 12 : endH === 0 ? 12 : endH;
    const timeBlock = `${displayHour}:${m.toString().padStart(2, '0')} ${period} – ${displayEndHour}:${Math.round((endCurrentHour % 1) * 60).toString().padStart(2, '0')} ${endPeriod}`;

    // Get dishes for this restaurant
    const dishes = explainedDishes[restaurant.id] || [];
    const signatureDishes = dishes.slice(0, 3);

    // Walk time to next stop
    let walkToNextMins: number | undefined;
    if (index < selectedRestaurants.length - 1) {
      const next = selectedRestaurants[index + 1];
      walkToNextMins = estimateWalkTime(
        restaurant.lat,
        restaurant.lng,
        next.lat,
        next.lng
      );
    }

    const whyMessages: Record<Stop['type'], string> = {
      coffee: `Start your day the local way with a coffee stop in the ${restaurant.neighborhood} neighborhood.`,
      snack: `Time for a quick, authentic snack in ${restaurant.neighborhood} — the kind locals grab between meals.`,
      brunch: `A leisurely brunch stop in ${restaurant.neighborhood}, where tables fill with locals on weekends.`,
      lunch: `The main event: a proper sit-down lunch in ${restaurant.neighborhood}.`,
      'afternoon-tea': `An afternoon delight in ${restaurant.neighborhood} — perfect for a sweet or savory pause.`,
      dinner: `Dinner in ${restaurant.neighborhood}: this is where the city's culinary soul lives at night.`,
      'late-bite': `End the night with a late bite in ${restaurant.neighborhood} — where the locals wind down.`,
    };

    return {
      restaurantId: restaurant.id,
      timeBlock,
      type: mealType,
      signatureDishes,
      whyThisStop: whyMessages[mealType],
      walkToNextMins,
    };
  });

  // Build route coordinates
  const coordinates: [number, number][] = selectedRestaurants.map((r) => [
    r.lat,
    r.lng,
  ]);

  await new Promise((r) => setTimeout(r, 700));

  return { stops, route: { coordinates } };
}
