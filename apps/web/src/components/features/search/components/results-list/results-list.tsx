'use client';

import { useSearchQuery } from '@/hooks/use-query/use-search-query';
import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { formatPriceBRL } from '@/utils/helpers/price.helper';
import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@repo/ui';
import { ArrowLeft, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { ResultsListSkeleton } from './results-list-skeleton';
import { VirtualizedResultsList } from './virtualized-results-list';

export function ResultsList() {
  const router = useRouter();
  const params = useSearchParams();
  const { searchResults, isSearchLoading } = useSearchQuery({
    query: params.get('query')!,
  });

  const selectedStore = useSearchStore((state) => state.selectedStore);
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);

  const displayStores: IStoreSearchListItem[] = useMemo(
    () =>
      searchResults
        ? searchResults.map((result) => {
            const reviews = result.metadata.reviews;
            const averageRating =
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length ||
              0;

            const averagePrice =
              result.content.services.reduce(
                (sum, service) => sum + service.price,
                0,
              ) / result.content.services.length;

            const price = averagePrice
              ? `Média de ${formatPriceBRL(averagePrice)}`
              : 'A consultar';

            return {
              id: result.id,
              name: result.content.name,
              rating: Math.round(averageRating * 10) / 10,
              reviewCount: reviews.length,
              location: `${result.content.city}, ${result.content.state}`,
              price,
              images: result.metadata.gallery.map((image) => image.url),
              description: result.content.description,
              phone: result.metadata.telephone,
              address: result.content.address,
              city: result.content.city,
              state: result.content.state,
              zipCode: result.content.zipCode,
              services: result.content.services,
              reviews: result.metadata.reviews,
              openTime: result.content.openTime,
              closeTime: result.content.closeTime,
              businessDays: result.content.businessDays,
              isActive: true,
              amenities: result.metadata.amenities,
              storeMembers: [],
              schedules: [],
            };
          })
        : [],
    [searchResults],
  );

  // Seleciona automaticamente o primeiro item quando a lista carrega
  useEffect(() => {
    if (!selectedStore && displayStores.length > 0) {
      const firstStore = displayStores[0];

      setSelectedStore(firstStore!);
    }
  }, [selectedStore, displayStores, setSelectedStore]);

  if (isSearchLoading) {
    return <ResultsListSkeleton />;
  }

  if (displayStores.length === 0) {
    const searchQuery = params.get('query') || '';

    return (
      <div className="space-y-8">
        <Empty className="py-16">
          <EmptyHeader>
            <EmptyMedia variant="icon" className="size-16 mb-4">
              <Search className="size-8" />
            </EmptyMedia>
            <EmptyTitle>Nenhum serviço encontrado</EmptyTitle>
            <EmptyDescription>
              Não encontramos resultados para &ldquo;{searchQuery}&rdquo;. Tente
              usar outros termos ou explore nossas categorias.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="gap-3">
            <Button
              variant="default"
              onClick={() => router.push('/')}
              className="w-full sm:w-auto"
            >
              <ArrowLeft className="size-4 mr-2" />
              Voltar para início
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const categoriesSection =
                  document.getElementById('categories-grid');
                if (categoriesSection) {
                  router.push('/');
                  setTimeout(() => {
                    categoriesSection.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  router.push('/');
                }
              }}
              className="w-full sm:w-auto"
            >
              Explorar categorias
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return <VirtualizedResultsList stores={displayStores} />;
}
