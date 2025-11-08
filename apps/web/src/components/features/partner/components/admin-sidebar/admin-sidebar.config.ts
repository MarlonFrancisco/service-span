import {
  Activity,
  AtSign,
  BellRing,
  Calendar,
  Clock,
  CreditCard,
  Crown,
  DollarSign,
  LayoutDashboard,
  Mail,
  Settings,
  Shield,
  Store,
  Users,
} from 'lucide-react';
import { IMenuSection } from './admin-sidebar.types';

export const menuSections: IMenuSection[] = [
  {
    title: 'Principal',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        hasSubmenu: true,
        submenu: [
          {
            id: 'dashboard',
            url: '/partner/dashboard',
            label: 'Visão Geral',
            icon: LayoutDashboard,
          },
          {
            id: 'dashboard-sales',
            url: '/partner/dashboard/sales',
            label: 'Vendas & Receita',
            icon: DollarSign,
          },
          {
            id: 'dashboard-operational',
            url: '/partner/dashboard/operational',
            label: 'Operacional',
            icon: Activity,
          },
          {
            id: 'dashboard-customers',
            url: '/partner/dashboard/customers',
            label: 'Clientes',
            icon: Users,
          },
        ],
      },
    ],
  },
  {
    title: 'Operação',
    items: [
      {
        id: 'agenda',
        label: 'Agenda',
        icon: Calendar,
        url: '/partner/agenda',
      },
      {
        id: 'stores',
        label: 'Lojas',
        icon: Store,
        url: '/partner/stores',
      },
      {
        id: 'services',
        label: 'Serviços',
        icon: Settings,
        url: '/partner/services',
      },
    ],
  },
  {
    title: 'Configurações',
    items: [
      {
        id: 'notifications',
        label: 'Notificações',
        icon: BellRing,
        hasSubmenu: true,
        submenu: [
          {
            id: 'notifications-history',
            url: '/partner/notifications/history',
            label: 'Histórico',
            icon: Clock,
          },
          {
            id: 'notifications-email-settings',
            url: '/partner/notifications/email-settings',
            label: 'Configurar E-mail',
            icon: AtSign,
          },
          {
            id: 'notifications-sms-settings',
            url: '/partner/notifications/sms-settings',
            label: 'Configurar SMS',
            icon: Mail,
          },
        ],
      },
      {
        id: 'plans',
        label: 'Planos',
        icon: CreditCard,
        hasSubmenu: true,
        submenu: [
          {
            id: 'plans-current',
            url: '/partner/plans/me',
            label: 'Meu Plano',
            icon: Shield,
          },
          {
            id: 'plans-upgrade',
            url: '/partner/plans/upgrade',
            label: 'Fazer Upgrade',
            icon: Crown,
          },
        ],
      },
    ],
  },
];
