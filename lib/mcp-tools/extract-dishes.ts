import { ExtractDishesInput, Dish } from '../types';

export async function extractDishes(
  input: ExtractDishesInput
): Promise<Dish[]> {
  const { menuText } = input;

  // Parse menu text using heuristics
  const dishes: Dish[] = [];
  const lines = menuText.split('\n').map((l) => l.trim()).filter(Boolean);

  let currentCategory = '';

  for (const line of lines) {
    // Detect category headers (all caps or ends with /)
    if (
      line === line.toUpperCase() && !line.includes('—') && !line.includes('€') && !line.includes('$')
    ) {
      currentCategory = line.replace(/\//g, ' ').trim();
      continue;
    }

    // Parse dish lines: "Name — Price" or "Name - Price"
    const match = line.match(/^(.+?)(?:\s*[—–-]\s*)([€$£][\d.,]+(?:\/\w+)?)?$/);
    if (match) {
      const name = match[1].trim();
      const price = match[2]?.trim();
      if (name.length > 2) {
        dishes.push({
          name,
          price,
          category: currentCategory || undefined,
        });
      }
    }
  }

  await new Promise((r) => setTimeout(r, 400));
  return dishes;
}
