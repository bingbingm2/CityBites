import { NextRequest, NextResponse } from 'next/server';
import { logDishesSchema } from '@/lib/schemas';
import { getJourney, updateJourney } from '@/lib/store';
import { computeLevel } from '@/lib/mcp-tools/compute-level';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const journey = getJourney(id);

    if (!journey) {
      return NextResponse.json(
        { error: 'Journey not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const parsed = logDishesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { restaurantId, dishNames } = parsed.data;

    // Add to user logs
    const newLog = {
      restaurantId,
      dishes: dishNames,
      loggedAt: new Date().toISOString(),
    };

    const updatedLogs = [...journey.userLogs, newLog];
    const uniqueRestaurants = new Set(updatedLogs.map((l) => l.restaurantId));

    // Recompute level
    const level = await computeLevel(
      { restaurantsVisitedCount: uniqueRestaurants.size },
      journey.city
    );

    updateJourney(id, {
      userLogs: updatedLogs,
      level,
    });

    return NextResponse.json({ success: true, level, logsCount: updatedLogs.length });
  } catch {
    return NextResponse.json(
      { error: 'Failed to log dishes' },
      { status: 500 }
    );
  }
}
