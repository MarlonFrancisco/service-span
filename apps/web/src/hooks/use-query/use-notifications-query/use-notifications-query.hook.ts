import { NotificationsHistoryService } from '@/service/partner/notifications-history';
import { NotificationsSettingsService } from '@/service/partner/notifications-settings';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useNotificationsQuery = ({
  storeId,
  includeNotificationsHistory = false,
  includeNotificationsSettings = false,
  notificationHistoryParams,
}: {
  storeId?: string;
  includeNotificationsHistory?: boolean;
  includeNotificationsSettings?: boolean;
  notificationHistoryParams?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    search?: string;
  };
}) => {
  const { data: notificationsSettings } = useQuery({
    queryKey: CACHE_QUERY_KEYS.notificationsSettings(storeId!),
    queryFn: () => NotificationsSettingsService.get(storeId!),
    enabled: !!storeId && includeNotificationsSettings,
  });

  const {
    data: notificationsHistoryData,
    isLoading: isNotificationsHistoryLoading,
  } = useQuery({
    queryKey: CACHE_QUERY_KEYS.notificationsHistory(
      storeId!,
      notificationHistoryParams,
    ),
    queryFn: () =>
      NotificationsHistoryService.getAll(storeId!, notificationHistoryParams),
    enabled: !!storeId && includeNotificationsHistory,
  });

  return {
    notificationsSettings,
    notificationsHistory: notificationsHistoryData?.data || [],
    notificationsMeta: notificationsHistoryData?.meta,
    isNotificationsHistoryLoading,
  };
};
