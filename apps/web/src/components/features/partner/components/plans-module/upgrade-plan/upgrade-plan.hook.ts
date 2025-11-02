import { useSubscriptionMutations } from '@/hooks/use-mutations/use-subscription-mutations';
import { usePlansQuery } from '@/hooks/use-query/use-plans-query';
import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { useCallback } from 'react';

const benefits = [
  {
    title: 'Aumente sua eficiência',
    description:
      'Automatize agendamentos e reduza no-shows em até 80% com lembretes inteligentes.',
  },
  {
    title: 'Cresça mais rápido',
    description:
      'Empresas que usam ServiceSnap crescem 3x mais rápido com agendamentos online 24/7.',
  },
  {
    title: 'Fidelize clientes',
    description:
      'Experiência premium de agendamento que seus clientes vão amar e recomendar.',
  },
  {
    title: 'Segurança garantida',
    description:
      'Seus dados e dos seus clientes protegidos com criptografia de ponta a ponta.',
  },
  {
    title: 'Economize tempo',
    description:
      'Reduza em até 15 horas semanais gastas com gestão de agendamentos manuais.',
  },
  {
    title: 'Insights poderosos',
    description:
      'Tome decisões baseadas em dados com analytics detalhados e relatórios em tempo real.',
  },
];

export function useUpgradePlan() {
  const { plans, isPendingPlans } = usePlansQuery();
  const { currentPlan } = useSubscriptionQuery();
  const { createSubscription, isCreatingSubscription } =
    useSubscriptionMutations();

  const handleSelectPlan = useCallback(
    (planId: string) => {
      createSubscription(planId, {
        onSuccess: ({ url }) => {
          window.location.href = url;
        },
      });
    },
    [createSubscription],
  );

  return {
    plans,
    benefits,
    currentPlan,
    isPendingPlans,
    isCreatingSubscription,
    handleSelectPlan,
  };
}
