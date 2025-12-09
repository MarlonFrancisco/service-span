import { useNotificationsMutations } from '@/hooks/partner/use-notifications-mutations/use-notifications-mutations.hook';
import { useNotificationsQuery } from '@/hooks/use-query/use-notifications-query/use-notifications-query.hook';
import { useWhatsappQuery } from '@/hooks/use-query/use-whatsapp-query/use-whatsapp-query.hook';
import { usePartnerStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  TWhatsappSettingsFormData,
  whatsappSettingsSchema,
} from './whatsapp-settings.schema';

export const useWhatsappSettings = () => {
  const storeId = usePartnerStore((state) => state.activeStore?.id);
  const { notificationsSettings } = useNotificationsQuery({ storeId });
  const { whatsappConfig } = useWhatsappQuery(storeId);

  const form = useForm<TWhatsappSettingsFormData>({
    resolver: zodResolver(whatsappSettingsSchema),
    defaultValues: {
      whatsappReminderEnabled: false,
      whatsappReminderAdvanceHours: '24h',
      whatsappReminderCustomMessage: '',
    },
  });

  useEffect(() => {
    if (notificationsSettings?.id) {
      form.reset({
        whatsappReminderEnabled:
          notificationsSettings.whatsappReminderEnabled ?? false,
        whatsappReminderAdvanceHours:
          notificationsSettings.whatsappReminderAdvanceHours ?? '24h',
        whatsappReminderCustomMessage:
          notificationsSettings.whatsappReminderCustomMessage ?? '',
      });
    }
  }, [notificationsSettings, form]);

  const { updateNotificationsSettingsMutation } = useNotificationsMutations({
    storeId,
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    updateNotificationsSettingsMutation.mutate({
      ...data,
      id: notificationsSettings?.id,
    });
  });

  return {
    form,
    isUpdatingNotificationsSettings:
      updateNotificationsSettingsMutation.isPending,
    whatsappConfig,
    handleSubmit,
  };
};
