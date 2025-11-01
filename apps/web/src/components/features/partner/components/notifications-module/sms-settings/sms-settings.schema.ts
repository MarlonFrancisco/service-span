import { z } from 'zod';

export const smsSettingsSchema = z.object({
  smsReminderEnabled: z.boolean('Campo obrigatório'),
  smsReminderAdvanceHours: z.string('Selecione o tempo de antecedência'),
  smsReminderCustomMessage: z
    .string()
    .max(50, 'Mensagem SMS deve ter no máximo 50 caracteres')
    .optional(),
});

export type TSmsSettingsFormData = z.infer<typeof smsSettingsSchema>;
