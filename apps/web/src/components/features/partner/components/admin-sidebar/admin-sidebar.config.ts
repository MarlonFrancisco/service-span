import { IMySubscription } from '@/types/api';
import { CACHE_QUERY_KEYS, getQueryClient } from '@/utils/helpers/query.helper';
import {
  Activity,
  AtSign,
  BellRing,
  Briefcase,
  Calendar,
  Clock,
  CreditCard,
  Crown,
  DollarSign,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Settings,
  Shield,
  Store,
  Users,
} from 'lucide-react';
import { IMenuSection } from './admin-sidebar.types';

const queryClient = getQueryClient();

const subscription = queryClient.getQueryData<IMySubscription>(
  CACHE_QUERY_KEYS.currentPlan(),
);

export const menuSections: IMenuSection[] = [
  {
    title: 'Principal',
    isActive: subscription?.features.DASHBOARD_GENERAL_ACCESS,
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        hasSubmenu: true,
        isActive: subscription?.features.DASHBOARD_GENERAL_ACCESS,
        submenu: [
          {
            id: 'dashboard',
            url: '/partner/dashboard',
            label: 'Visão Geral',
            icon: LayoutDashboard,
            isActive: subscription?.features.DASHBOARD_GENERAL_ACCESS,
          },
          {
            id: 'dashboard-sales',
            url: '/partner/dashboard/sales',
            label: 'Vendas & Receita',
            icon: DollarSign,
            isActive: subscription?.features.DASHBOARD_SALES_ACCESS,
          },
          {
            id: 'dashboard-operational',
            url: '/partner/dashboard/operational',
            label: 'Operacional',
            icon: Activity,
            isActive: subscription?.features.DASHBOARD_OPERATIONAL_ACCESS,
          },
          {
            id: 'dashboard-customers',
            url: '/partner/dashboard/customers',
            label: 'Clientes',
            icon: Users,
            isActive: subscription?.features.DASHBOARD_CUSTOMERS_ACCESS,
          },
        ],
      },
    ],
  },
  {
    title: 'Operação',
    isActive: true,
    items: [
      {
        id: 'agenda',
        label: 'Agenda',
        icon: Calendar,
        url: '/partner/agenda',
        isActive: true,
      },
      {
        id: 'stores',
        label: 'Lojas',
        icon: Store,
        url: '/partner/stores',
        isActive: true,
      },
      {
        id: 'services',
        label: 'Serviços',
        icon: Briefcase,
        url: '/partner/services',
        isActive: true,
      },
    ],
  },
  {
    title: 'Configurações',
    isActive: true,
    items: [
      {
        id: 'notifications',
        label: 'Notificações',
        icon: BellRing,
        hasSubmenu: true,
        isActive: true,
        submenu: [
          {
            id: 'notifications-history',
            url: '/partner/notifications/history',
            label: 'Histórico',
            icon: Clock,
            isActive: true,
          },
          {
            id: 'notifications-email-settings',
            url: '/partner/notifications/email-settings',
            label: 'Configurar E-mail',
            icon: AtSign,
            isActive: true,
          },
          {
            id: 'notifications-sms-settings',
            url: '/partner/notifications/sms-settings',
            label: 'Configurar SMS',
            icon: Mail,
            isActive: true,
          },
          {
            id: 'notifications-whatsapp-settings',
            url: '/partner/notifications/whatsapp-settings',
            label: 'Configurar WhatsApp',
            icon: MessageCircle,
            isActive: subscription?.features.WHATSAPP_INTEGRATION,
          },
        ],
      },
      {
        id: 'plans',
        label: 'Planos',
        icon: CreditCard,
        hasSubmenu: true,
        isActive: true,
        submenu: [
          {
            id: 'plans-current',
            url: '/partner/plans/me',
            label: 'Meu Plano',
            icon: Shield,
            isActive: true,
          },
          {
            id: 'plans-upgrade',
            url: '/partner/plans/upgrade',
            label: 'Fazer Upgrade',
            icon: Crown,
            isActive: true,
          },
        ],
      },
      {
        id: 'settings',
        label: 'Configurações',
        icon: Settings,
        hasSubmenu: true,
        isActive: subscription?.features.WHATSAPP_INTEGRATION,
        submenu: [
          {
            id: 'settings-whatsapp',
            url: '/partner/settings/whatsapp',
            label: 'WhatsApp',
            icon: MessageCircle,
            isActive: subscription?.features.WHATSAPP_INTEGRATION,
          },
        ],
      },
    ],
  },
];
