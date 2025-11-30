import { useSubscriptionQuery } from '@/hooks/use-query/use-subscription-query';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useAdminSidebarFooter = () => {
  const { currentPlan } = useSubscriptionQuery();
  const router = useRouter();

  const handleUpgradeClick = useCallback(() => {
    router.push('/partner/plans/upgrade');
  }, [router]);

  const storesUsage = useMemo(() => {
    if (!currentPlan) return null;

    const isUnlimited = currentPlan.features.UNIT_LIMIT === 0;

    return {
      current: currentPlan.storesLength,
      limit: currentPlan.features.UNIT_LIMIT,
      percentage: isUnlimited
        ? 0
        : Math.round(
            (currentPlan.storesLength / currentPlan.features.UNIT_LIMIT) * 100,
          ),
      isUnlimited,
    };
  }, [currentPlan]);

  const professionalsUsage = useMemo(() => {
    if (!currentPlan) return null;

    const isUnlimited = currentPlan.features.PRO_LIMIT === 0;

    return {
      current: currentPlan.storeMembersLength,
      limit: currentPlan.features.PRO_LIMIT,
      percentage: isUnlimited
        ? 0
        : Math.round(
            (currentPlan.storeMembersLength / currentPlan.features.PRO_LIMIT) *
              100,
          ),
      isUnlimited,
    };
  }, [currentPlan]);

  const isNearLimit = useMemo(() => {
    if (!storesUsage || !professionalsUsage) return false;
    if (storesUsage.isUnlimited && professionalsUsage.isUnlimited) return false;
    return (
      (!storesUsage.isUnlimited && storesUsage.percentage >= 80) ||
      (!professionalsUsage.isUnlimited && professionalsUsage.percentage >= 80)
    );
  }, [storesUsage, professionalsUsage]);

  return {
    currentPlan,
    storesUsage,
    professionalsUsage,
    isNearLimit,
    handleUpgradeClick,
  };
};
