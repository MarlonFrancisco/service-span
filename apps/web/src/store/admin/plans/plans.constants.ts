import type { IPlan, IUsageStats } from './plans.types';

export const MOCK_PLANS: IPlan[] = [
  {
    id: '1',
    name: 'Básico',
    price: 49,
    billingCycle: 'monthly',
    maxAppointments: 100,
    maxStores: 1,
    features: [
      'Até 100 agendamentos/mês',
      '1 loja',
      'Agenda online',
      'Notificações por email',
    ],
  },
  {
    id: '2',
    name: 'Profissional',
    price: 99,
    billingCycle: 'monthly',
    maxAppointments: 500,
    maxStores: 3,
    features: [
      'Até 500 agendamentos/mês',
      'Até 3 lojas',
      'Agenda online',
      'Notificações email + SMS',
      'Relatórios avançados',
      'Suporte prioritário',
    ],
    isPopular: true,
    isCurrent: true,
  },
  {
    id: '3',
    name: 'Enterprise',
    price: 199,
    billingCycle: 'monthly',
    maxAppointments: -1, // ilimitado
    maxStores: -1, // ilimitado
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
