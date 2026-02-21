import { FetchMenuInput, FetchMenuOutput } from '../types';
import { getMockCityData } from '../mock-data';

export async function fetchMenu(
  input: FetchMenuInput,
  restaurantId?: string,
  city?: string
): Promise<FetchMenuOutput> {
  // Use mock data
  if (restaurantId && city) {
    const mockData = getMockCityData(city);
    const menuText = mockData.menuTexts[restaurantId];
    if (menuText) {
      await new Promise((r) => setTimeout(r, 500));
      return {
        menuText,
        menuSourceType: 'html',
      };
    }
  }

  // Fallback
  await new Promise((r) => setTimeout(r, 300));
  return {
    menuText: 'Menu not available — please check the restaurant website.',
    menuSourceType: 'unknown',
  };
}
