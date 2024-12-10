import { z } from 'zod';

export const designSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
});

export const subscriptionSchema = z.object({
  priceId: z.string(),
  plan: z.enum(['free', 'pro', 'enterprise']),
});