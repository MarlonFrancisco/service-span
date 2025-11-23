import { useWhatsappMutation } from '@/hooks/use-mutations/use-whatsapp-mutations';
import { useWhatsappQuery } from '@/hooks/use-query/use-whatsapp-query';
import { usePartnerStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  IWhatsappSettingsSchema,
  whatsappSettingsSchema,
} from './whatsapp-settings.schema';

export const useWhatsappSettingsModule = () => {
  const { saveConfig, isSaveConfigPending } = useWhatsappMutation();
  const { activeStore } = usePartnerStore();
  console.log(activeStore);
  const { whatsappConfig, isWhatsappPending } = useWhatsappQuery(
    activeStore.id,
  );

  const form = useForm<IWhatsappSettingsSchema>({
    resolver: zodResolver(whatsappSettingsSchema),
    defaultValues: {
      isActive: false,
      phoneNumberId: '',
      businessAccountId: '',
      accessToken: '',
      webhookVerifyToken: '',
    },
  });

  useEffect(() => {
    if (whatsappConfig) {
      form.setValue('isActive', whatsappConfig.isActive ?? false);
      form.setValue('phoneNumberId', whatsappConfig.phoneNumberId);
      form.setValue('businessAccountId', whatsappConfig.businessAccountId);
      form.setValue('accessToken', whatsappConfig.accessToken);
      form.setValue('webhookVerifyToken', whatsappConfig.webhookVerifyToken);
    }
  }, [whatsappConfig, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    saveConfig({
      ...data,
      id: whatsappConfig?.id,
      store: { id: activeStore.id },
    });
  });

  return {
    isSaveConfigPending,
    isWhatsappPending,
    form,
    handleSubmit,
  };
};
