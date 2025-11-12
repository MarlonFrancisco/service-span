import { useRecomendationQuery } from '@/hooks/use-query/use-recomendation-query/use-recomendation-query.hook';

export const useRecommendations = () => {
  const { recommendationStores, isPendingRecommendationStores } =
    useRecomendationQuery({
      includePopularStores: true,
    });

  return {
    recommendationStores,
    isPendingRecommendationStores,
  };
};
