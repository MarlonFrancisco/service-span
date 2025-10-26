import { z } from 'zod';

// Schema para validação de telefone brasileiro
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;

// Schema para validação de CEP
const zipCodeRegex = /^\d{5}-\d{3}$/;

// Schema para validação de email
const emailSchema = z
  .string()
  .email('Email inválido')
  .optional()
  .or(z.literal(''));

// Schema para validação de URL
const urlSchema = z.string().url('URL inválida').optional().or(z.literal(''));

// Schema principal do formulário de loja
export const storeFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, 'Nome deve ter no mínimo 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),

  address: z
    .string()
    .min(5, 'Endereço deve ter no mínimo 5 caracteres')
    .max(200, 'Endereço deve ter no máximo 200 caracteres'),

  city: z
    .string()
    .min(2, 'Cidade deve ter no mínimo 2 caracteres')
    .max(100, 'Cidade deve ter no máximo 100 caracteres'),

  state: z
    .string()
    .length(2, 'Estado deve ter 2 caracteres (ex: SP, RJ)')
    .toUpperCase(),

  zipCode: z
    .string()
    .regex(zipCodeRegex, 'CEP inválido. Use o formato: 00000-000'),

  description: z
    .string()
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres'),

  telephone: z
    .string()
    .regex(phoneRegex, 'Telefone inválido. Use o formato: (00) 00000-0000'),

  email: emailSchema,

  website: urlSchema,

  instagram: z
    .string()
    .max(100, 'Instagram deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),

  facebook: z
    .string()
    .max(100, 'Facebook deve ter no máximo 100 caracteres')
    .optional()
    .or(z.literal('')),

  amenities: z
    .array(z.string().max(30, 'Comodidade deve ter no máximo 30 caracteres'))
    .default([]),

  isActive: z.boolean().default(true),

  gallery: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        isMain: z.boolean().optional().default(false),
      }),
    )
    .default([]),

  storeMembers: z
    .array(
      z.object({
        id: z.string(),
        role: z.enum(['professional', 'manager', 'owner']),
        isActive: z.boolean().default(false),
        createdAt: z.date(),
        user: z.object({
          id: z.string(),
          email: z.string().email('Email inválido'),
          firstName: z.string(),
          lastName: z.string(),
          telephone: z
            .string()
            .regex(
              phoneRegex,
              'Telefone inválido. Use o formato: (00) 00000-0000',
            ),
          isSubscribed: z.boolean().default(false),
          avatar: z.string().optional(),
        }),
      }),
    )
    .default([]),
});

// Type inference do schema
export type TStoreFormSchema = z.infer<typeof storeFormSchema>;
