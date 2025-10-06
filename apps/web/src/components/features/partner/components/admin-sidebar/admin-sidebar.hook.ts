'use client';

import {
  BellRing,
  Calendar,
  CreditCard,
  LayoutDashboard,
  Settings,
  Store,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import type { TAdminSidebarHookReturn } from './admin-sidebar.types';

export const useAdminSidebar = (): TAdminSidebarHookReturn => {
  const pathname = usePathname();
  const menuItems = useMemo(
    () => [
      {
        id: 'dashboard' as const,
        label: 'Dashboard',
        icon: LayoutDashboard,
        description: 'Visão geral',
      },
      {
        id: 'stores' as const,
        label: 'Minhas Lojas',
        icon: Store,
        description: 'Gerenciar filiais',
      },
      {
        id: 'services' as const,
        label: 'Serviços',
        icon: Settings,
        description: 'Configurar ofertas',
      },
      {
        id: 'agenda' as const,
        label: 'Agenda',
        icon: Calendar,
        description: 'Horários e agendamentos',
      },
      {
        id: 'plans' as const,
        label: 'Planos',
        icon: CreditCard,
        description: 'Assinatura e cobrança',
      },
      {
        id: 'notifications' as const,
        label: 'Notificações',
        icon: BellRing,
        description: 'Lembretes automatizados',
      },
    ],
    [],
  );

  return {
    menuItems,
    pathname,
  };
};
