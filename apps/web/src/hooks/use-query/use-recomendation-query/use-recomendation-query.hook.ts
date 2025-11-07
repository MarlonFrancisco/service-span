import { RecomendationService } from '@/service/recomendation';
import { CACHE_QUERY_KEYS } from '@/utils/helpers/query.helper';
import { useQuery } from '@tanstack/react-query';

export const useRecomendationQuery = ({
  includePopularStores = false,
}: {
  includePopularStores: boolean;
}) => {
  const {
    data: recommendationStores,
    isPending: isPendingRecommendationStores,
  } = useQuery({
    queryKey: CACHE_QUERY_KEYS.recommendationStores(),
    queryFn: () => RecomendationService.getRecommendationStores(),
    enabled: includePopularStores,
  });

  return { recommendationStores, isPendingRecommendationStores };
};
