import { useRecomendationQuery } from '@/hooks/use-query/use-recomendation-query/use-recomendation-query.hook';
import { useCallback } from 'react';

export const useRecommendations = () => {
  const { recommendationStores, isPendingRecommendationStores } =
    useRecomendationQuery({
      includePopularStores: true,
    });

  const toggleFavorite = useCallback((serviceId: string) => {}, []);

  const isFavorited = useCallback((serviceId: string) => {}, []);

  const handleBooking = useCallback((serviceId: string) => {}, []);

  return {
    recommendationStores,
    isPendingRecommendationStores,
    isFavorited,
    toggleFavorite,
    handleBooking,
  };
};
