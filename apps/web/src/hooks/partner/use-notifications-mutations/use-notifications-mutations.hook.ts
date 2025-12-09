import { TUseNotificationsMutationsConfig } from '@/hooks/partner/use-notifications-mutations/use-notifications-mutations.types';
import { NotificationsHistoryService } from '@/service/partner/notifications-history';
import { NotificationsSettingsService } from '@/service/partner/notifications-settings';
import {
  INotificationsHistory,
  INotificationsHistoryResponse,
  INotificationsSettings,
} from '@/types/api/notifications.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useNotificationsMutations = ({
  storeId,
  notificationHistoryParams,
}: TUseNotificationsMutationsConfig) => {
  const queryClient = useQueryClient();

  const updateNotificationsSettingsMutation = useMutation({
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

  const updateNotificationsHistoryMutation = useMutation({
    mutationFn: (notificationsHistory: Partial<INotificationsHistory>) =>
      NotificationsHistoryService.update(storeId, notificationsHistory),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.notificationsHistory(
          storeId,
          notificationHistoryParams,
        ),
        (old: INotificationsHistoryResponse) => ({
          ...old,
          data: old.data.map((n) => (n.id === data.id ? { ...n, ...data } : n)),
        }),
      );
      toast.success('Histórico de notificações atualizado com sucesso');
    },
    onError: () => {
      toast.error('Erro ao atualizar histórico de notificações');
    },
  });

  const markAllAsReadNotificationsHistoryMutation = useMutation({
    mutationFn: () => NotificationsHistoryService.markAllAsRead(storeId),
    onSuccess: () => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.notificationsHistory(
          storeId,
          notificationHistoryParams,
        ),
        (old: INotificationsHistoryResponse) => ({
          ...old,
          data: old.data.map((n) => ({ ...n, read: true })),
        }),
      );
      toast.success('Todas as notificações marcadas como lidas');
    },
    onError: () => {
      toast.error('Erro ao marcar todas as notificações como lidas');
    },
  });

  const deleteNotificationsHistoryMutation = useMutation({
    mutationFn: (notificationId: string) =>
      NotificationsHistoryService.delete(storeId, notificationId),
    onSuccess: (data) => {
      queryClient.setQueryData(
        CACHE_QUERY_KEYS.notificationsHistory(
          storeId,
          notificationHistoryParams,
        ),
        (old: INotificationsHistoryResponse) => ({
          ...old,
          data: old.data.filter((n) => n.id !== data.id),
        }),
      );
      toast.success('Histórico de notificações excluído com sucesso');
    },
    onError: () => {
      toast.error('Erro ao excluir histórico de notificações');
    },
  });

  return {
    updateNotificationsSettingsMutation,
    updateNotificationsHistoryMutation,
    markAllAsReadNotificationsHistoryMutation,
    deleteNotificationsHistoryMutation,
  };
};
