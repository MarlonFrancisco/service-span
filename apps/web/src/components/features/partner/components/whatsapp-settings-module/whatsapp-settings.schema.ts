import { z } from 'zod';

export const whatsappSettingsSchema = z.object({
  isActive: z.boolean(),
  phoneNumberId: z.string().min(1, 'Campo obrigatório'),
  businessAccountId: z.string().min(1, 'Campo obrigatório'),
  accessToken: z.string().min(1, 'Campo obrigatório'),
  webhookVerifyToken: z.string().min(1, 'Campo obrigatório'),
});

export type IWhatsappSettingsSchema = z.infer<typeof whatsappSettingsSchema>;
