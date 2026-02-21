import { NextRequest } from 'next/server';
import { runJourneySchema } from '@/lib/schemas';
import { getJourney, updateJourney } from '@/lib/store';
import { ActionLogEntry, Dish } from '@/lib/types';
import { discoverRestaurants } from '@/lib/mcp-tools/discover-restaurants';
import { fetchMenu } from '@/lib/mcp-tools/fetch-menu';
import { extractDishes } from '@/lib/mcp-tools/extract-dishes';
import { explainDishes } from '@/lib/mcp-tools/explain-dishes';
import { findDishImages } from '@/lib/mcp-tools/find-dish-images';
import { composeItinerary } from '@/lib/mcp-tools/compose-itinerary';
import { computeLevel } from '@/lib/mcp-tools/compute-level';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = runJourneySchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: parsed.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { journeyId } = parsed.data;
    const journey = getJourney(journeyId);

    if (!journey) {
      return new Response(
        JSON.stringify({ error: 'Journey not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // SSE streaming
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const sendEvent = (data: ActionLogEntry) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
          );
          // Also save to journey action log
          const current = getJourney(journeyId);
          if (current) {
            updateJourney(journeyId, {
              actionLog: [...current.actionLog, data],
            });
          }
        };

        try {
          updateJourney(journeyId, { status: 'running' });

          // Step 1: Discover restaurants
          sendEvent({
            timestamp: new Date().toISOString(),
            message: `🔍 Searching for local restaurants in ${journey.city}...`,
            status: 'running',
          });

          const restaurants = await discoverRestaurants({
            city: journey.city,
            vibeTags: journey.vibeTags,
            limit: Math.min(7, Math.max(3, Math.ceil(journey.hours * 1.5))),
          });

          updateJourney(journeyId, { restaurants });

          sendEvent({
            timestamp: new Date().toISOString(),
            message: `✓ Found ${restaurants.length} locally loved restaurants`,
            status: 'done',
          });

          // Step 2: Fetch menus
          sendEvent({
            timestamp: new Date().toISOString(),
            message: `📋 Reading menus from ${restaurants.length} restaurants...`,
            status: 'running',
          });

          const menuTexts: Record<string, string> = {};
          for (const r of restaurants) {
            const menu = await fetchMenu({ restaurantUrl: r.url }, r.id, journey.city);
            menuTexts[r.id] = menu.menuText;
          }

          sendEvent({
            timestamp: new Date().toISOString(),
            message: `✓ Fetched ${Object.keys(menuTexts).length} restaurant menus`,
            status: 'done',
          });

          // Step 3: Extract dishes
          sendEvent({
            timestamp: new Date().toISOString(),
            message: '🍽️ Extracting dish names and prices...',
            status: 'running',
          });

          const extractedDishes: Record<string, Dish[]> = {};
          for (const [restaurantId, menuText] of Object.entries(menuTexts)) {
            const dishes = await extractDishes({ menuText, city: journey.city });
            extractedDishes[restaurantId] = dishes;
          }

          const totalDishes = Object.values(extractedDishes).reduce(
            (s, d) => s + d.length,
            0
          );

          sendEvent({
            timestamp: new Date().toISOString(),
            message: `✓ Extracted ${totalDishes} dishes across all menus`,
            status: 'done',
          });

          // Step 4: Explain dishes
          sendEvent({
            timestamp: new Date().toISOString(),
            message: '📖 Discovering the cultural story behind each dish...',
            status: 'running',
          });

          const explainedDishes: Record<string, Dish[]> = {};
          for (const [restaurantId, dishes] of Object.entries(extractedDishes)) {
            const restaurant = restaurants.find((r) => r.id === restaurantId);
            const explained = await explainDishes({
              city: journey.city,
              restaurantName: restaurant?.name || '',
              dishes,
              vibeTags: journey.vibeTags,
            });
            explainedDishes[restaurantId] = explained;
          }

          sendEvent({
            timestamp: new Date().toISOString(),
            message: '✓ Cultural explanations added for signature dishes',
            status: 'done',
          });

          // Step 5: Find dish images
          sendEvent({
            timestamp: new Date().toISOString(),
            message: '📸 Finding images for signature dishes...',
            status: 'running',
          });

          for (const [restaurantId, dishes] of Object.entries(explainedDishes)) {
            const dishNames = dishes.map((d) => d.name);
            const images = await findDishImages({ dishes: dishNames }, journey.city);
            // Merge images back into explained dishes
            for (const img of images) {
              const dish = explainedDishes[restaurantId].find(
                (d) => d.name === img.dishName
              );
              if (dish) dish.imageUrl = img.imageUrl;
            }
          }

          sendEvent({
            timestamp: new Date().toISOString(),
            message: '✓ Dish images found and attached',
            status: 'done',
          });

          // Step 6: Compose itinerary
          sendEvent({
            timestamp: new Date().toISOString(),
            message: `🗺️ Building your ${journey.hours}-hour taste route...`,
            status: 'running',
          });

          const itinerary = await composeItinerary({
            city: journey.city,
            hours: journey.hours,
            restaurants,
            explainedDishes,
          });

          updateJourney(journeyId, {
            stops: itinerary.stops,
            status: 'completed',
          });

          sendEvent({
            timestamp: new Date().toISOString(),
            message: `✓ Your taste journey is ready! ${itinerary.stops.length} stops planned`,
            status: 'done',
          });

          // Send completion event
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: 'complete', journeyId })}\n\n`
            )
          );
        } catch (err) {
          sendEvent({
            timestamp: new Date().toISOString(),
            message: `❌ Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
            status: 'error',
          });
          updateJourney(journeyId, { status: 'error' });
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Failed to run journey' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
