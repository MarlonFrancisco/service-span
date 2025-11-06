'use client';

import { useSearchQuery } from '@/hooks/use-query/use-search-query';
import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { formatPriceBRL } from '@/utils/helpers/price.helper';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { ResultsListSkeleton } from './results-list-skeleton';
import { VirtualizedResultsList } from './virtualized-results-list';

export function ResultsList() {
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
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-900">
            Nenhum serviço encontrado
          </h2>
          <p className="text-gray-600 mt-1">
            Tente uma busca diferente ou verifique seus filtros
          </p>
        </div>
      </div>
    );
  }

  return <VirtualizedResultsList stores={displayStores} />;
}
