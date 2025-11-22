'use client';

import { Alert, AlertDescription, AlertTitle, Button, Spinner } from '@repo/ui';
import { AlertCircle, Clock, MessageCircle, Save, Zap } from 'lucide-react';
import Link from 'next/link';
import { FormProvider } from 'react-hook-form';
import { BestPracticesCard } from '../components/best-practices-card';
import { WhatsappRemindersSection } from './whatsapp-reminders-section';
import { useWhatsappSettings } from './whatsapp-settings.hook';

export const WhatsappSettings = () => {
  const {
    form,
    isUpdatingNotificationsSettings,
    handleSubmit,
    whatsappConfig,
  } = useWhatsappSettings();

  const isWhatsappEnabled = whatsappConfig?.isActive ?? false;

  const whatsappBestPractices = [
    {
      icon: <MessageCircle className="h-4 w-4 text-gray-900" />,
      title: 'Mensagens Ricas',
      description:
        'WhatsApp permite formatação e emojis para mensagens mais envolventes',
    },
    {
      icon: <Clock className="h-4 w-4 text-gray-900" />,
      title: 'Timing Ideal',
      description:
        'Envie mensagens 2h antes do agendamento para maior efetividade',
    },
    {
      icon: <Zap className="h-4 w-4 text-gray-900" />,
      title: 'Alta Entrega',
      description:
        'WhatsApp tem 98% de taxa de abertura, ideal para comunicação direta',
    },
  ];

  return (
    <FormProvider {...form}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-gray-900">Configurações de WhatsApp</h2>
          <p className="text-gray-600 text-sm">
            Configure lembretes automáticos por WhatsApp para seus clientes
          </p>
        </div>

        {!isWhatsappEnabled && (
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="stroke-blue-500 mt-0.5" />
            <AlertTitle className="text-blue-900">
              Ativação do WhatsApp Business API necessária
            </AlertTitle>
            <AlertDescription className="text-sm text-blue-800 inline-block">
              Para utilizar lembretes por WhatsApp, você precisa primeiro ativar
              e configurar o WhatsApp Business API.{' '}
              <Link
                href="/partner/settings/whatsapp"
                className="font-semibold underline hover:text-blue-900"
              >
                Configurar WhatsApp Business
              </Link>
            </AlertDescription>
          </Alert>
        )}

        <WhatsappRemindersSection />

        <BestPracticesCard practices={whatsappBestPractices} />

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
