import { z } from 'zod';

export const professionalFormSchema = z.object({
  id: z.string().optional(),
  user: z.object({
    email: z.string().email('E-mail inválido'),
  }),
  role: z.enum(['professional', 'manager', 'owner']),
  services: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  ),
});

export type TProfessionalFormSchema = z.infer<typeof professionalFormSchema>;
