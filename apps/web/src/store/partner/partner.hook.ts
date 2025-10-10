import { usePathname } from 'next/navigation';
import { usePartnerStore } from './partner.store';
import type { TModuleId } from './partner.types';

export const usePartner = () => {
  const {
    activeStore,
    stores,
    isMobileSidebarOpen,
    moduleConfig,
    setActiveStore,
    setIsMobileSidebarOpen,
  } = usePartnerStore();
  const pathname = usePathname();

  const currentModule = moduleConfig[pathname.split('/').pop() as TModuleId];
  const showStoreSelector = currentModule.showStoreSelector;

  return {
    activeStore,
    stores,
    isMobileSidebarOpen,
    moduleConfig,
    showStoreSelector,
    currentModule,
    setActiveStore,
    setIsMobileSidebarOpen,
  };
};
