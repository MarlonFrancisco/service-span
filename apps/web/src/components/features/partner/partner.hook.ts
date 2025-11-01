import { NotificationsHistoryService } from '@/service/partner/notifications-history';
import { StoreService } from '@/service/store';
import { useNotificationsStore, useServicesStore } from '@/store';
import { usePartnerStore } from '@/store/partner';
import { MODULE_CONFIG } from '@/utils/constants/partner.constants';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { TModuleId } from './partner.types';

export const usePartner = () => {
  const pathname = usePathname();

  const currentModule =
    MODULE_CONFIG[pathname.split('/').pop() as TModuleId] ||
    MODULE_CONFIG.dashboard;
  const showStoreSelector = currentModule?.showStoreSelector;

  const { data: stores = [] } = useQuery({
    queryKey: CACHE_QUERY_KEYS.stores(),
    queryFn: () => StoreService.getAll(),
  });

  const { data: activeStore } = useQuery({
    queryKey: CACHE_QUERY_KEYS.store(stores[0]?.id ?? ''),
    queryFn: () => StoreService.get(stores[0]!.id),
    enabled: !!stores[0]?.id,
  });

  const { data: notificationsHistory = [] } = useQuery({
    queryKey: CACHE_QUERY_KEYS.notificationsHistory(activeStore?.id ?? ''),
    queryFn: () => NotificationsHistoryService.getAll(activeStore?.id ?? ''),
    enabled: !!activeStore?.id,
  });

  useEffect(() => {
    if (activeStore) {
      usePartnerStore.setState({ activeStore, stores });
      useServicesStore.setState({ services: activeStore.services });
    }
  }, [activeStore, stores]);

  useEffect(() => {
    useNotificationsStore.setState({ notificationsHistory });
  }, [notificationsHistory]);

  return {
    currentModule,
    showStoreSelector,
  };
};
