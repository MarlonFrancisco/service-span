import { NotificationsSettingsService } from '@/service/partner/notifications-settings';
import { INotificationsSettings } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useNotificationsMutations = ({ storeId }: { storeId: string }) => {
  const queryClient = getQueryClient();

  const {
    mutate: updateNotificationsSettings,
    isPending: isUpdatingNotificationsSettings,
  } = useMutation({
    mutationFn: (notificationsSettings: Partial<INotificationsSettings>) =>
      NotificationsSettingsService.update(storeId, notificationsSettings),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.notificationsSettings(storeId),
        (old: INotificationsSettings) => ({
          ...old,
          ...data,
        }),
      );
      toast.success('Configurações de notificações atualizadas com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar configurações de notificações');
    },
  });

  return {
    updateNotificationsSettings,
    isUpdatingNotificationsSettings,
  };
};
