import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { createJourneySchema } from '@/lib/schemas';
import { Journey } from '@/lib/types';
import { setJourney } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createJourneySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { city, hours, vibeTags } = parsed.data;
    const journey: Journey = {
      id: uuidv4(),
      city,
      hours,
      vibeTags: vibeTags || [],
      createdAt: new Date().toISOString(),
      restaurants: [],
      stops: [],
      actionLog: [],
      userLogs: [],
      level: { level: 0, label: 'Not started yet' },
      status: 'created',
    };

    setJourney(journey);

    return NextResponse.json({ journeyId: journey.id });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create journey' },
      { status: 500 }
    );
  }
}
