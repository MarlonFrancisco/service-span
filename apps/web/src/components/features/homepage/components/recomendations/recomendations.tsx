'use client';

import { CarouselSection } from '@/components/ui/carousel-section';
import { RecommendationCard } from './components/recomendation-card';
import { useRecommendations } from './recomendations.hook';

export const Recomendations = () => {
  const { recommendationStores } = useRecommendations();

  if (!recommendationStores) {
    return null;
  }

  return (
    <div className="flex flex-col gap-20 mb-10">
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
