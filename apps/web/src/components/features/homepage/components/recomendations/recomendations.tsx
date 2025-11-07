'use client';

import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@repo/ui';
import { ArrowRight } from 'lucide-react';
import { RecommendationCard } from './components/recomendation-card';
import { useRecommendations } from './recomendations.hook';

export const Recomendations = () => {
  const { recommendationStores, isPendingRecommendationStores, isFavorited } =
    useRecommendations();

  if (isPendingRecommendationStores) {
    return <div>Carregando...</div>;
  }

  if (!recommendationStores) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Populares hoje
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Os serviços mais agendados nas últimas 24h
          </p>
        </div>
        <Button
          variant="outline"
          className="hidden lg:flex items-center gap-2 border-gray-300 hover:bg-gray-50 whitespace-nowrap"
        >
          Ver todos <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Carousel for all screen sizes */}
      <div className="relative">
        <Carousel
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4 pb-4">
            {recommendationStores.map((store) => (
              <CarouselItem
                key={store.id}
                className="pl-4 basis-[90%] lg:basis-[calc(100%/3.2)]"
              >
                <RecommendationCard
                  store={store}
                  isFavorited={isFavorited(store.id) ?? false}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="absolute -left-4 md:-left-12 right-auto top-1/2 -translate-y-1/2 flex gap-2">
            <CarouselPrevious className="relative left-0 top-0 -translate-y-0 hover:bg-gray-100 active:scale-95" />
          </div>

          <div className="absolute -right-4 md:-right-12 left-auto top-1/2 -translate-y-1/2 flex gap-2">
            <CarouselNext className="relative right-0 top-0 -translate-y-0 hover:bg-gray-100 active:scale-95" />
          </div>
        </Carousel>
      </div>

      {/* "Ver todos" button */}
      <div className="justify-center mt-8 flex md:hidden">
        <Button
          variant="outline"
          className="items-center gap-2 border-gray-300 hover:bg-gray-50"
        >
          Ver todos <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
