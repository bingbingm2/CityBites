import { z } from 'zod';

export const createJourneySchema = z.object({
  city: z.string().min(1, 'City is required').describe('Destination city name'),
  hours: z.number().min(1).max(24).describe('Hours available in the city'),
  vibeTags: z.array(z.string()).optional().default([]).describe('Optional vibe/cuisine tags'),
});

export const logDishesSchema = z.object({
  restaurantId: z.string().describe('Restaurant ID to log'),
  dishNames: z.array(z.string()).min(1).describe('Names of dishes eaten'),
});

export const runJourneySchema = z.object({
  journeyId: z.string().describe('Journey ID to orchestrate'),
});

export type CreateJourneyInput = z.infer<typeof createJourneySchema>;
export type LogDishesInput = z.infer<typeof logDishesSchema>;
export type RunJourneyInput = z.infer<typeof runJourneySchema>;
