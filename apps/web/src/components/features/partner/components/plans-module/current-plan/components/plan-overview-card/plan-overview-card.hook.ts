'use client';

import { useMemo } from 'react';
import type { TUsePlanOverviewCardConfig } from './plan-overview-card.types';

export const usePlanOverviewCard = ({
  nextBillingDate,
  schedulesLength,
  maxSchedules,
  storesLength,
  maxStores,
  storeMembersLength,
  maxUsers,
}: TUsePlanOverviewCardConfig) => {
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

  const usagePercentage = useMemo(
    () => calculatePercentage(schedulesLength, maxSchedules),
    [schedulesLength, maxSchedules],
  );

  const storesUsagePercentage = useMemo(
    () => calculatePercentage(storesLength, maxStores),
    [storesLength, maxStores],
  );

  const usersUsagePercentage = useMemo(
    () => calculatePercentage(storeMembersLength, maxUsers),
    [storeMembersLength, maxUsers],
  );

  const isSchedulesUnlimited = useMemo(
    () => isUnlimited(maxSchedules),
    [maxSchedules],
  );

  const isStoresUnlimited = useMemo(
    () => isUnlimited(maxStores),
    [maxStores],
  );

  const isUsersUnlimited = useMemo(() => isUnlimited(maxUsers), [maxUsers]);

  return {
    formattedNextBillingDate,
    usagePercentage,
    storesUsagePercentage,
    usersUsagePercentage,
    isSchedulesUnlimited,
    isStoresUnlimited,
    isUsersUnlimited,
  };
};
