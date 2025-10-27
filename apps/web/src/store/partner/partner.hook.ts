import { StoreService } from '@/service/store';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePartnerStore } from './partner.store';
import type { TModuleId } from './partner.types';

export const usePartner = () => {
  const store = usePartnerStore();
  const pathname = usePathname();

  const currentModule =
    store.moduleConfig[pathname.split('/').pop() as TModuleId] ||
    store.moduleConfig.dashboard;
  const showStoreSelector = currentModule?.showStoreSelector;

  const { data: stores = [] } = useQuery({
    queryKey: ['stores'],
    queryFn: () => StoreService.getAll(),
  });

  useEffect(() => {
    if (stores.length > 0) {
      store.setActiveStore(stores[0]!);
    }
  }, [stores]);

  return {
    ...store,
    stores,
    currentModule,
    showStoreSelector,
  };
};
