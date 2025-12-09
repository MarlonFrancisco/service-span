import useSearchStore from '@/store/search/search.store';
import { formatBusinessHours } from '@/utils/helpers/business-hours.helper';
import { formatStorePrice } from '@/utils/helpers/price.helper';
import { generateStoreWhatsAppLink } from '@/utils/helpers/whatsapp.helper';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export function useStorePreview() {
  const selectedStore = useSearchStore((state) => state.selectedStore);
  const router = useRouter();

  const handleBookingClick = useCallback(() => {
    if (!selectedStore) return;
    router.push(`/booking/${selectedStore.id}`);
  }, [selectedStore, router]);

  const formattedPrice = selectedStore
    ? formatStorePrice(
        selectedStore.services.reduce(
          (sum, service) => sum + service.price,
          0,
        ) / selectedStore.services.length || 0,
        selectedStore.currency,
        selectedStore.country,
      )
    : '';

  const formattedHours = selectedStore
    ? formatBusinessHours(
        selectedStore.openTime,
        selectedStore.closeTime,
        selectedStore.businessDays,
      )
    : '';

  const whatsAppLink = selectedStore
    ? generateStoreWhatsAppLink(selectedStore.telephone, selectedStore.name)
    : '';

  const showCarouselControls =
    selectedStore && selectedStore.gallery.length > 1;

  const hasReviews = selectedStore && selectedStore.reviews?.length > 0;

  const displayReviews = selectedStore ? selectedStore.reviews.slice(0, 3) : [];

  return {
    selectedStore,
    formattedPrice,
    formattedHours,
    whatsAppLink,
    showCarouselControls,
    hasReviews,
    displayReviews,
    handleBookingClick,
  };
}
