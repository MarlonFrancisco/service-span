import { z } from 'zod';

export const AVAILABLE_COLORS = [
  'blue',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'gray',
];

export const categoryFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  color: z.enum(AVAILABLE_COLORS),

  tabValue: z.enum(['list', 'add', 'edit']).optional(),
});

export type TCategoryFormData = z.infer<typeof categoryFormSchema>;
