'use client';

import { StoreCard as BaseStoreCard } from '@/components/ui/store-card';
import useSearchStore from '@/store/search/search.store';
import { IStoreSearchListItem } from '@/store/search/search.types';
import { useIsMobile } from '@repo/ui';

interface SearchStoreCardProps {
  store: IStoreSearchListItem;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * Wrapper do StoreCard para uso na página de busca.
 * Adiciona comportamento específico como abrir drawer no mobile.
 */
export function StoreCard({
  store,
  isSelected,
  onClick,
}: SearchStoreCardProps) {
  const isMobile = useIsMobile();
  const setMobileDrawerOpen = useSearchStore(
    (state) => state.setMobileDrawerOpen,
  );

  const handleClick = () => {
    onClick();
    if (isMobile) {
      setMobileDrawerOpen(true);
    }
  };

  const handleFavoriteClick = (isFavorite: boolean) => {
    // TODO: Implementar persistência do favorito
    console.log('Favorite:', isFavorite, store.id);
  };

  return (
    <BaseStoreCard
      store={{
        id: store.id,
        name: store.name,
        location: store.location,
        rating: store.rating,
        reviewCount: store.reviewCount,
        price: store.price,
        gallery: store.gallery,
        services: store.services,
        isFavorite: store.isFavorite,
      }}
      isSelected={isSelected}
      onClick={handleClick}
      onFavoriteClick={handleFavoriteClick}
      showFavoriteButton
      showAvailabilityBadge
      showServiceBadge
    />
  );
}
