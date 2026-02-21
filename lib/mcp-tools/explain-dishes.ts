import { ExplainDishesInput, Dish } from '../types';
import { getMockCityData } from '../mock-data';

export async function explainDishes(
  input: ExplainDishesInput
): Promise<Dish[]> {
  const { city, dishes } = input;
  const mockData = getMockCityData(city);

  // Build a lookup of all pre-explained dishes
  const explanationLookup = new Map<string, Dish>();
  for (const [, dishList] of Object.entries(mockData.dishes)) {
    for (const d of dishList) {
      explanationLookup.set(d.name.toLowerCase(), d);
    }
  }

  const explained: Dish[] = dishes.map((dish) => {
    // Try to find a mock explanation
    const key = dish.name.toLowerCase();
    const mock = explanationLookup.get(key);
    if (mock) {
      return { ...dish, ...mock };
    }

    // Generate a generic explanation for unmatched dishes
    return {
      ...dish,
      explanation: `A traditional dish commonly found in ${city}. Made with local ingredients and traditional preparation methods.`,
      whyCityUnique: `This dish reflects the culinary heritage and local flavors of ${city}.`,
      orderingTip: 'Ask your server for serving recommendations.',
    };
  });

  await new Promise((r) => setTimeout(r, 600));
  return explained;
}
