'use client';

import { CarouselSection } from '@/components/ui/carousel-section';
import { EmptyRecommendations } from './components/empty-recommendations';
import { RecommendationCard } from './components/recomendation-card';
import { RecommendationsSkeleton } from './components/recommendations-skeleton';
import { useRecommendations } from './recomendations.hook';

export const Recomendations = () => {
  const { recommendationStores, isPendingRecommendationStores } =
    useRecommendations();

  if (isPendingRecommendationStores) {
    return <RecommendationsSkeleton />;
  }

  if (!recommendationStores || recommendationStores.length === 0) {
    return <EmptyRecommendations />;
  }

  return (
    <div className="mb-10 select-none">
      <CarouselSection
        title="Populares hoje"
        subtitle="Os serviços mais agendados nas últimas 24h"
        items={recommendationStores}
        getItemKey={(store) => store.id}
        renderItem={(store) => <RecommendationCard store={store} />}
        showViewAll
        viewAllText="Ver todos"
        showNavigation
        loop
      />
    </div>
  );
};
