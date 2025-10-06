'use client';

import { useCallback, useMemo, useState } from 'react';
import type {
  TActiveStore,
  TPartnerDashboardHookReturn,
  TPartnerModule,
  TStore,
} from './partner.types';

export const usePartnerDashboard = (): TPartnerDashboardHookReturn => {
  const [activeStore, setActiveStore] = useState<TActiveStore>({
    id: '1',
    name: 'Loja Centro',
    address: 'Rua das Flores, 123',
  });

  const stores: TStore[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Loja Centro',
        address: 'Rua das Flores, 123',
      },
      {
        id: '2',
        name: 'Loja Shopping',
        address: 'Shopping Center, Loja 45',
      },
      {
        id: '3',
        name: 'Loja Zona Sul',
        address: 'Av. Principal, 567',
      },
    ],
    [],
  );

  const handleModuleChange = useCallback(() => {}, []);

  const handleStoreChange = useCallback((store: TActiveStore) => {
    setActiveStore(store);
  }, []);

  const getModuleTitle = useCallback((module: TPartnerModule): string => {
    const titles: Record<TPartnerModule, string> = {
      dashboard: 'Painel de Controle',
      stores: 'Gerenciar Lojas',
      services: 'Serviços',
      agenda: 'Agenda',
      plans: 'Planos e Assinatura',
      notifications: 'Notificações',
    };

    return titles[module] || 'Painel de Controle';
  }, []);

  const shouldShowStoreSelector = useCallback(
    (module: TPartnerModule): boolean => {
      return ['dashboard', 'services', 'notifications', 'agenda'].includes(
        module,
      );
    },
    [],
  );

  return {
    activeStore,
    stores,
    handleModuleChange,
    handleStoreChange,
    getModuleTitle,
    shouldShowStoreSelector,
  };
};
