import { MetricsService } from '@/service/partner/metrics/metrics.service';
import { PeriodType } from '@/types/api/metrics.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useMetricsQuery = ({
  storeId,
  period = 'week',
  includeOverview = false,
}: {
  storeId?: string;
  period?: PeriodType;
  includeOverview?: boolean;
}) => {
  const {
    data: overview,
    refetch: overviewRefetch,
    isPending: isPendingOverview,
  } = useQuery({
    queryKey: CACHE_QUERY_KEYS.metricsOverview(storeId || '', period),
    queryFn: () => MetricsService.getOverview(storeId || '', period),
    enabled: !!storeId && includeOverview,
  });

  return { overview, isPendingOverview, overviewRefetch };
};
