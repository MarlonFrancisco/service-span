import { useNotificationsMutations } from '@/hooks/use-mutations/use-notifications-mutations';
import { useNotificationsQuery } from '@/hooks/use-query/use-notifications-query/use-notifications-query.hook';
import { usePartnerStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  emailSettingsSchema,
  TEmailSettingsFormData,
} from './email-settings.schema';

export const useSettings = () => {
  const storeId = usePartnerStore((state) => state.activeStore?.id);
  const { notificationsSettings } = useNotificationsQuery({ storeId });

  const { updateNotificationsSettings, isUpdatingNotificationsSettings } =
    useNotificationsMutations({ storeId });

  const form = useForm<TEmailSettingsFormData>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      emailReminderEnabled: false,
      emailReminderAdvanceHours: '24h',
      emailReminderCustomMessage: '',
    },
  });

  useEffect(() => {
    if (notificationsSettings?.id) {
      form.reset({
        emailReminderEnabled:
          notificationsSettings.emailReminderEnabled ?? false,
        emailReminderAdvanceHours:
          notificationsSettings.emailReminderAdvanceHours ?? '24h',
        emailReminderCustomMessage:
          notificationsSettings.emailReminderCustomMessage ?? '',
      });
    }
  }, [notificationsSettings, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    updateNotificationsSettings({ ...data, id: notificationsSettings?.id });
  });

  return { form, isUpdatingNotificationsSettings, handleSubmit };
};
