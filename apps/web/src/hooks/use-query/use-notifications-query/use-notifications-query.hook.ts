import { NotificationsHistoryService } from '@/service/partner/notifications-history';
import { NotificationsSettingsService } from '@/service/partner/notifications-settings';
import { INotificationsSettings } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useNotificationsQuery = ({
  storeId,
  includeNotificationsHistory = false,
  includeNotificationsSettings = false,
}: {
  storeId?: string;
  includeNotificationsHistory?: boolean;
  includeNotificationsSettings?: boolean;
}) => {
  const { data: notificationsSettings } = useQuery<INotificationsSettings>({
    queryKey: CACHE_QUERY_KEYS.notificationsSettings(storeId!),
    queryFn: () => NotificationsSettingsService.get(storeId!),
    enabled: !!storeId && includeNotificationsSettings,
  });

  const { data: notificationsHistory = [] } = useQuery({
    queryKey: CACHE_QUERY_KEYS.notificationsHistory(storeId!),
    queryFn: () => NotificationsHistoryService.getAll(storeId!),
    enabled: !!storeId && includeNotificationsHistory,
  });

  return { notificationsSettings, notificationsHistory };
};
