import { useCallback, useMemo, useState } from 'react';
import type {
  TPlan,
  TPlanId,
  TUsePlansModuleReturn,
} from './plans-module.types';

const MOCK_CURRENT_PLAN = {
  name: 'Standard',
  expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  storesCount: 1,
  maxStores: 3,
};

const MOCK_PLANS: TPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 49,
    period: 'mês',
    maxStores: 3,
    features: [
      'Até 3 lojas',
      'Agenda básica',
      'Relatórios simples',
      'Suporte por email',
      'Aparece nas buscas',
      'Gestão de profissionais',
    ],
    highlight: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99,
    period: 'mês',
    maxStores: 10,
    features: [
      'Até 10 lojas',
      'Agenda avançada',
      'Relatórios detalhados',
      'Suporte prioritário',
      'Melhor ranqueamento',
      'Analytics avançado',
      'Integração WhatsApp',
      'Lembretes automáticos',
    ],
    highlight: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 199,
    period: 'mês',
    maxStores: 50,
    features: [
      'Lojas ilimitadas (até 50)',
      'Multi-usuários',
      'API personalizada',
      'Suporte 24/7',
      'Máximo ranqueamento',
      'Dashboard executivo',
      'Automação completa',
      'Gerente de conta dedicado',
      'Relatórios personalizados',
    ],
    highlight: false,
  },
];

export const usePlansModule = (): TUsePlansModuleReturn => {
  const [selectedPlan, setSelectedPlan] = useState<TPlanId | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [currentPlan] = useState(MOCK_CURRENT_PLAN);
  const [plans] = useState(MOCK_PLANS);

  const handleSelectPlan = useCallback((planId: TPlanId) => {
    setSelectedPlan(planId);
    setShowCheckout(true);
  }, []);

  const handleCloseCheckout = useCallback(() => {
    setShowCheckout(false);
  }, []);

  const selectedPlanData = useMemo(
    () => plans.find((p) => p.id === selectedPlan),
    [plans, selectedPlan],
  );

  return {
    selectedPlan,
    showCheckout,
    currentPlan,
    plans,
    selectedPlanData,
    handleSelectPlan,
    handleCloseCheckout,
  };
};
