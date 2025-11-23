import { useNotificationsMutations } from '@/hooks/use-mutations/use-notifications-mutations/use-notifications-mutations.hook';
import { useNotificationsQuery } from '@/hooks/use-query/use-notifications-query/use-notifications-query.hook';
import { usePartnerStore } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { smsSettingsSchema, TSmsSettingsFormData } from './sms-settings.schema';

export const useSmsSettings = () => {
  const storeId = usePartnerStore((state) => state.activeStore?.id);
  const { notificationsSettings } = useNotificationsQuery({ storeId });

  const form = useForm<TSmsSettingsFormData>({
    resolver: zodResolver(smsSettingsSchema),
    defaultValues: {
      smsReminderEnabled: false,
      smsReminderAdvanceHours: '24h',
      smsReminderCustomMessage: '',
    },
  });

  useEffect(() => {
    if (notificationsSettings?.id) {
      form.reset({
        smsReminderEnabled: notificationsSettings.smsReminderEnabled ?? false,
        smsReminderAdvanceHours:
          notificationsSettings.smsReminderAdvanceHours ?? '24h',
        smsReminderCustomMessage:
          notificationsSettings.smsReminderCustomMessage ?? '',
      });
    }
  }, [notificationsSettings, form]);

  const { updateNotificationsSettings, isUpdatingNotificationsSettings } =
    useNotificationsMutations({ storeId });

  const handleSubmit = form.handleSubmit(async (data) => {
    updateNotificationsSettings({ ...data, id: notificationsSettings?.id });
  });

  return {
    form,
    isUpdatingNotificationsSettings,
    handleSubmit,
  };
};
