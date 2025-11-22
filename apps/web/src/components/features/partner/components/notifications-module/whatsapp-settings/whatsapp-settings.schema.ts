import { z } from 'zod';

export const whatsappSettingsSchema = z.object({
  whatsappReminderEnabled: z.boolean('Campo obrigatório'),
  whatsappReminderAdvanceHours: z.string('Selecione o tempo de antecedência'),
  whatsappReminderCustomMessage: z
    .string()
    .max(300, 'Mensagem WhatsApp deve ter no máximo 300 caracteres')
    .optional(),
});

export type TWhatsappSettingsFormData = z.infer<typeof whatsappSettingsSchema>;
