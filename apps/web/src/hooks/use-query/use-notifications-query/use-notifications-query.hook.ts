import { NotificationsSettingsService } from '@/service/partner/notifications-settings';
import { INotificationsSettings } from '@/types/api/stores.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useNotificationsQuery = (storeId: string) => {
  const { data: notificationsSettings } = useQuery<INotificationsSettings>({
    queryKey: CACHE_QUERY_KEYS.notificationsSettings(storeId),
    queryFn: () => NotificationsSettingsService.get(storeId),
  });

  return { notificationsSettings };
};
