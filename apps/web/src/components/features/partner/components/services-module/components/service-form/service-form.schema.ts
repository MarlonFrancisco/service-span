import { z } from 'zod';

export const serviceFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  duration: z.number().min(1, 'Duração é obrigatória'),
  price: z.number().min(1, 'Preço é obrigatório'),
  category: z.object({
    id: z.string().min(1, 'Categoria é obrigatória'),
  }),
  isActive: z.boolean(),
});

export type TServiceFormData = z.infer<typeof serviceFormSchema>;
