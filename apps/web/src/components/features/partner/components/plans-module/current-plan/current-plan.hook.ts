'use client';

import { useSubscriptionMutations } from '@/hooks';
import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { useCallback, useMemo, useState } from 'react';

export const useCurrentPlan = () => {
  const { currentPlan } = useSubscriptionQuery();
  const { cancelSubscriptionMutation, updateSubscriptionMutation } =
    useSubscriptionMutations();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  const paymentHistory = useMemo(
    () => currentPlan?.invoices || [],
    [currentPlan?.invoices],
  );

  const handleCancelSubscription = useCallback(async () => {
    if (currentPlan?.cancelAtPeriodEnd) {
      await updateSubscriptionMutation.mutateAsync({
        cancelAtPeriodEnd: false,
      });
    } else {
      await cancelSubscriptionMutation.mutateAsync();
    }

    setIsCancelDialogOpen(false);
  }, [
    currentPlan?.cancelAtPeriodEnd,
    cancelSubscriptionMutation,
    updateSubscriptionMutation,
  ]);

  return {
    currentPlan,
    paymentHistory,
    isCancelDialogOpen,
    setIsCancelDialogOpen,
    handleCancelSubscription,
    isCancelingSubscription: cancelSubscriptionMutation.isPending,
    isUpdatingSubscription: updateSubscriptionMutation.isPending,
  };
};
