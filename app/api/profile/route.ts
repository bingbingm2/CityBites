import { NextResponse } from 'next/server';
import { getUserProfile } from '@/lib/store';

export async function GET() {
  try {
    const profile = getUserProfile();
    return NextResponse.json(profile);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}
