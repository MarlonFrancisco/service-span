'use client';

import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { useMemo } from 'react';

export const usePlanOverviewCard = () => {
  const { currentPlan } = useSubscriptionQuery();

  const nextBillingDate = currentPlan?.nextBillingDate;
  const storesLength = currentPlan?.storesLength || 0;
  const maxStores = currentPlan?.features.PRO_LIMIT || 0;
  const storeMembersLength = currentPlan?.storeMembersLength || 0;
  const maxUsers = currentPlan?.features.UNIT_LIMIT || 0;

  const calculatePercentage = (current: number, max: number) => {
    if (max === 0) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const isUnlimited = (max: number) => max === 0;

  const formattedNextBillingDate = useMemo(() => {
    return nextBillingDate
      ? new Date(nextBillingDate).toLocaleDateString('pt-BR')
      : 'Indefinida';
  }, [nextBillingDate]);

  const storesUsagePercentage = useMemo(
    () => calculatePercentage(storesLength, maxStores),
    [storesLength, maxStores],
  );

  const usersUsagePercentage = useMemo(
    () => calculatePercentage(storeMembersLength, maxUsers),
    [storeMembersLength, maxUsers],
  );

  const isStoresUnlimited = useMemo(() => isUnlimited(maxStores), [maxStores]);

  const isUsersUnlimited = useMemo(() => isUnlimited(maxUsers), [maxUsers]);

  return {
    formattedNextBillingDate,
    storesUsagePercentage,
    usersUsagePercentage,
    isStoresUnlimited,
    isUsersUnlimited,
  };
};
