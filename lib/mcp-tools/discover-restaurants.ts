import { Restaurant, DiscoverRestaurantsInput } from '../types';
import { getMockCityData } from '../mock-data';

export async function discoverRestaurants(
  input: DiscoverRestaurantsInput
): Promise<Restaurant[]> {
  const { city, vibeTags, limit = 7 } = input;
  const mockData = getMockCityData(city);
  let restaurants = [...mockData.restaurants];

  // Filter by vibe tags if provided
  if (vibeTags && vibeTags.length > 0) {
    // Simple scoring: prioritize by whyLocalScore and apply loose tag matching
    restaurants.sort((a, b) => b.whyLocalScore - a.whyLocalScore);
  }

  // Limit results
  restaurants = restaurants.slice(0, limit);

  // Simulate discovery delay
  await new Promise((r) => setTimeout(r, 800));

  return restaurants;
}
