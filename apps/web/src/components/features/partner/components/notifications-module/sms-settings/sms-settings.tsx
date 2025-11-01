'use client';

import { Button, Spinner } from '@repo/ui';
import { Clock, MessageSquare, Save, Zap } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { BestPracticesCard } from '../components/best-practices-card';
import { SmsRemindersSection } from './sms-reminders-section';
import { useSmsSettings } from './sms-settings.hook';

export const SmsSettings = () => {
  const { form, isUpdatingNotificationsSettings, handleSubmit } =
    useSmsSettings();

  const smsBestPractices = [
    {
      icon: <MessageSquare className="h-4 w-4 text-gray-900" />,
      title: 'Mensagens Curtas',
      description:
        'SMS concisos têm 95% de taxa de leitura nos primeiros 3 minutos',
    },
    {
      icon: <Clock className="h-4 w-4 text-gray-900" />,
      title: 'Timing Ideal',
      description: 'Envie SMS 2h antes do agendamento para maior efetividade',
    },
    {
      icon: <Zap className="h-4 w-4 text-gray-900" />,
      title: 'Alta Entrega',
      description:
        'SMS têm 95% de taxa de entrega, ideal para lembretes urgentes',
    },
  ];

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-gray-900">Configurações de SMS</h2>
          <p className="text-gray-600 text-sm">
            Configure lembretes automáticos por SMS para seus clientes
          </p>
        </div>

        <SmsRemindersSection />

        <BestPracticesCard practices={smsBestPractices} />

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
