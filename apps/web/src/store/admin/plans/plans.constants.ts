import { IPlan } from '@/types/api';
import type { IUsageStats } from './plans.types';

export const MOCK_PLANS: IPlan[] = [
  {
    id: '1',
    priceId: '1',
    name: 'Básico',
    description: 'Plano básico para pequenas empresas',
    price: 49,
    popular: false,
    features: [
      'Até 100 agendamentos/mês',
      '1 loja',
      'Agenda online',
      'Notificações por email',
    ],
  },
  {
    id: '2',
    priceId: '2',
    name: 'Profissional',
    price: 99,
    popular: true,
    description: 'Plano profissional para empresas médias',
    features: [
      'Até 500 agendamentos/mês',
      'Até 3 lojas',
      'Agenda online',
      'Notificações email + SMS',
      'Relatórios avançados',
      'Suporte prioritário',
    ],
  },
  {
    id: '3',
    priceId: '3',
    name: 'Enterprise',
    price: 199,
    popular: false,
    description: 'Plano enterprise para grandes empresas',
    features: [
      'Agendamentos ilimitados',
      'Lojas ilimitadas',
      'Agenda online',
      'Notificações email + SMS',
      'Relatórios avançados',
      'Suporte prioritário 24/7',
      'API personalizada',
      'White label',
    ],
  },
];

export const INITIAL_USAGE_STATS: IUsageStats = {
  currentAppointments: 347,
  maxAppointments: 500,
  currentStores: 2,
  maxStores: 3,
  usagePercentage: 69,
};
