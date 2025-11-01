'use client';

import { Button, Spinner } from '@repo/ui';
import { CheckCircle, Clock, Mail, Save } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { BestPracticesCard } from '../components/best-practices-card';
import { EmailRemindersSection } from './email-reminders-section';
import { useSettings } from './email-settings.hook';

export const EmailSettings = () => {
  const { form, isUpdatingNotificationsSettings, handleSubmit } = useSettings();

  const emailBestPractices = [
    {
      icon: <Mail className="h-4 w-4 text-gray-900" />,
      title: 'E-mails Personalizados',
      description:
        'Mensagens personalizadas aumentam em 40% a taxa de abertura',
    },
    {
      icon: <Clock className="h-4 w-4 text-gray-900" />,
      title: 'Timing Adequado',
      description:
        'Envie e-mails 24h antes do agendamento para melhores resultados',
    },
    {
      icon: <CheckCircle className="h-4 w-4 text-gray-900" />,
      title: 'Call-to-Action Claro',
      description: 'Botões de confirmação aumentam o engajamento em até 35%',
    },
  ];

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-gray-900">Configurações de E-mail</h2>
          <p className="text-gray-600 text-sm">
            Configure lembretes automáticos por e-mail para seus clientes
          </p>
        </div>

        <EmailRemindersSection />

        <BestPracticesCard practices={emailBestPractices} />

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isUpdatingNotificationsSettings}
            className="bg-black hover:bg-gray-800 text-white px-8"
          >
            <Save className="h-4 w-4 mr-2" />
            {isUpdatingNotificationsSettings ? (
              <>
                <Spinner />
                Salvando...
              </>
            ) : (
              'Salvar Configurações'
            )}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};
