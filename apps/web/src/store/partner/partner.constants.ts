import type { TModuleConfig, TModuleId, TStore } from './partner.types';

export const MODULE_CONFIG: Record<TModuleId, TModuleConfig> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Visão geral e métricas em tempo real',
    showStoreSelector: true,
  },
  stores: {
    title: 'Lojas',
    description: 'Gerencie todas as suas filiais em um só lugar',
    showStoreSelector: false,
  },
  services: {
    title: 'Serviços',
    description: 'Configure os serviços oferecidos nas suas unidades',
    showStoreSelector: true,
  },
  agenda: {
    title: 'Agenda',
    description: 'Visualize e gerencie todos os agendamentos',
    showStoreSelector: true,
  },
  plans: {
    title: 'Planos',
    description: 'Gerencie sua assinatura e billing',
    showStoreSelector: false,
  },
  notifications: {
    title: 'Notificações',
    description: 'Configure lembretes e comunicações automáticas',
    showStoreSelector: true,
  },
};

// Mock data - substituir por chamada API futuramente
export const MOCK_STORES: TStore[] = [
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
];
