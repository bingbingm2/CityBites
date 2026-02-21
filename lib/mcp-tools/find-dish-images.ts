import { FindDishImagesInput, Dish } from '../types';
import { getMockCityData } from '../mock-data';

export async function findDishImages(
  input: FindDishImagesInput,
  city?: string
): Promise<{ dishName: string; imageUrl: string }[]> {
  // Build lookup from mock data
  const imageLookup = new Map<string, string>();
  if (city) {
    const mockData = getMockCityData(city);
    for (const [, dishList] of Object.entries(mockData.dishes)) {
      for (const d of dishList) {
        if (d.imageUrl) {
          imageLookup.set(d.name.toLowerCase(), d.imageUrl);
        }
      }
    }
  }

  const results = input.dishes.map((dishName) => {
    const mockUrl = imageLookup.get(dishName.toLowerCase());
    return {
      dishName,
      imageUrl:
        mockUrl ||
        `https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop`,
    };
  });

  await new Promise((r) => setTimeout(r, 500));
  return results;
}
