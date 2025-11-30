'use client';

import { useSearchQuery } from '@/hooks/use-query/use-search-query';
import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { formatStorePrice } from '@/utils/helpers/price.helper';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { ResultsListSkeleton } from './results-list-skeleton';
import { VirtualizedResultsList } from './virtualized-results-list';

export function ResultsList() {
  const params = useSearchParams();
  const { data, isPending } = useSearchQuery({
    query: params.get('query')!,
  });

  const selectedStore = useSearchStore((state) => state.selectedStore);
  const setSelectedStore = useSearchStore((state) => state.setSelectedStore);

  const displayStores: IStoreSearchListItem[] = useMemo(
    () =>
      data
        ? data.map((result) => {
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
              ? `Média de ${formatStorePrice(averagePrice, result.metadata.currency, result.content.country)}`
              : 'A consultar';

            return {
              id: result.id,
              name: result.content.name,
              rating: Math.round(averageRating * 10) / 10,
              reviewCount: reviews.length,
              location: `${result.content.city}, ${result.content.state}`,
              price,
              gallery: result.metadata.gallery.map((image) => image.url),
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
              country: result.content.country,
              currency: result.metadata.currency,
              timezone: result.metadata.timezone,
              telephone: result.metadata.telephone,
            };
          })
        : [],
    [data],
  );

  // Seleciona automaticamente o primeiro item quando a lista carrega
  useEffect(() => {
    if (!selectedStore && displayStores.length > 0) {
      const firstStore = displayStores[0];

      setSelectedStore(firstStore!);
    }
  }, [selectedStore, displayStores, setSelectedStore]);

  if (isPending) {
    return <ResultsListSkeleton />;
  }

  return <VirtualizedResultsList stores={displayStores} />;
}
