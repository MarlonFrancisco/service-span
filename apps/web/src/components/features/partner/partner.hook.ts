'use client';

import { useStoresQuery } from '@/hooks/use-query/use-stores-query/use-stores-query.hook';
import { useServicesStore } from '@/store';
import { usePartnerStore } from '@/store/partner';
import { MODULE_CONFIG } from '@/utils/constants/partner.constants';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const usePartner = () => {
  const pathname = usePathname();
  const setActiveStore = usePartnerStore((state) => state.setActiveStore);

  const currentModule =
    MODULE_CONFIG[pathname as keyof typeof MODULE_CONFIG] ||
    MODULE_CONFIG['/partner/dashboard'];

  const { stores } = useStoresQuery({ includeStores: true });

  const { store: activeStore } = useStoresQuery({ storeId: stores[0]?.id });

  const showStoreSelector = currentModule?.showStoreSelector && !!activeStore;

  useEffect(() => {
    if (activeStore) {
      setActiveStore(activeStore);
      useServicesStore.setState({ services: activeStore.services });
    }
  }, [activeStore, setActiveStore]);

  return {
    currentModule,
    showStoreSelector,
  };
};
