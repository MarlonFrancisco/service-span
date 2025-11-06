'use client';

import { useCallback, useMemo, useState } from 'react';
import { TWorkingDays } from '@/types/api/stores.types';
import { toast } from 'sonner';
import { useGetStore } from '../../booking.hook';

interface BusinessShowcaseData {
  businessName: string;
  businessAddress: string;
  images: string[];
  averageRating: number;
  reviewCount: number;
  description: string;
  amenities: string[];
  openTime: string;
  closeTime: string;
  businessDays: TWorkingDays;
}

export const useBusinessShowcase = (): {
  data: BusinessShowcaseData | null;
  showAllPhotos: boolean;
  selectedImageIndex: number;
  handleImageClick: (index: number) => void;
  handleCloseGallery: () => void;
  handleShare: () => void;
  handleSave: () => void;
} => {
  const selectedStore = useGetStore();
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const data: BusinessShowcaseData | null = useMemo(() => {
    if (!selectedStore) return null;

    const images =
      selectedStore.gallery?.map((item: { url: string }) => item.url) || [];

    const reviewCount = selectedStore.reviews?.length || 0;
    const totalRating =
      selectedStore.reviews?.reduce(
        (sum, review) => sum + parseFloat(review.rating),
        0,
      ) || 0;

    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    const businessAddress = `${selectedStore.address}, ${selectedStore.city} - ${selectedStore.state}`;

    return {
      businessName: selectedStore.name,
      businessAddress,
      images,
      averageRating,
      reviewCount,
      description: selectedStore.description || '',
      amenities: selectedStore.amenities || [],
      openTime: selectedStore.openTime,
      closeTime: selectedStore.closeTime,
      businessDays: selectedStore.businessDays || [],
    };
  }, [selectedStore]);

  const handleImageClick = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setShowAllPhotos(true);
  }, []);

  const handleCloseGallery = useCallback(() => {
    setShowAllPhotos(false);
  }, []);

  const handleShare = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (navigator.share) {
      navigator
        .share({
          title: 'Compartilhar negócio',
          url: window.location.href,
        })
        .catch(() => {
          // Silently fail if user cancels
        });
    } else {
      // Fallback: copiar URL para clipboard
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          toast.success('Link copiado para a área de transferência');
        })
        .catch(() => {
          toast.error('Falha ao copiar link');
        });
    }
  }, []);

  const handleSave = useCallback(() => {
    toast.info('Negócio salvo como favorito');
  }, []);

  return {
    data,
    showAllPhotos,
    selectedImageIndex,
    handleImageClick,
    handleCloseGallery,
    handleShare,
    handleSave,
  };
};
