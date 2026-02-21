import { TasteLevel, ComputeLevelInput } from '../types';

const CITY_LABELS: Record<string, string[]> = {
  rome: ['Roman Flavor Novice', 'Roman Street Traditionalist', 'Roman Culinary Connoisseur'],
  'san francisco': ['SF Foodie Newcomer', 'Bay Area Taste Explorer', 'San Francisco Food Guru'],
  default: ['Flavor Seeker', 'Cultural Taste Explorer', 'Global Culinary Master'],
};

export async function computeLevel(
  input: ComputeLevelInput,
  city?: string
): Promise<TasteLevel> {
  const { restaurantsVisitedCount } = input;

  let level = 0;
  if (restaurantsVisitedCount >= 7) level = 3;
  else if (restaurantsVisitedCount >= 4) level = 2;
  else if (restaurantsVisitedCount >= 1) level = 1;

  // Get city-specific label
  const normalizedCity = (city || 'default').toLowerCase();
  let labels = CITY_LABELS.default;
  for (const [key, val] of Object.entries(CITY_LABELS)) {
    if (normalizedCity.includes(key)) {
      labels = val;
      break;
    }
  }

  const label = level > 0 ? `${labels[level - 1]} – Level ${level}` : 'Not started yet';

  return { level, label };
}
