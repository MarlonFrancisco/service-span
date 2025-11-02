import { MetricsService } from '@/service/partner/metrics/metrics.service';
import { PeriodType } from '@/types/api/metrics.types';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useMetricsQuery = ({
  storeId,
  period = 'week',
  includeOverview = false,
  includeSales = false,
}: {
  storeId?: string;
  period?: PeriodType;
  includeOverview?: boolean;
  includeSales?: boolean;
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

  const {
    data: sales,
    refetch: salesRefetch,
    isPending: isPendingSales,
  } = useQuery({
    queryKey: CACHE_QUERY_KEYS.metricsSales(storeId || '', period),
    queryFn: () => MetricsService.getSales(storeId || '', period),
    enabled: !!storeId && includeSales,
  });

  return {
    overview,
    isPendingOverview,
    overviewRefetch,
    sales,
    isPendingSales,
    salesRefetch,
  };
};
